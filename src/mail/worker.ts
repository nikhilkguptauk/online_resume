import { contactToEmail } from '../config/resume'

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL?: string
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>
  }
}

const DEFAULT_TO = contactToEmail
const ALLOWED_ORIGINS = ['https://nikhilkgupta.uk', 'https://www.nikhilkgupta.uk']
const MAX_FROM_LENGTH = 254
const MAX_MESSAGE_LENGTH = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/contact') {
      const origin = request.headers.get('Origin') ?? ''

      // Block cross-origin requests not from the resume domain.
      // Localhost is permitted so wrangler dev works without a workaround.
      const isAllowed =
        ALLOWED_ORIGINS.includes(origin) ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:')

      if (!isAllowed) {
        return new Response('Forbidden', { status: 403 })
      }

      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders(origin) })
      }

      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 })
      }

      try {
        const body = await request.json() as Record<string, unknown>
        const from = typeof body.from === 'string' ? body.from.trim() : ''
        const message = typeof body.message === 'string' ? body.message.trim() : ''

        if (!from || !message) {
          return new Response('Missing required fields', {
            status: 400,
            headers: corsHeaders(origin),
          })
        }

        if (from.length > MAX_FROM_LENGTH || !EMAIL_RE.test(from)) {
          return new Response('Invalid email address', {
            status: 400,
            headers: corsHeaders(origin),
          })
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
          return new Response('Message too long', {
            status: 400,
            headers: corsHeaders(origin),
          })
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
            subject: `New Online Resume message from ${from}`,
            text: `From: ${from}\n\nMessage:\n${message}`,
            reply_to: from,
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Resend error', response.status, errorText)
          return new Response('Failed to send', {
            status: 500,
            headers: corsHeaders(origin),
          })
        }

        return new Response('OK', { status: 200, headers: corsHeaders(origin) })
      } catch (error) {
        console.error('Contact API error', error)
        return new Response('Invalid request', {
          status: 400,
          headers: corsHeaders(origin),
        })
      }
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request)
    }

    return new Response('Asset binding not available', { status: 404 })
  },
}
