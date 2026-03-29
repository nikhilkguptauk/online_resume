import SectionHeadingBar from './SectionHeadingBar'
import BulletPoint from './BulletPoint'
import { technicalSkills, typography } from '../config/resume'

interface TechnologySkillsProps {
  compact?: boolean
}

export default function TechnologySkills({ compact }: TechnologySkillsProps) {
  return (
    <div data-component="TechnologySkills">
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
          <BulletPoint key={idx}>
            <strong>{row.category}:</strong> {row.text}
          </BulletPoint>
        ))}
      </ul>
    </div>
  )
}
