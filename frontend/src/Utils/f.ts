import { type TFunction } from 'i18next'
import { lighten, type SxProps, type Theme } from '@mui/material'
import { authorization } from './config'

export const apply = <T>(x: T, f: (x: T) => T): T => f(x)

export const effect =
  <T>(action: (x: T) => void) =>
    (x: T): T | PromiseLike<T> => {
      const val = x
      action(val)

      return val
    }

export const vhToPixel = (vh: number): number => {
  const height = Cypress.config('viewportHeight')

  return (vh * height) / 100
}

interface Headers {
  headers: Record<string, string>
}
export const createApiHeaders = (token: string): Headers => ({
  headers: {
    [authorization]: `Bearer ${token}`
  }
})

export const formatDataForTable = (data: any[], t: TFunction<'translation', undefined>, table: TableType): FormatDataForTableProps => {
  const columns = Object
    .keys(data[0] ?? [])
    .flatMap((key) => {
      if (key === 'defender') {
        return [
          { id: 'defender_name', label: t(`${table}.defender_name`), sortable: true },
          { id: 'defender_id', label: t(`${table}.defender_id`), sortable: true }
        ]
      } else if (key === 'striker') {
        return [
          { id: 'striker_name', label: t(`${table}.striker_name`), sortable: true },
          { id: 'striker_id', label: t(`${table}.striker_id`), sortable: true }
        ]
      } else {
        return { id: key.toString(), label: t(`${table}.${key}`), sortable: true }
      }
    })
  columns.unshift({ id: 'type', label: t(`${table}.type`), sortable: false })

  const rows = data.map(row => {
    const newRow = { ...row, type: table }
    if (Boolean(row.defender)) {
      newRow.defender_id = row.defender.id
      newRow.defender_name = row.defender.name
    }
    if (Boolean(row.striker)) {
      newRow.striker_id = row.striker.id
      newRow.striker_name = row.striker.name
    }

    return newRow
  })

  return {
    columns,
    rows
  }
}

export const getHomeButtonStyle = (theme: Theme): SxProps<Theme> => ({
  width: '20%',
  height: '7vh',
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light
  },
  '&:hover span': {
    color: theme.palette.secondary.contrastText
  },
  '&:active': {
    backgroundColor: theme.palette.secondary.dark
  },
  '&:active span': {
    color: theme.palette.secondary.contrastText
  },
  '&:disabled': {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.dark
  },
  '&:disabled span': {
    color: theme.palette.secondary.dark
  }
})

export const getLeftMenuButtonStyle = (component: HomeComponent, theme: Theme, tag: HomeComponent): SxProps<Theme> => ({
  display: 'flex',
  maxHeight: '10vh',
  color: component === tag
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  backgroundColor: component === tag
    ? lighten(theme.palette.primary.light, 0.4)
    : 'transparent',
  '&:hover': {
    backgroundColor: lighten(theme.palette.primary.light, 0.6),
    color: theme.palette.text.primary
  }
})

const capitalize = (s: string): string =>
  (s[0].toUpperCase() + s.slice(1))

export const capitalizeAll = (s: string): string => s
  .split(' ')
  .map((str) => capitalize(str))
  .join(' ')
