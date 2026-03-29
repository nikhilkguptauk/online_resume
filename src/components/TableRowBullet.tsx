import type { CSSProperties, ReactNode } from 'react'
import BulletPoint from './BulletPoint'

interface TableRowBulletProps {
  gridTemplateColumns: string
  columnGap?: string
  children: ReactNode
  style?: CSSProperties
}

export default function TableRowBullet({
  gridTemplateColumns,
  columnGap = '12px',
  children,
  style,
}: TableRowBulletProps) {
  return (
    <BulletPoint>
      <div
        data-component="TableRowBullet"
        style={{
          display: 'grid',
          gridTemplateColumns,
          columnGap,
          ...style,
        }}
      >
        {children}
      </div>
    </BulletPoint>
  )
}
