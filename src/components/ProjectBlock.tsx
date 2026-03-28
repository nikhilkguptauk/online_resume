import { typography } from '../config/resume'

interface ProjectBlockProps {
  heading?: string
  summary?: string
  bullets: string[]
  showHeading?: boolean
  showSummary?: boolean
  showContributionsLabel?: boolean
  compact?: boolean
}

export default function ProjectBlock({
  heading,
  summary,
  bullets,
  showHeading = true,
  showSummary = true,
  showContributionsLabel = true,
  compact,
}: ProjectBlockProps) {
  const headerColor = '#3f6f3f'
  const bodyFontSize = compact ? typography.bodyFontSizeCompact : typography.bodyFontSize

  return (
    <div>
      {showHeading && heading && (
        <div
          style={{
            color: headerColor,
            fontWeight: 700,
            fontSize: bodyFontSize,
            textTransform: 'uppercase',
            borderBottom: '1px solid #9fcf9f',
            margin: '0 8px',
            padding: compact ? '2px 20px 2px 28px' : '3px 24px 3px 32px',
          }}
        >
          {heading}
        </div>
      )}
      {showSummary && summary && (
        <p
          style={{
            margin: compact ? '4px 24px 3px 32px' : '6px 28px 4px 36px',
            fontSize: bodyFontSize,
            lineHeight: typography.bodyLineHeight,
          }}
        >
          {summary}
        </p>
      )}
      {showContributionsLabel && (
        <p
          style={{
            margin: compact ? '3px 24px 2px 32px' : '4px 28px 2px 36px',
            fontSize: bodyFontSize,
            fontWeight: 600,
          }}
        >
          My contributions -
        </p>
      )}
      <ul
        style={{
          listStyleType: typography.listStyleType,
          padding: typography.listPadding,
          fontSize: bodyFontSize,
          lineHeight: typography.bodyLineHeight,
          margin: 0,
        }}
      >
        {bullets.map((item, index) => (
          <li key={`${heading ?? 'project'}-${index}`} style={{ marginBottom: typography.listItemSpacing }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
