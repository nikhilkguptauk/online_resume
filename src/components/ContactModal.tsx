import { useEffect, useRef, useState } from 'react'
import ContactToField from './ContactToField'
import ContactFromField from './ContactFromField'
import ContactMessageField from './ContactMessageField'
import ContactSendButton from './ContactSendButton'
import { turnstileSiteKey } from '../config/resume'

interface ContactModalProps {
  isOpen: boolean
  toEmail: string
  onClose: () => void
}

export default function ContactModal({ isOpen, toEmail, onClose }: ContactModalProps) {
  const [fromEmail, setFromEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusText, setStatusText] = useState('')
  const [fromError, setFromError] = useState('')
  const sendingRef = useRef(false)
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null)
  const turnstileWidgetIdRef = useRef<string | null>(null)
  const turnstileScriptPromiseRef = useRef<Promise<void> | null>(null)
  const turnstileTokenRef = useRef<string | null>(null)
  const turnstilePendingRef = useRef<{
    promise: Promise<string>
    resolve: (token: string) => void
    reject: (error: Error) => void
  } | null>(null)
  const hasTurnstileKey = Boolean(turnstileSiteKey)

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  const resetForm = () => {
    setFromEmail('')
    setMessage('')
    setStatus('idle')
    setStatusText('')
    setFromError('')
    sendingRef.current = false
    turnstileTokenRef.current = null
    turnstilePendingRef.current = null
    if (turnstileWidgetIdRef.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetIdRef.current)
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const ensureTurnstileScript = () => {
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('Window is not available'))
    }
    if (window.turnstile) {
      return Promise.resolve()
    }
    if (!turnstileScriptPromiseRef.current) {
      turnstileScriptPromiseRef.current = new Promise((resolve, reject) => {
        const scriptId = 'cf-turnstile-script'
        const existing = document.getElementById(scriptId) as HTMLScriptElement | null
        if (existing) {
          existing.remove()
        }

        const script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        script.onload = () => {
          script.dataset.loaded = 'true'
          resolve()
        }
        script.onerror = () => reject(new Error('Turnstile failed to load'))
        document.head.appendChild(script)
      })
    }
    return turnstileScriptPromiseRef.current
  }

  const getTurnstileToken = async (): Promise<string> => {
    if (!hasTurnstileKey) {
      throw new Error('Missing Turnstile site key')
    }
    await ensureTurnstileScript()
    const turnstileApi = window.turnstile
    if (!turnstileApi || !turnstileWidgetIdRef.current) {
      throw new Error('Turnstile is not ready')
    }
    if (turnstilePendingRef.current) {
      return await turnstilePendingRef.current.promise
    }

    let resolveToken: (token: string) => void
    let rejectToken: (error: Error) => void
    const tokenPromise = new Promise<string>((resolve, reject) => {
      resolveToken = resolve
      rejectToken = reject
    })
    turnstilePendingRef.current = {
      promise: tokenPromise,
      resolve: resolveToken!,
      reject: rejectToken!,
    }

    const timeoutId = window.setTimeout(() => {
      if (turnstilePendingRef.current) {
        turnstilePendingRef.current.reject(new Error('Turnstile token timeout'))
        turnstilePendingRef.current = null
      }
    }, 12000)

    try {
      turnstileTokenRef.current = null
      turnstileApi.reset(turnstileWidgetIdRef.current)
      await new Promise<void>((resolve) => window.setTimeout(resolve, 150))
      try {
        turnstileApi.execute(turnstileWidgetIdRef.current, { action: 'contact' })
      } catch {
        // If a challenge is already executing, wait for the callback token.
      }
      const token = await tokenPromise
      return token
    } finally {
      window.clearTimeout(timeoutId)
    }
  }

  useEffect(() => {
    if (!isOpen || !hasTurnstileKey) return
    let cancelled = false

    const setupTurnstile = async () => {
      try {
        await ensureTurnstileScript()
        const turnstileApi = window.turnstile
        if (cancelled || !turnstileApi || !turnstileContainerRef.current) return
        if (!turnstileWidgetIdRef.current) {
          turnstileWidgetIdRef.current = turnstileApi.render(turnstileContainerRef.current, {
            sitekey: turnstileSiteKey,
            size: 'invisible',
            callback: (token) => {
              turnstileTokenRef.current = token
              if (turnstilePendingRef.current) {
                turnstilePendingRef.current.resolve(token)
                turnstilePendingRef.current = null
              }
            },
            'error-callback': () => {
              turnstileTokenRef.current = null
              if (turnstilePendingRef.current) {
                turnstilePendingRef.current.reject(new Error('Turnstile error'))
                turnstilePendingRef.current = null
              }
            },
            'expired-callback': () => {
              turnstileTokenRef.current = null
              if (turnstilePendingRef.current) {
                turnstilePendingRef.current.reject(new Error('Turnstile token expired'))
                turnstilePendingRef.current = null
              }
            },
          })
        }
      } catch {
        // ignore load errors; surfaced during execute
      }
    }

    setupTurnstile()

    return () => {
      cancelled = true
    }
  }, [isOpen, hasTurnstileKey])

  if (!isOpen) return null

  const handleSend = async () => {
    if (sendingRef.current) return
    if (!fromEmail || !message) {
      setStatus('error')
      setStatusText('Please fill out all fields.')
      return
    }

    if (!isValidEmail(fromEmail)) {
      setFromError('Please enter a valid email address.')
      setStatus('error')
      setStatusText('Please enter a valid email address.')
      return
    }

    sendingRef.current = true
    setStatus('sending')
    setStatusText('Verifying...')
    try {
      const turnstileToken = await getTurnstileToken()
      setStatusText('Sending...')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromEmail, to: toEmail, message, turnstileToken }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Contact send failed', response.status, errorText)
        throw new Error('Failed to send')
      }

      setStatus('success')
      setStatusText('Message sent successfully')
      setFromError('')
      setTimeout(handleClose, 2000)
    } catch (error) {
      console.error('Contact send error', error)
      setStatus('error')
      const message =
        error instanceof Error && error.message.toLowerCase().includes('turnstile')
          ? 'Verification failed. Please try again.'
          : 'Something went wrong. Please try again.'
      setStatusText(message)
    } finally {
      sendingRef.current = false
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetIdRef.current)
      }
    }
  }

  return (
    <div
      className="print-hide"
      data-component="ContactModal"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: '#f6fff1',
          border: '1px solid #dbffcf',
          borderRadius: '12px',
          padding: '24px',
          width: 'min(680px, 94vw)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Message Me</h3>
          <button
            type="button"
            onClick={handleClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '20px',
              cursor: 'pointer',
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <ContactToField value={toEmail} />
        <ContactFromField
          value={fromEmail}
          onChange={(value) => {
            setFromEmail(value)
            if (fromError && isValidEmail(value)) {
              setFromError('')
            }
          }}
        />
        {fromError && (
          <span style={{ fontSize: '12px', color: '#b91c1c' }}>{fromError}</span>
        )}
        <ContactMessageField value={message} onChange={setMessage} />
        <div ref={turnstileContainerRef} style={{ height: 0 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize: status === 'success' ? '16px' : '12px',
              fontWeight: status === 'success' ? 700 : 400,
              color: status === 'error' ? '#b91c1c' : '#047857',
            }}
          >
            {statusText}
          </span>
          <ContactSendButton onClick={handleSend} disabled={status === 'sending'} />
        </div>
      </div>
    </div>
  )
}
