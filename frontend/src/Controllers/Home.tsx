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
  Typography,
  Button
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { clearUserState, logout, selectToken } from '../Store/users'
import {
  clearErrorMessage,
  clearPlayerState,
  deleteAPlayer,
  retrievePlayerList,
  selectErrorMessage,
  selectPlayerList,
  selectPlayerListStatus,
  setErrorMessage
} from '../Store/player'
import { formatDataForTable, getHomeButtonStyle, getLeftMenuButtonStyle } from '../Utils/f'
import { useNavigate } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import LogoutIcon from '@mui/icons-material/Logout'
import LanguageSelector from './LanguageSelector'
import CustomTable from './CustomTable'
import Loader from '../Components/Loader'
import ErrorComponent from '../Components/Error'
import DefaultHomeLogo from '../Components/DefaultHomeLogo'
import * as ls from '../Utils/ls'
import ConfirmationDialog from '../Components/ConfirmationDialog'

const Home: FC = () => {
  const dispatch = useAppDispatch()

  const [component, setComponent] = useState<HomeComponent>('home')

  const logOut = useCallback(() => {
    dispatch(clearUserState())
    dispatch(clearPlayerState())
    dispatch(logout())
    ls.del('tableFootball')
  }, [dispatch])

  const changeComponent = useCallback((component: HomeComponent) => {
    setComponent(component)
  }, [])

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
      <LeftMenu changeComponent={changeComponent} component={component} logOut={logOut} />
      <Component component={component} />
    </Box >
  </Stack >
}

interface ComponentProps {
  component: HomeComponent
}

const Component: FC<ComponentProps> = ({ component }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const token = useAppSelector(selectToken)
  const errorMessage = useAppSelector(selectErrorMessage)
  const playerListStatus = useAppSelector(selectPlayerListStatus)
  const playerList = useAppSelector(selectPlayerList)

  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [, setCreatePlayer] = useState<boolean>(false)
  const [, setEditPlayer] = useState<boolean>(false)
  const [deletePlayer, setDeletePlayer] = useState<boolean>(false)

  const handleRowSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!Boolean(value) || isNaN(Number(value))) return
    setSelectedRow(Number(value))
  }, [])

  const clearError = useCallback(() => {
    dispatch(clearErrorMessage())
  }, [dispatch])

  const goToPlayerPage = useCallback(() => {
    if (!Boolean(selectedRow)) return
    navigate(`/player/${selectedRow}`)
  }, [navigate, selectedRow])

  const openCreatePlayer = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setCreatePlayer(true)
  }, [selectedRow])

  // const closeCreatePlayer = useCallback(() => {
  //   if (!Boolean(selectedRow)) return
  //   setCreatePlayer(false)
  // }, [selectedRow])

  const openEditPlayer = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setEditPlayer(true)
  }, [selectedRow])

  // const closeEditPlayer = useCallback(() => {
  //   if (!Boolean(selectedRow)) return
  //   setEditPlayer(false)
  // }, [selectedRow])

  const openDeletePlayer = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setDeletePlayer(true)
  }, [selectedRow])

  const closeDeletePlayer = useCallback(() => {
    if (!Boolean(selectedRow)) return
    setDeletePlayer(false)
  }, [selectedRow])

  const handleDelete = useCallback(async () => {
    if (!Boolean(selectedRow)) return
    try {
      await dispatch(deleteAPlayer({ token, id: String(selectedRow) }))
      setDeletePlayer(false)
    } catch (e) {
      dispatch(setErrorMessage(typeof e === 'string' ? e : String(e)))
    }
  }, [dispatch, selectedRow, token])

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
    return <Loader />
  }

  if (playerListStatus === 'error') {
    const msg = errorMessage === '' ? 'Investigation status error' : errorMessage

    return <ErrorComponent msg={msg} clearError={clearError} />
  }

  const { rows, columns } = formatDataForTable(playerList, t, 'Player')
  const buttonStyle = getHomeButtonStyle(theme)

  switch (component) {
    case 'team':
      return <Stack
        display='flex'
        width='80%'
        height='100%'
        alignItems='center'
        alignSelf='center'
        justifyContent='center'
        color={theme.palette.primary.contrastText}
        bgcolor={theme.palette.primary.main}
      >{t('home.team')}</Stack>
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
          <Box display='flex' width='100%' alignItems='center' justifyContent='center' height='5%'>
            <Typography>{t('Player.title')}</Typography>
          </Box>
          <CustomTable rows={rows} columns={columns} selectedRow={selectedRow} handleRowSelect={handleRowSelect} />
          <Box display='flex' width='100%' flexDirection='row' height='12%' justifyContent='space-between' alignItems='center'>
            <Button variant="contained" sx={buttonStyle} onClick={openCreatePlayer}>
              {t('Player.create')}
            </Button>
            <Button variant="contained" disabled={!Boolean(selectedRow)} sx={buttonStyle} onClick={openEditPlayer}>
              {t('Player.edit')}
            </Button>
            <Button variant="contained" disabled={!Boolean(selectedRow)} sx={buttonStyle} onClick={openDeletePlayer}>
              {t('Player.delete')}
            </Button>
            <Button variant="contained" disabled={!Boolean(selectedRow)} onClick={goToPlayerPage} sx={buttonStyle}>
              {t('Player.browse')}
            </Button>
          </Box>
          <ConfirmationDialog
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            confirm={handleDelete}
            undo={closeDeletePlayer}
            open={deletePlayer}
            title={t('deletePlayer.title')}
            dialogText={`${t('deletePlayer.dialogText')}'${selectedRow}'`}
          />
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
    default:
      return <DefaultHomeLogo />
  }
}
interface LeftMenuProps {
  changeComponent: (component: HomeComponent) => void
  logOut: () => void
  component: HomeComponent
}

const LeftMenu: FC<LeftMenuProps> = ({ component, changeComponent, logOut }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return <Stack display="flex" width="20%" height="100%" minWidth='180px' component={Paper}>
    <Box display='flex'>
      <LanguageSelector />
    </Box>
    <List
      sx={{
        padding: 0,
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        marginTop: '1vh',
        justifyContent: 'space-between'
      }}
    >
      <Box display='flex' flexDirection='column' height='90%'>
        <ListItemButton
          key='info'
          onClick={() => { changeComponent('info') }}
          sx={getLeftMenuButtonStyle(component, theme, 'info')}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={t('home.info')} sx={{ display: 'flex' }} />
        </ListItemButton>
        <ListItemButton
          key='players'
          onClick={() => { changeComponent('players') }}
          sx={getLeftMenuButtonStyle(component, theme, 'players')}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={t('home.players')} sx={{ display: 'flex' }} />
        </ListItemButton>
        <ListItemButton
          key='team'
          onClick={() => { changeComponent('team') }}
          sx={getLeftMenuButtonStyle(component, theme, 'team')}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={t('home.team')} sx={{ display: 'flex' }} />
        </ListItemButton>
        <ListItemButton
          key='matches'
          onClick={() => { changeComponent('matches') }}
          sx={getLeftMenuButtonStyle(component, theme, 'matches')}
        >
          <ListItemIcon>
            <SportsSoccerIcon />
          </ListItemIcon>
          <ListItemText primary={t('home.matches')} sx={{ display: 'flex' }} />
        </ListItemButton>
        <ListItemButton
          key='stats'
          onClick={() => { changeComponent('stats') }}
          sx={getLeftMenuButtonStyle(component, theme, 'stats')}
        >
          <ListItemIcon>
            <QueryStatsIcon />
          </ListItemIcon>
          <ListItemText primary={t('home.stats')} sx={{ display: 'flex' }} />
        </ListItemButton>
      </Box>
      <Box display='flex' flexDirection='column' height='10%'>
        <ListItemButton
          key='logout'
          data-testid="logout-button"
          onClick={logOut}
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
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={t('home.logout')} sx={{ display: 'flex' }} />
        </ListItemButton>
      </Box>
    </List>
  </Stack>
}

export default Home
