/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Forms
 */
interface LoginInputs {
  email: string
  password: string
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
/**
 * Redux
 */
type Status = 'success' | 'idle' | 'error' | 'loading'

interface State {
  userInfo: UserStore
  playerInfo: PlayerStore
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
interface User {
  email: string
}
type HomeComponent = 'stats' | 'matches' | 'players' | 'info' | 'home' | 'team'
interface Player {
  name: string
  id: number
}
type Players = Player[]
/**
 * Utils
 */
interface WithChildren {
  children?: React.ReactNode
}
interface FormatDataForTableProps {
  columns: any[]
  rows: any[]
}

type TableType = 'Player'
