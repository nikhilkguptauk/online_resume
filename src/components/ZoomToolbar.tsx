import type { CSSProperties } from 'react'

interface ZoomToolbarProps {
  zoom: number
  canZoomOut: boolean
  canZoomIn: boolean
  onZoomOut: () => void
  onZoomIn: () => void
  onDownload: () => void
  downloadButtonStyle: CSSProperties
  zoomButtonStyle: CSSProperties
}

export default function ZoomToolbar({
  zoom,
  canZoomOut,
  canZoomIn,
  onZoomOut,
  onZoomIn,
  onDownload,
  downloadButtonStyle,
  zoomButtonStyle,
}: ZoomToolbarProps) {
  const zoomLabel = `${Math.round(zoom * 100)}%`

  const resolvedZoomButtonStyle = (disabled: boolean): CSSProperties => ({
    ...zoomButtonStyle,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  })

  return (
    <div
      className="print-hide"
      style={{
        maxWidth: '210mm',
        marginTop: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={onZoomOut}
          style={resolvedZoomButtonStyle(!canZoomOut)}
          disabled={!canZoomOut}
        >
          -
        </button>
        <span style={{ fontSize: '12px', color: '#111827' }}>{zoomLabel}</span>
        <button
          type="button"
          onClick={onZoomIn}
          style={resolvedZoomButtonStyle(!canZoomIn)}
          disabled={!canZoomIn}
        >
          +
        </button>
      </div>
      <button type="button" onClick={onDownload} style={downloadButtonStyle}>
        Download PDF
      </button>
    </div>
  )
}
