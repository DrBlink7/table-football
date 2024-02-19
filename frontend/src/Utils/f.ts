import { type TFunction } from 'i18next'
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
