import { HEADER_GREEN_HEX } from '../constants/colors'

interface SectionHeadingBarProps {
  title: string
  compact?: boolean
}

export default function SectionHeadingBar({ title, compact }: SectionHeadingBarProps) {
  return (
    <div style={{ padding: '0 8px' }}>
      <div
        style={{
          backgroundColor: HEADER_GREEN_HEX,
          padding: compact ? '5px 0' : '7px 0',
        }}
      >
        <h2
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: compact ? 'clamp(12px, 1.6vw, 15px)' : 'clamp(13px, 1.8vw, 17px)',
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  )
}
