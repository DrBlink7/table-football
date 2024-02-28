import { type TFunction } from 'i18next'
import { lighten, type SxProps, type Theme } from '@mui/material'
import { authorization } from './config'

// Generic utils
export const apply = <T>(x: T, f: (x: T) => T): T => f(x)

export const effect =
  <T>(action: (x: T) => void) =>
    (x: T): T | PromiseLike<T> => {
      const val = x
      action(val)

      return val
    }
const capitalize = (s: string): string =>
  (s[0].toUpperCase() + s.slice(1))

export const capitalizeAll = (s: string): string => s
  .split(' ')
  .map((str) => capitalize(str))
  .join(' ')

// Cypress utils
export const vhToPixel = (vh: number): number => {
  const height = Cypress.config('viewportHeight')

  return (vh * height) / 100
}

export const vwToPixel = (vw: number): number => {
  const width = Cypress.config('viewportWidth')

  return (vw * width) / 100
}

// CSS utils
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

// API utils
interface Headers {
  headers: Record<string, string>
}
export const createApiHeaders = (token: string): Headers => ({
  headers: {
    [authorization]: `Bearer ${token}`
  }
})

// utility functions
/**
 * Any object array that will be given to this function will be unpacked in 2 arrays [columns] [rows] to fit into a Table
 * @param data any object array you want to insert into a table
 * @param t translation function for i18n
 * @param table the Table Type (for visualize the related icon)
 * @returns {FormatDataForTableProps} An object containing two arrays: columns represent the properties of the object, rows represent the new format data
 */
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

/**
 * splits the matchlist into 3 slots: ongoing, ended and preparing
 * @param matchList a list of Matches
 * @returns {onGoing: Match[], ended: Match[], preparing: Match[]} the matches splitted in 3 separate arrays on the given status
 */
export const filterMatches = (matchList: Matches): {
  onGoing: Match[]
  ended: Match[]
  preparing: Match[]
} => matchList.reduce((acc: MatchesTypes, match) => {
  switch (match.status) {
    case 'ended':
      acc.ended = [...acc.ended, match]
      break
    case 'ongoing':
      acc.onGoing = [...acc.onGoing, match]
      break
    case 'preparing':
      acc.preparing = [...acc.preparing, match]
      break
  }
  return acc
}, { onGoing: [], ended: [], preparing: [] })
