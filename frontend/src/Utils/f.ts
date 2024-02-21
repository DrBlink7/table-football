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
  const columns =
    Object
      .keys(data[0] ?? [])
      .map(key => ({
        id: key,
        label: t(`${table}.${key}`)
      }))
  columns.unshift({ id: 'type', label: t(`${table}.type`) })

  const rows = data.map(row => ({
    ...row,
    type: table
  }))

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
