import SectionHeadingBar from './SectionHeadingBar'
import { profileBullets } from '../config/resume'

interface ProfileSummaryProps {
  compact?: boolean
}

function renderBoldMarkup(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

export default function ProfileSummary({ compact }: ProfileSummaryProps) {
  return (
    <div>
      <div style={{ height: '10px' }} />
      <SectionHeadingBar title="PROFILE SUMMARY" compact={compact} />
      <ul
        style={{
          listStyleType: 'disc',
          padding: compact ? '6px 20px 6px 36px' : '8px 24px 8px 42px',
          fontSize: compact ? 'clamp(10px, 1.2vw, 13px)' : 'clamp(11px, 1.35vw, 14px)',
          lineHeight: '1.5',
          margin: 0,
        }}
      >
        {profileBullets.map((bullet, idx) => (
          <li key={idx} style={{ marginBottom: compact ? '3px' : '5px' }}>
            {renderBoldMarkup(bullet)}
          </li>
        ))}
      </ul>
    </div>
  )
}
