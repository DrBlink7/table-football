import { useCallback, type FC } from 'react'
import { useAppDispatch } from '../Utils/store'
import { clearUserState, logout } from '../Store/users'
import LogoutIcon from '@mui/icons-material/Logout'
import * as ls from '../Utils/ls'

interface LogOutProps {
  shouldLogOut?: boolean
}

const LogOut: FC<LogOutProps> = ({ shouldLogOut = false }) => {
  const dispatch = useAppDispatch()
  const logOut = useCallback(() => {
    dispatch(clearUserState())
    dispatch(logout())
    ls.del('tableFootball')
  }, [dispatch])

  return shouldLogOut
    ? <LogoutIcon
      sx={{ cursor: 'pointer' }}
      data-testid="logout-button"
      onClick={logOut} />
    : <LogoutIcon
      data-testid="logout-button-icon" />
}

export default LogOut
