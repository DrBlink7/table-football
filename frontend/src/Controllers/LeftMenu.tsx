import { useCallback, type FC } from 'react'
import {
  Stack,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  lighten,
  useTheme,
  Paper
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { clearUserState, logout } from '../Store/users'
import { clearPlayerState } from '../Store/player'
import { getLeftMenuButtonStyle } from '../Utils/f'
import { clearUtilsState, selectComponent, setComponent } from '../Store/util'
import { clearTeamState } from '../Store/team'
import InfoIcon from '@mui/icons-material/Info'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import LogoutIcon from '@mui/icons-material/Logout'
import LanguageSelector from './LanguageSelector'
import * as ls from '../Utils/ls'

const LeftMenu: FC = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const { t } = useTranslation()

  const component = useAppSelector(selectComponent)

  const changeComponent = useCallback((c: HomeComponent) => {
    dispatch(setComponent(c))
  }, [dispatch])

  const logOut = useCallback(() => {
    dispatch(clearUserState())
    dispatch(clearPlayerState())
    dispatch(clearUtilsState())
    dispatch(clearTeamState())
    dispatch(logout())
    ls.del('tableFootball')
  }, [dispatch])

  return <Stack display="flex" width="20%" height="100%" minWidth='180px' component={Paper} data-testid="left-menu">
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
          data-testid="info-list-button"
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
          data-testid="players-list-button"
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
          data-testid="teams-list-button"
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
          data-testid="matches-list-button"
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
          data-testid="stats-list-button"
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

export default LeftMenu
