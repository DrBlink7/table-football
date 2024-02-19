import { useCallback, type FC } from 'react'
import { Stack, useTheme, Box, CssBaseline, Typography, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../Utils/store'
import { clearUserState, logout } from '../Store/users'
import { Version } from '../Utils/config'
import LogOut from '../Components/LogOut'
import InfoIcon from '@mui/icons-material/Info'
import * as ls from '../Utils/ls'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const theme = useTheme()

  const logOut = useCallback(() => {
    dispatch(clearUserState())
    dispatch(logout())
    ls.del('tableFootball')
  }, [dispatch])

  return <Stack
    data-testid="home-component"
    display='flex'
    height='100vh'
    width='100vw'
    flexDirection='row'
    sx={{
      backgroundColor: theme.palette.primary.main
    }}
  >
    <CssBaseline />
    <Box width='32.5%' />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '35%',
        padding: '4%',
        borderRadius: '5%',
        height: '55vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <Stack spacing={3} alignItems="center" width='100%'>
        HOME
      </Stack>
    </Box>
    <Box
      display='flex'
      flexDirection='column'
      width='32.5%'
      height='100%'
      justifyContent='space-between'
      color={theme.palette.primary.contrastText}
    >
      <Box
        display='flex'
        alignSelf='flex-end'
        padding='1vh 1vw'
        alignItems='center'
        data-testid="logout-button"
        sx={{ cursor: 'pointer' }}
        onClick={logOut}
      >
        <Typography
          fontSize='small'
          marginRight='10px'
        >
          {t('home.logout')}
        </Typography>
        <LogOut />
      </Box>
      <Tooltip title={`${t('home.version')} ${Version}`}>
        <InfoIcon sx={{ alignSelf: 'flex-end', cursor: 'pointer', margin: '0 1vw 1vh 0' }} />
      </Tooltip>
    </Box>
  </Stack >
}

export default Home
