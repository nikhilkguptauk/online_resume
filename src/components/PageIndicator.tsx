interface PageIndicatorProps {
  activePage: number
  totalPages: number
  visible: boolean
}

export default function PageIndicator({ activePage, totalPages, visible }: PageIndicatorProps) {
  if (!visible) {
    return null
  }

  return (
    <div
      className="print-hide"
      style={{
        position: 'fixed',
        right: '16px',
        bottom: '16px',
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        color: '#ffffff',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '12px',
        pointerEvents: 'none',
      }}
      data-component="PageIndicator"
    >
      Page {activePage} of {totalPages}
    </div>
  )
}
