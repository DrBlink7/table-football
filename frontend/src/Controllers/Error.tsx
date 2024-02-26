import { useCallback, type FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { useLogger } from '../Hooks/Logger'
import { clearMatchState } from '../Store/match'
import { clearPlayerState } from '../Store/player'
import { clearSseState } from '../Store/sse'
import { clearStatsState } from '../Store/stats'
import { clearTeamState } from '../Store/team'
import { clearUserState, logout } from '../Store/users'
import { clearUtilsState } from '../Store/util'
import { useAppDispatch } from '../Utils/store'
import ErrorLayout from '../Components/ErrorLayout'
import * as ls from '../Utils/ls'

const ErrorBoundary: FC<WithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const Logger = useLogger()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const resetErrorBoundary = useCallback(() => {
    dispatch(clearUserState())
    dispatch(clearPlayerState())
    dispatch(clearUtilsState())
    dispatch(clearTeamState())
    dispatch(clearMatchState())
    dispatch(clearStatsState())
    dispatch(clearSseState())
    dispatch(logout())
    setErrorMessage(null)
    ls.del('tableFootball')
    navigate('/login')
  }, [dispatch, navigate])

  const clearError = useCallback(() => {
    setErrorMessage(null)
    navigate('/login')
  }, [navigate])

  useEffect(() => {
    const handleError = (error: ErrorEvent | Event): void => {
      error instanceof ErrorEvent ? setErrorMessage(error.message) : setErrorMessage(error.type)
      Logger.writeException(new Error((error as ErrorEvent).message))
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [Logger])

  if (errorMessage !== null) {
    return (
      <ErrorLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h1" sx={{ mb: 2.5 }}>
            {t('error.title')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2.5, fontSize: 'large' }}>
            {errorMessage} 👨🏻‍💻
          </Typography>
          <Typography variant="body2">{t('error.body')}</Typography>
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          width='100%'
          marginTop='4vh'
          justifyContent='space-between'
        >
          <Button variant="contained" onClick={clearError} sx={{ minWidth: '15vw' }}>
            {t('error.button')}
          </Button>
          <Button variant="contained" onClick={resetErrorBoundary} sx={{ minWidth: '15vw' }}>
            {t('error.logout')}
          </Button>
        </Box>
      </ErrorLayout>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary
