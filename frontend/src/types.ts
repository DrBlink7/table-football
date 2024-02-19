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

interface Player {
  name: string
  id: string
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
  playerList: Player[]
  playerListStatus: Status
  errorMessage: string
}
interface User {
  email: string
}
type HomeComponent = 'stats' | 'matches' | 'players' | 'info' | 'home'
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
