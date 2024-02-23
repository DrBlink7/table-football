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
export type MatchStatus = 'preparing' | 'ongoing' | 'ended'
export interface DBMatchesTable {
  id: number
  blue: number
  red: number
  blue_score: number
  red_score: number
  status: MatchStatus
}
export type DBMatchesTeamsPlayerTable = DBTeamsTable & DBMatchesTable & {
  blue_team_id: number
  blue_score: number
  blue_striker_name: string
  blue_defender_name: string
  red_team_id: number
  red_score: number
  red_striker_name: string
  red_defender_name: string
  match_id: number
}