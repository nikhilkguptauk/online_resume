import type { CSSProperties, ReactNode } from 'react'
import { HEADER_GREEN_HEX } from '../constants/colors'

interface GreenBarProps {
  width?: string
  height?: string
  children?: ReactNode
  style?: CSSProperties
}

export default function GreenBar({ width = '100%', height, children, style }: GreenBarProps) {
  return (
    <div
      style={{
        backgroundColor: HEADER_GREEN_HEX,
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      data-component="GreenBar"
    >
      {children}
    </div>
  )
}
