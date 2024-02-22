export interface DBPlayersTable {
  id: number
  name: string
}
export interface DBTeamsTable {
  id: number
  striker: number
  defender: number
}
export type DBTeamsPlayerTable = DBTeamsTable & {
  defender_name: string
  striker_name: string
}