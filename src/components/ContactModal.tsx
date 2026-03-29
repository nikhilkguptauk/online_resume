import { useRef, useState } from 'react'
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
  const sendingRef = useRef(false)

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  const resetForm = () => {
    setFromEmail('')
    setMessage('')
    setStatus('idle')
    setStatusText('')
    setFromError('')
    sendingRef.current = false
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

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
    setStatusText('Sending...')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromEmail, to: toEmail, message }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Contact send failed', response.status, errorText)
        throw new Error('Failed to send')
      }

      setStatus('success')
      setStatusText('Message sent successfully')
      setFromError('')
      setTimeout(handleClose, 3000)
    } catch (error) {
      console.error('Contact send error', error)
      setStatus('error')
      setStatusText('Something went wrong. Please try again.')
    } finally {
      sendingRef.current = false
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
          <ContactSendButton
            onClick={handleSend}
            disabled={status === 'sending' || status === 'success'}
          />
        </div>
      </div>
    </div>
  )
}
