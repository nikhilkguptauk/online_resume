import { HEADER_GREEN_HEX } from '../constants/colors'
import { heroData, typography } from '../config/resume'

interface HeroProps {
  compact?: boolean
}

export default function Hero({ compact }: HeroProps) {
  const { name, title, phone, email, linkedInDisplay, linkedInUrl, websiteUrl, location } = heroData

  return (
    <div
      style={{ padding: compact ? '8px 8px 0 8px' : '12px 12px 0 12px' }}
      data-component="Hero"
    >
      <div
        style={{
          backgroundColor: HEADER_GREEN_HEX,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
        }}
      >
        {/* Left column: name + title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: compact
              ? 'clamp(10px,1.4vw,16px) clamp(16px,2.5vw,28px)'
              : 'clamp(14px,2vw,22px) clamp(20px,3vw,36px)',
          }}
        >
          <h1
            style={{
              fontFamily: typography.bodyFontFamily,
              fontSize: compact ? 'clamp(28px, 3.9vw, 36px)' : 'clamp(32px, 4.5vw, 42px)',
              fontWeight: 'bold',
              lineHeight: '1.2',
              color: '#0d1b2a',
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontSize: compact ? 'clamp(13px, 1.8vw, 16px)' : 'clamp(15px, 2vw, 18px)',
              color: '#1b2a3d',
              marginTop: '3px',
              marginBottom: 0,
              letterSpacing: '0.03em',
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: compact ? 'clamp(9px, 1.2vw, 12px)' : 'clamp(10px, 1.3vw, 13px)',
              color: '#1b2a3d',
              marginTop: '2px',
              marginBottom: 0,
              letterSpacing: '0.02em',
            }}
          >
            {location}
          </p>
        </div>

        {/* Right column: contact info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            textAlign: 'right',
            padding: compact
              ? 'clamp(10px,1.4vw,16px) clamp(16px,2.5vw,28px)'
              : 'clamp(14px,2vw,22px) clamp(20px,3vw,36px)',
            fontSize: compact ? 'clamp(10px, 1.3vw, 14px)' : 'clamp(12px, 1.5vw, 16px)',
            lineHeight: '1.7',
          }}
        >
          <span>{phone}</span>
          <span>{email}</span>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1e40af', textDecoration: 'underline' }}
          >
            {linkedInDisplay}
          </a>
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1e40af', textDecoration: 'underline' }}
          >
            {websiteUrl}
          </a>
        </div>
      </div>
    </div>
  )
}
