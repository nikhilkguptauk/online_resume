import SectionHeadingBar from './SectionHeadingBar'
import { technicalSkills } from '../config/resume'

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
          listStyleType: 'disc',
          padding: compact ? '6px 20px 6px 36px' : '8px 24px 8px 42px',
          fontSize: compact ? 'clamp(10px, 1.2vw, 13px)' : 'clamp(11px, 1.35vw, 14px)',
          lineHeight: '1.5',
          margin: 0,
        }}
      >
        {technicalSkills.map((row, idx) => (
          <li key={idx} style={{ marginBottom: compact ? '3px' : '5px' }}>
            <strong>{row.category}:</strong> {row.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
