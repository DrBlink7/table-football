import { useCallback, type FC, useState, useEffect } from 'react'
import {
  Stack,
  Box,
  CssBaseline,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  lighten,
  useTheme,
  Paper,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { clearUserState, logout, selectToken } from '../Store/users'
import {
  clearErrorMessage,
  retrievePlayerList,
  selectErrorMessage,
  selectPlayerList,
  selectPlayerListStatus,
  setErrorMessage
} from '../Store/player'
import { formatDataForTable } from '../Utils/f'
import InfoIcon from '@mui/icons-material/Info'
import PersonIcon from '@mui/icons-material/Person'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import LogoutIcon from '@mui/icons-material/Logout'
import LanguageSelector from './LanguageSelector'
import Loader from '../Components/Loader'
import ErrorComponent from '../Components/Error'
import CustomTable from './CustomTable'
import * as ls from '../Utils/ls'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const { t } = useTranslation()

  const logOut = useCallback(() => {
    dispatch(clearUserState())
    dispatch(logout())
    ls.del('tableFootball')
  }, [dispatch])

  const changeComponent = useCallback((component: HomeComponent) => {
    setComponent(component)
  }, [])

  const [component, setComponent] = useState<HomeComponent>('home')

  return <Stack
    data-testid="home-component"
    display='flex'
    height='100vh'
    width='100vw'
    flexDirection='row'
  >
    <CssBaseline />
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      alignSelf='center'
      justifyContent='center'
      width='100%'
      height='100%'
    >
      <Stack display="flex" width="20%" height="100%" minWidth='180px' component={Paper} >
        <Box display='flex'>
          <LanguageSelector />
        </Box>
        <List sx={{
          padding: 0,
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          marginTop: '1vh'
        }}>
          <ListItemButton
            key='info'
            onClick={() => { changeComponent('info') }}
            sx={{
              display: 'flex',
              maxHeight: '10vh',
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: lighten(theme.palette.primary.light, 0.6),
                color: theme.palette.text.primary
              }
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={t('home.info')} sx={{ display: 'flex' }} />
          </ListItemButton>
          <ListItemButton
            key='players'
            onClick={() => { changeComponent('players') }}
            sx={{
              display: 'flex',
              maxHeight: '10vh',
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: lighten(theme.palette.primary.light, 0.6),
                color: theme.palette.text.primary
              }
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={t('home.players')} sx={{ display: 'flex' }} />
          </ListItemButton>
          <ListItemButton
            key='matches'
            onClick={() => { changeComponent('matches') }}
            sx={{
              display: 'flex',
              maxHeight: '10vh',
              '&:hover': {
                backgroundColor: lighten(theme.palette.primary.light, 0.6),
                color: theme.palette.text.primary
              }
            }}
          >
            <ListItemIcon>
              <SportsSoccerIcon />
            </ListItemIcon>
            <ListItemText primary={t('home.matches')} sx={{ display: 'flex' }} />
          </ListItemButton>
          <ListItemButton
            key='stats'
            onClick={() => { changeComponent('stats') }}
            sx={{
              display: 'flex',
              maxHeight: '10vh',
              '&:hover': {
                backgroundColor: lighten(theme.palette.primary.light, 0.6),
                color: theme.palette.text.primary
              }
            }}
          >
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText primary={t('home.stats')} sx={{ display: 'flex' }} />
          </ListItemButton>
          <ListItemButton
            key='logout'
            data-testid="logout-button"
            sx={{
              display: 'flex',
              maxHeight: '10vh',
              '&:hover': {
                backgroundColor: lighten(theme.palette.primary.light, 0.6),
                color: theme.palette.text.primary
              }
            }}
            onClick={logOut}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('home.logout')} sx={{ display: 'flex' }} />
          </ListItemButton>
        </List>
      </Stack>
      <Component component={component} />
    </Box>
  </Stack>
}

interface ComponentProps {
  component: HomeComponent
}

const Component: FC<ComponentProps> = ({ component }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)
  const errorMessage = useAppSelector(selectErrorMessage)
  const playerListStatus = useAppSelector(selectPlayerListStatus)
  const playerList = useAppSelector(selectPlayerList)

  const clearError = useCallback(() => {
    dispatch(clearErrorMessage())
  }, [dispatch])

  useEffect(() => {
    (async () => {
      try {
        await dispatch(retrievePlayerList({ token }))
      } catch (e) {
        dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
      }
    })()
      .catch(e => { dispatch(setErrorMessage(typeof e === 'string' ? e : String(e))) })
  }, [token, dispatch])

  if (playerListStatus === 'loading') {
    return <Stack
      display='flex'
      width='80%'
      height='100%'
    >
      <Loader />
    </Stack>
  }

  if (playerListStatus === 'error') {
    const msg = errorMessage === '' ? 'Investigation status error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  const { rows, columns } = formatDataForTable(playerList, t, 'Player')

  switch (component) {
    case 'home':
      return <Stack
        display='flex'
        width='80%'
        height='100%'
        alignItems='center'
        alignSelf='center'
        justifyContent='center'
        color={theme.palette.primary.contrastText}
        bgcolor={theme.palette.primary.main}
      />
    case 'info':
      return <Stack
        display='flex'
        width='80%'
        height='100%'
        alignItems='center'
        alignSelf='center'
        justifyContent='center'
        color={theme.palette.primary.contrastText}
        bgcolor={theme.palette.primary.main}
      >{t('home.info')}</Stack>
    case 'matches':
      return <Stack
        display='flex'
        width='80%'
        height='100%'
        alignItems='center'
        alignSelf='center'
        justifyContent='center'
        color={theme.palette.primary.contrastText}
        bgcolor={theme.palette.primary.main}
      >{t('home.matches')}</Stack>
    case 'players':
      return <Stack
        display='flex'
        width='80%'
        height='100%'
        color={theme.palette.primary.contrastText}
        bgcolor={theme.palette.primary.main}
      >
        <Box display='flex' width='98%' alignSelf='center' flexDirection='column' height='100%'>
          <Box display='flex' width='100%' alignItems='center' justifyContent='center' height='9%'>
            <Typography>{t('players.title')}</Typography>
          </Box>
          <CustomTable rows={rows} columns={columns} />
          <Box display='flex' width='100%' alignItems='center' justifyContent='center' flexDirection='column' height='9%'>
            <Typography>{t('players.footer')}</Typography>
          </Box>
        </Box>
      </Stack >
    case 'stats':
      return <Stack
        display='flex'
        width='80%'
        height='100%'
        alignItems='center'
        alignSelf='center'
        justifyContent='center'
        color={theme.palette.primary.contrastText}
        bgcolor={theme.palette.primary.main}
      >{t('home.stats')}</Stack>
  }
}

export default Home
