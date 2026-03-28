import SectionHeadingBar from './SectionHeadingBar'
import { profileBullets, typography } from '../config/resume'

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
          listStyleType: typography.listStyleType,
          padding: typography.listPadding,
          fontSize: compact ? typography.bodyFontSizeCompact : typography.bodyFontSize,
          lineHeight: typography.bodyLineHeight,
          margin: 0,
        }}
      >
        {profileBullets.map((bullet, idx) => (
          <li key={idx} style={{ marginBottom: typography.listItemSpacing }}>
            {renderBoldMarkup(bullet)}
          </li>
        ))}
      </ul>
    </div>
  )
}
