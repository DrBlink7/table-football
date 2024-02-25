import { type FC, useCallback, useEffect, useState } from 'react'
import { Box, Button, IconButton, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { selectToken } from '../Store/users'
import { setComponent } from '../Store/util'
import {
  clearMatchState,
  retrieveMatchList,
  selectErrorMessage,
  selectMatchList,
  selectMatchListStatus,
  setErrorMessage
} from '../Store/match'
import { getHomeButtonStyle, filterMatches } from '../Utils/f'
import { useNavigate } from 'react-router-dom'
import { keyframes } from '@emotion/react'
import Scrollbar from 'react-perfect-scrollbar'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import Loader from '../Components/Loader'
import ErrorComponent from '../Components/Error'
import 'react-perfect-scrollbar/dist/css/styles.css'

const Matches: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()

  const token = useAppSelector(selectToken)
  const errorMessage = useAppSelector(selectErrorMessage)
  const matchListStatus = useAppSelector(selectMatchListStatus)
  const matchList = useAppSelector(selectMatchList)

  const [isOnGoingFoldableOpen, setOnGoingIsFoldableOpen] = useState<boolean>(true)
  const [isEndedFoldableOpen, setEndedIsFoldableOpen] = useState<boolean>(false)
  const [isPreparingFoldableOpen, setPreparingIsFoldableOpen] = useState<boolean>(false)

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    dispatch(clearMatchState())
  }, [dispatch])

  const goToTeamPage = useCallback((id: number) => {
    navigate(`/team/${id}`)
  }, [navigate])

  const goToLiveMatch = useCallback((id: number) => {
    navigate(`/match/${id}`)
  }, [navigate])

  const goToStats = useCallback(() => {
    dispatch(setComponent('stats'))
  }, [dispatch])

  const toggleOnGoingFoldable = useCallback(() => {
    setOnGoingIsFoldableOpen(!isOnGoingFoldableOpen)
  }, [isOnGoingFoldableOpen])

  const toggleEndedFoldable = useCallback(() => {
    setEndedIsFoldableOpen(!isEndedFoldableOpen)
  }, [isEndedFoldableOpen])

  const togglePreparingFoldable = useCallback(() => {
    setPreparingIsFoldableOpen(!isPreparingFoldableOpen)
  }, [isPreparingFoldableOpen])

  useEffect(() => {
    (async () => {
      try {
        await dispatch(retrieveMatchList({ token }))
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [token, dispatch])

  if (matchListStatus === 'loading') {
    return <Loader />
  }

  if (matchListStatus === 'error') {
    const msg = errorMessage === '' ? 'match list error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  const buttonStyle = getHomeButtonStyle(theme)

  const { onGoing, ended, preparing } = filterMatches(matchList)

  return (
    <Stack
      display='flex'
      width='80%'
      height='100%'
      alignItems='center'
      alignSelf='center'
      justifyContent='center'
      color={theme.palette.primary.contrastText}
      bgcolor={theme.palette.primary.main}
    >
      <Box display='flex' width='90%' flexDirection='row' height='12%' justifyContent='space-between' alignItems='center'>
        <Typography variant='h6'>{t('matches.title')}</Typography>
        <Button variant="contained" sx={{ ...buttonStyle, width: '30%' }} fullWidth >
          {t('matches.create')}
        </Button>
      </Box>
      <Stack width='90%' height='88%' spacing={2}>
        <MatchList
          matches={onGoing}
          isOpen={isOnGoingFoldableOpen}
          title={t('matches.onGoing')}
          goToStats={goToStats}
          toggle={toggleOnGoingFoldable}
          goToLiveMatch={goToLiveMatch}
          goToTeamPage={goToTeamPage}
        />
        <MatchList
          matches={preparing}
          isOpen={isPreparingFoldableOpen}
          title={t('matches.preparing')}
          goToStats={goToStats}
          toggle={togglePreparingFoldable}
          goToLiveMatch={goToLiveMatch}
          goToTeamPage={goToTeamPage}
        />
        <MatchList
          matches={ended}
          isOpen={isEndedFoldableOpen}
          title={t('matches.ended')}
          goToStats={goToStats}
          toggle={toggleEndedFoldable}
          goToLiveMatch={goToLiveMatch}
          goToTeamPage={goToTeamPage}
        />
      </Stack>
    </Stack>
  )
}

export default Matches

interface MatchListProps {
  isOpen: boolean
  matches: Match[]
  title: string
  goToStats: () => void
  toggle: () => void
  goToLiveMatch: (id: number) => void
  goToTeamPage: (id: number) => void
}
const MatchList: FC<MatchListProps> = ({ isOpen, matches, title, goToLiveMatch, goToStats, goToTeamPage, toggle }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const blinkAnimation = keyframes`
  0% { color: ${theme.palette.primary.main}; }
  50% { color: ${theme.palette.secondary.main}; }
  100% { color: ${theme.palette.primary.main}; }
  `

  return <Paper elevation={1} sx={{ p: 1 }}>
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Typography variant='subtitle1'>{title} ({matches.length})</Typography>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Typography
          variant='subtitle1'
          sx={{ ml: 1, textDecoration: 'underline', cursor: 'pointer' }}
          onClick={goToStats}
        >
          {t('matches.stats')}
        </Typography>
        <IconButton onClick={toggle}>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
    </Box>
    {isOpen && (
      <Scrollbar style={{ height: '88%', width: '100%', display: 'flex', flexDirection: 'column' }}>
        {matches.map(match => (
          <Paper key={match.id} elevation={2} sx={{ my: 1, p: 2 }}>
            <Stack spacing={2} display='flex' flexDirection='column' key={match.id}>
              {match.status === 'ongoing'
                ? <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  <Box
                    onClick={() => { goToLiveMatch(match.id) }}
                    display='flex'
                    sx={{
                      cursor: 'pointer',
                      color: theme.palette.primary.main,
                      transition: 'color 1.5s ease-in-out',
                      animation: `${blinkAnimation} 1s linear infinite alternate`
                    }}
                  >
                    <Typography mr='1vw'>{t('matches.live')}</Typography>
                    <LiveTvIcon fontSize='small' sx={{ marginBottom: 'auto' }} />
                  </Box>
                </Box>
                : <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  alignContent='flex-end'
                >
                </Box>
              }
              <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Tooltip title={`${t('matches.defender')} ${match.blue.defender} ${t('matches.striker')} ${match.blue.striker}`}>
                  <Typography variant="subtitle1" color="primary" sx={{ cursor: 'help' }}>
                    {t('matches.teamBlue')}
                  </Typography>
                </Tooltip>
                <Typography variant="body1" fontWeight='700' sx={{ marginLeft: '5vw' }}>{match.blue.score}</Typography>
                <Typography
                  variant='body1'
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => { goToTeamPage(match.blue.id) }}
                >
                  {t('matches.teamPage')}
                </Typography>
              </Box>
              <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Tooltip title={`${t('matches.defender')} ${match.red.defender} ${t('matches.striker')} ${match.red.striker}`}>
                  <Typography variant="subtitle1" color="secondary" sx={{ cursor: 'help' }}>
                    {t('matches.teamRed')}
                  </Typography>
                </Tooltip>
                <Typography variant="body1" fontWeight='700' sx={{ marginLeft: '5vw' }}>{match.red.score}</Typography>
                <Typography
                  variant='body1'
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => { goToTeamPage(match.red.id) }}
                >
                  {t('matches.teamPage')}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Scrollbar>
    )}
  </Paper>
}
