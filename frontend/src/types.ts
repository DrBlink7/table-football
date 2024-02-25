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
}
type GetTeamsDTO = GetTeamDTO[]
interface CreateTeamBODY {
  striker: number
  defender: number
}
interface CreateTeamDTO {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  id: number
}
interface EditTeamBODY {
  striker: number
  defender: number
}
interface EditTeamDTO {
  striker: { id: number, name: string }
  defender: { id: number, name: string }
  id: number
}
interface DeleteTeamDTO {
  id: number
}
interface GetMatchDTO {
  blue: { id: number, striker: string, defender: string, score: number }
  red: { id: number, striker: string, defender: string, score: number }
  id: number
  status: MatchStatus
}
type GetMatchesDTO = GetMatchDTO[]
interface CreateMatchBODY {
  blue: number
  red: number
}
interface CreateMatchDTO {
  blue: { id: number, striker: string, defender: string, score: number }
  red: { id: number, striker: string, defender: string, score: number }
  id: number
  status: MatchStatus
}
interface EditMatchBODY {
  blue: number
  red: number
}
interface EditMatchDTO {
  blue: { id: number, striker: string, defender: string, score: number }
  red: { id: number, striker: string, defender: string, score: number }
  id: number
  status: MatchStatus
}
interface DeleteMatchDTO {
  id: number
}
/**
 * Redux
 */
type Status = 'success' | 'idle' | 'error' | 'loading'

interface State {
  userInfo: UserStore
  playerInfo: PlayerStore
  utilInfo: UtilStore
  teamInfo: TeamStore
  matchInfo: MatchStore
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
