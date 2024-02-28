/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Forms
 */
interface LoginInputs {
  email: string
  password: string
}
interface PlayerInputs {
  player?: string
}
interface TeamInputs {
  striker: string
  defender: string
  name: string
}
interface MatchInputs {
  blue: string
  red: string
}
/**
 * API
*/
interface AuthenticateBody {
  email: string
  password: string
}

interface AuthenticateDTO {
  token: string
  email: string
}
interface GetPlayerDTO {
  name: string
  id: number
}
type GetPlayersDTO = GetPlayerDTO[]
interface CreatePlayerBODY {
  name: string
}
interface CreatePlayerDTO {
  name: string
  id: number
}
interface EditPlayerBODY {
  name: string
}
interface EditPlayerDTO {
  name: string
  id: number
}
interface DeletePlayerDTO {
  id: number
}
interface GetTeamDTO {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  id: number
  name: string
}
type GetTeamsDTO = GetTeamDTO[]
interface CreateTeamBODY {
  striker: number
  defender: number
  name: string
}
interface CreateTeamDTO {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  name: string
  id: number
}
interface EditTeamBODY {
  striker: number
  defender: number
  name: string
}
interface EditTeamDTO {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  name: string
  id: number
}
interface DeleteTeamDTO {
  id: number
}
interface GetMatchDTO {
  blue: { id: number, striker: string, defender: string, score: number, name: string }
  red: { id: number, striker: string, defender: string, score: number, name: string }
  id: number
  status: MatchStatus
}
type GetMatchesDTO = GetMatchDTO[]
interface CreateMatchBODY {
  blue: number
  red: number
}
interface CreateMatchDTO {
  blue: { id: number, striker: string, defender: string, score: number, name: string }
  red: { id: number, striker: string, defender: string, score: number, name: string }
  id: number
  status: MatchStatus
}
interface EditMatchBODY {
  blue: number
  red: number
}
interface EditMatchDTO {
  blue: { id: number, striker: string, defender: string, score: number, name: string }
  red: { id: number, striker: string, defender: string, score: number, name: string }
  id: number
  status: MatchStatus
}
interface DeleteMatchDTO {
  id: number
}
interface GetRankingsDTO {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  id: number
  name: string
  points: number
  goalsScored: number
  goalsConceded: number
  gamesPlayed: number
}

interface GetDefenderStatsDTO {
  id: number
  name: string
  goalsConceded: number
  goalsConcededPerMatch: number
  gamesPlayed: number
}
interface GetStrikerStatsDTO {
  id: number
  name: string
  goalsScored: number
  goalsScoredPerMatch: number
  gamesPlayed: number
}
interface GetPlayerStatDTO {
  id: number
  name: string
  playedForBlue: number
  playedForRed: number
  strikerPlayed: number
  goalsScoredPerMatch: number
  goalsScored: number
  defenderPlayed: number
  goalsConceded: number
  goalsConcededPerMatch: number
}
/**
 * Redux
 */
type Status = 'success' | 'idle' | 'error' | 'loading'

interface State {
  userInfo: UserStore
  playerInfo: PlayerStore
  teamInfo: TeamStore
  matchInfo: MatchStore
  statsInfo: StatsStore
  utilInfo: UtilStore
  sseInfo: SSEStore
}
interface UserStore {
  user: User
  authStatus: Status
  isUserLogged: boolean
  token: string
  errorMessage: string
}
interface PlayerStore {
  playerList: Players
  playerStats: PlayerStats
  playerStatsStatus: Status
  playerListStatus: Status
  errorMessage: string
}
interface UtilStore {
  component: HomeComponent
}
interface TeamStore {
  teamList: Teams
  teamListStatus: Status
  errorMessage: string
}
interface StatsStore {
  rankings: Ranking[]
  defenders: Player[]
  strikers: Player[]
  statsStatus: Status
  errorMessage: string
}
interface SSEStore {
  notifications: Record<number, SSENotifications>
}

interface SSENotifications { message: string }
interface User {
  email: string
}
type HomeComponent = 'stats' | 'matches' | 'players' | 'info' | 'home' | 'team'
interface Player {
  name: string
  id: number
}
type Players = Player[]
interface Team {
  striker: Player
  defender: Player
  id: number
  name: string
}
type Teams = Team[]
interface MatchStore {
  matchList: Matches
  matchListStatus: Status
  errorMessage: string
}
type Matches = Match[]
interface Match {
  blue: { id: number, striker: string, defender: string, score: number }
  red: { id: number, striker: string, defender: string, score: number }
  id: number
  status: MatchStatus
}
type MatchStatus = 'preparing' | 'ongoing' | 'ended'
interface Ranking {
  striker: Player
  defender: Player
  id: number
  points: number
  goalsScored: number
  goalsConceded: number
  gamesPlayed: number
}
interface Defender {
  id: number
  name: string
  goalsConceded: number
  goalsConcededPerMatch: number
  gamesPlayed: number
}
interface Striker {
  id: number
  name: string
  goalsScored: number
  goalsScoredPerMatch: number
  gamesPlayed: number
}
interface AddGoal {
  matchid: number
  teamid: number
}
interface PlayerStats {
  id: number
  name: string
  playedForBlue: number
  playedForRed: number
  strikerPlayed: number
  goalsScoredPerMatch: number
  goalsScored: number
  defenderPlayed: number
  goalsConceded: number
  goalsConcededPerMatch: number
}
/**
 * Utils
 */
interface WithChildren {
  children?: React.ReactNode
}
interface FormatDataForTableProps {
  columns: Column[]
  rows: any[]
}
interface Column {
  id: string
  label: string
  sortable: boolean
}
type TableType = 'Player' | 'Team' | 'Match'
type TeamColor = 'red' | 'blue'
interface Token {
  token: string
}
interface MatchesTypes {
  onGoing: Match[]
  ended: Match[]
  preparing: Match[]
}
interface Option {
  name: string
  id: number
}
type Stats = 'Rankings' | 'Defenders' | 'Strikers'
interface NotifyMessage {
  type: 'goalScored'
  text: string
  teamid: number
  matchid: number
}
