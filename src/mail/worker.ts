import { contactToEmail } from '../config/resume'

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL?: string
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>
  }
}

const DEFAULT_TO = contactToEmail

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const { from, message } = await request.json()
        if (!from || !message) {
          return new Response('Missing required fields', { status: 400 })
        }

        const to = env.CONTACT_TO_EMAIL || DEFAULT_TO
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Nikhil K Gupta <contact@nikhilkgupta.uk>',
            to,
            subject: `New website message from ${from}`,
            text: `From: ${from}\n\nMessage:\n${message}`,
            reply_to: from,
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          return new Response(errorText, { status: 500 })
        }

        return new Response('OK', { status: 200 })
      } catch (error) {
        return new Response('Invalid request', { status: 400 })
      }
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request)
    }

    return new Response('Asset binding not available', { status: 404 })
  },
}
