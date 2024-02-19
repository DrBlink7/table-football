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
/**
 * Redux
 */
type Status = 'success' | 'idle' | 'error' | 'loading'

interface State {
  userInfo: UserStore
}
interface UserStore {
  user: User
  authStatus: Status
  isUserLogged: boolean
  token: string
  errorMessage: string
}
interface User {
  email: string
}

/**
 * Utils
 */
interface WithChildren {
  children?: React.ReactNode
}
