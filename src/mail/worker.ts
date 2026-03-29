import { contactToEmail } from '../config/resume'

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL?: string
  TURNSTILE_SECRET_KEY?: string
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>
  }
}

const DEFAULT_TO = contactToEmail

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      console.log('Contact API request', request.method, url.pathname)
      try {
        const { from, message, turnstileToken } = await request.json()
        if (!from || !message || !turnstileToken) {
          console.error('Contact API missing fields', {
            hasFrom: !!from,
            hasMessage: !!message,
            hasTurnstileToken: !!turnstileToken,
          })
          return new Response('Missing required fields', { status: 400 })
        }

        const to = env.CONTACT_TO_EMAIL || DEFAULT_TO
        console.log('Contact API payload', {
          from,
          to,
          messageLength: String(message).length,
        })
        if (!env.TURNSTILE_SECRET_KEY) {
          console.error('Turnstile secret missing')
          return new Response('Turnstile secret not configured', { status: 500 })
        }

        const verifyBody = new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        })
        const remoteIp = request.headers.get('CF-Connecting-IP')
        if (remoteIp) {
          verifyBody.set('remoteip', remoteIp)
        }

        console.log('Turnstile verify start')
        const verifyResponse = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: verifyBody.toString(),
          },
        )
        const verifyResult = (await verifyResponse.json()) as {
          success?: boolean
          'error-codes'?: string[]
        }
        if (!verifyResult.success) {
          console.error('Turnstile verify failed', verifyResult)
          return new Response('Turnstile verification failed', { status: 403 })
        }
        console.log('Turnstile verify ok')

        console.log('Resend request start')
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Nikhil K Gupta <contact@nikhilkgupta.uk>',
            to,
            subject: `New Online Resume message from ${from}`,
            text: `From: ${from}\n\nMessage:\n${message}`,
            reply_to: from,
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Resend error', response.status, errorText)
          return new Response(errorText, { status: 500 })
        }

        console.log('Resend ok', response.status)
        return new Response('OK', { status: 200 })
      } catch (error) {
        console.error('Contact API error', error)
        return new Response('Invalid request', { status: 400 })
      }
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request)
    }

    return new Response('Asset binding not available', { status: 404 })
  },
}
