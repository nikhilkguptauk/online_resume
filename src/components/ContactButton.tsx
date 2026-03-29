import type { CSSProperties } from 'react'

interface ContactButtonProps {
  onClick: () => void
  style: CSSProperties
}

export default function ContactButton({ onClick, style }: ContactButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      data-component="ContactButton"
    >
      Contact
    </button>
  )
}
