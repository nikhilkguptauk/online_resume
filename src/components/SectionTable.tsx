import SectionHeadingBar from './SectionHeadingBar'
import { typography } from '../config/resume'

export interface SectionTableData {
  title: string
  columns?: string[]
  columnWidths: string[]
  rows: string[][]
}

interface SectionTableProps {
  data: SectionTableData
  compact?: boolean
}

export default function SectionTable({ data, compact }: SectionTableProps) {
  const hasColumns = Boolean(data.columns && data.columns.length > 0)
  const gridColumns = data.columnWidths.join(' ')
  const headerColor = '#3f6f3f'
  const bodyFontSize = compact ? typography.bodyFontSizeCompact : typography.bodyFontSize

  return (
    <div>
      <SectionHeadingBar title={data.title} compact={compact} />
      {hasColumns && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gridColumns,
            columnGap: '12px',
            padding: compact ? '3px 20px 2px 28px' : '4px 24px 3px 32px',
            color: headerColor,
            fontWeight: 700,
            fontSize: bodyFontSize,
            textTransform: 'uppercase',
            borderBottom: '1px solid #9fcf9f',
            margin: '0 8px',
          }}
        >
          {data.columns?.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
      <ul
        style={{
          listStyleType: typography.listStyleType,
          padding: typography.listPadding,
          fontSize: bodyFontSize,
          lineHeight: typography.bodyLineHeight,
          margin: 0,
        }}
      >
        {data.rows.map((cells, index) => (
          <li key={`${data.title}-${index}`} style={{ marginBottom: typography.listItemSpacing }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: gridColumns,
                columnGap: '12px',
              }}
            >
              {cells.map((cell, cellIndex) => (
                <span
                  key={`${data.title}-${index}-${cellIndex}`}
                  style={{
                    textAlign:
                      data.title === 'PERSONAL DETAILS' && cellIndex === 1 ? 'right' : 'left',
                    paddingRight:
                      data.title === 'PERSONAL DETAILS' && cellIndex === 1 ? '28px' : undefined,
                  }}
                >
                  {cell}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
