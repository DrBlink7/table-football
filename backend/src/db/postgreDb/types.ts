export interface DBPlayersTable {
  id: number
  name: string
}
export interface DBTeamsTable {
  id: number
  striker: number
  defender: number
  name: string
}
export type DBTeamsPlayerTable = DBTeamsTable & {
  defender_name: string
  striker_name: string
  team_name: string
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
  blue_team_name: string
  red_team_name: string
  red_team_id: number
  red_score: number
  red_striker_name: string
  red_defender_name: string
  match_id: number
}
export type DBRankingsCols = {
  match_id: number,
  blue_team_id: number,
  red_team_id: number,
  blue_score: number,
  red_score: number,
  status: 'ended',
  blue_striker_id: number,
  blue_striker_name: string,
  blue_defender_id: number,
  blue_defender_name: string,
  blue_team_name: string,
  red_team_name: string,
  red_striker_id: number,
  red_striker_name: string,
  red_defender_id: number,
  red_defender_name: string
}
export interface DBDefendersCols {
  defender_red_id: number
  score_red: number
  defender_blue_id: number
  score_blue: number
  defender_red_name: string
  defender_blue_name: string
}
export interface DBDStrikersCols {
  striker_red_id: number
  score_red: number
  striker_blue_id: number
  score_blue: number
  striker_red_name: string
  striker_blue_name: string
}
export interface CheckOnGoingCols {
  ongoing_matches_count: number
}