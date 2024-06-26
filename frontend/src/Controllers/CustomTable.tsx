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
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'

interface CustomTableProps {
  columns: Column[]
  rows: any[]
  selectedRow?: number | null
  selectable?: boolean
  defaultOrderBy?: string
  defaultOrder?: 'asc' | 'desc'
  tableHeight?: string
  handleRowSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomTable: FC<CustomTableProps> = ({
  selectable = true,
  tableHeight = '83%',
  columns,
  rows,
  selectedRow,
  defaultOrder,
  defaultOrderBy,
  handleRowSelect
}) => {
  const { t } = useTranslation()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState(defaultOrderBy ?? 'id')
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder ?? 'asc')

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

  return <Box display='flex' width='100%' flexDirection='column' height={tableHeight}>
    <Paper sx={{ width: '100%', overflow: 'hidden', height: '92%' }}>
      <TableContainer sx={{ maxHeight: '100%' }} data-testid="table-container">
        <Table stickyHeader aria-label="sticky table" size='small'>
          <TableHead>
            <TableRow>
              {selectable &&
                <TableCell>
                  {t('table.select')}
                </TableCell>
              }
              {columns.map((column, index) =>
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
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {selectable &&
                    <TableCell>
                      <Radio
                        name={`col_${index}`}
                        checked={selectedRow === row.id}
                        onChange={handleRowSelect}
                        value={row.id} />
                    </TableCell>
                  }
                  {columns.map((column, index) => (
                    <TableCell key={index}>
                      {column.id === 'type' ? chooseTableIcon(row[column.id] as TableType) : row[column.id]}
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

const chooseTableIcon = (id: TableType): JSX.Element => {
  switch (id) {
    case 'Match':
      return <SportsSoccerIcon />
    case 'Player':
      return <PersonIcon />
    case 'Team':
      return <GroupIcon />
    default:
      return <PersonIcon />
  }
}
