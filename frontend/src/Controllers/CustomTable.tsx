import { useCallback, type FC, useState, useEffect } from 'react'
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableCell,
  Radio,
  TableSortLabel
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface CustomTableProps {
  columns: Column[]
  rows: any[]
  selectedRow: number | null
  handleRowSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomTable: FC<CustomTableProps> = ({ columns, rows, selectedRow, handleRowSelect }) => {
  const { t } = useTranslation()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState('id')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }, [])

  const handleRequestSort = useCallback((property: string) => {
    setOrder((orderBy === property && order === 'asc') ? 'desc' : 'asc')
    setOrderBy(property)
  }, [order, orderBy])

  useEffect(() => {
    setPage(0)
  }, [rowsPerPage])

  const sortedRows = [...rows].sort((a, b) =>
    order === 'asc'
      ? a[orderBy] > b[orderBy] ? 1 : -1
      : a[orderBy] < b[orderBy] ? 1 : -1)

  return <Box display='flex' width='100%' flexDirection='column' height='83%'>
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '92%' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell>
                {t('table.select')}
              </TableCell>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  {column.sortable
                    ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={() => { handleRequestSort(column.id) }}
                      >
                        {column.label}
                      </TableSortLabel>
                    )
                    : (
                      column.label
                    )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>
                    <Radio
                      name={`col_${index}`}
                      checked={selectedRow === row.id}
                      onChange={handleRowSelect}
                      value={row.id} />
                  </TableCell>
                  {columns.map((column, index) => (
                    <TableCell key={index}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '8%', margin: '0.5vh 0px' }}>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </Box>
}

export default CustomTable
