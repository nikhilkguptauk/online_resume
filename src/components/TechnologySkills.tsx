import SectionHeadingBar from './SectionHeadingBar'
import { technicalSkills, typography } from '../config/resume'

interface TechnologySkillsProps {
  compact?: boolean
}

export default function TechnologySkills({ compact }: TechnologySkillsProps) {
  return (
    <div>
      <div style={{ height: '10px' }} />
      <SectionHeadingBar title="TECHNICAL SKILLS" compact={compact} />
      <ul
        style={{
          listStyleType: typography.listStyleType,
          padding: typography.listPadding,
          fontSize: compact ? typography.bodyFontSizeCompact : typography.bodyFontSize,
          lineHeight: typography.bodyLineHeight,
          margin: 0,
        }}
      >
        {technicalSkills.map((row, idx) => (
          <li key={idx} style={{ marginBottom: typography.listItemSpacing }}>
            <strong>{row.category}:</strong> {row.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
