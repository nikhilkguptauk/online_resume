import { useState } from 'react'
import ContactToField from './ContactToField'
import ContactFromField from './ContactFromField'
import ContactMessageField from './ContactMessageField'
import ContactSendButton from './ContactSendButton'

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

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  if (!isOpen) return null

  const handleSend = async () => {
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

    setStatus('sending')
    setStatusText('Sending...')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromEmail, to: toEmail, message }),
      })

      if (!response.ok) {
        throw new Error('Failed to send')
      }

      setStatus('success')
      setStatusText('Message sent!')
      setFromError('')
      setFromEmail('')
      setMessage('')
    } catch {
      setStatus('error')
      setStatusText('Something went wrong. Please try again.')
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
      onClick={onClose}
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
            onClick={onClose}
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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: status === 'error' ? '#b91c1c' : '#047857' }}>
            {statusText}
          </span>
          <ContactSendButton onClick={handleSend} disabled={status === 'sending'} />
        </div>
      </div>
    </div>
  )
}
