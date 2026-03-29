interface TableHeaderRowProps {
  columns: string[]
  columnWidths: string[]
  compact?: boolean
}

export default function TableHeaderRow({ columns, columnWidths, compact }: TableHeaderRowProps) {
  const gridColumns = columnWidths.join(' ')
  const headerColor = '#3f6f3f'
  const fontSize = compact ? '10pt' : '10.5pt'

  return (
    <div
      data-component="TableHeaderRow"
      style={{
        display: 'grid',
        gridTemplateColumns: gridColumns,
        columnGap: '12px',
        padding: compact ? '3px 20px 2px 28px' : '4px 24px 3px 32px',
        color: headerColor,
        fontWeight: 700,
        fontSize,
        textTransform: 'uppercase',
        borderBottom: '1px solid #9fcf9f',
        margin: '0 8px',
      }}
    >
      {columns.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  )
}
