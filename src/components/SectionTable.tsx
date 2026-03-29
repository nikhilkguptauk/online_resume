import SectionHeadingBar from './SectionHeadingBar'
import TableHeaderRow from './TableHeaderRow'
import TableRowBullet from './TableRowBullet'
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
  const bodyFontSize = compact ? typography.bodyFontSizeCompact : typography.bodyFontSize

  return (
    <div data-component="SectionTable">
      <SectionHeadingBar title={data.title} compact={compact} />
      <div className="section-table-scroll">
        {hasColumns && data.columns && (
          <TableHeaderRow columns={data.columns} columnWidths={data.columnWidths} compact={compact} />
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
            <TableRowBullet key={`${data.title}-${index}`} gridTemplateColumns={gridColumns}>
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
            </TableRowBullet>
          ))}
        </ul>
      </div>
    </div>
  )
}
