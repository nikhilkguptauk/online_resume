import type { CSSProperties } from 'react'

interface ContactSendButtonProps {
  onClick: () => void
  disabled?: boolean
  style?: CSSProperties
}

export default function ContactSendButton({ onClick, disabled, style }: ContactSendButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: '#dbffcf',
        color: '#0d1b2a',
        border: '1px solid #c9f2be',
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '13px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
      data-component="ContactSendButton"
    >
      Send
    </button>
  )
}
