import GreenBar from './GreenBar'

interface SectionHeadingBarProps {
  title: string
  compact?: boolean
}

export default function SectionHeadingBar({ title, compact }: SectionHeadingBarProps) {
  const barHeight = compact ? 'clamp(18px, 2.6vw, 24px)' : 'clamp(22px, 3vw, 28px)'

  return (
    <div style={{ padding: '0 8px' }} data-component="SectionHeadingBar">
      <GreenBar height={barHeight}>
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
      </GreenBar>
    </div>
  )
}
