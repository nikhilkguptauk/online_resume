import type { ReactNode } from 'react'
import { typography } from '../config/resume'

interface BulletPointProps {
  children: ReactNode
}

export default function BulletPoint({ children }: BulletPointProps) {
  return (
    <li
      data-component="BulletPoint"
      style={{
        marginBottom: typography.listItemSpacing,
      }}
    >
      {children}
    </li>
  )
}
