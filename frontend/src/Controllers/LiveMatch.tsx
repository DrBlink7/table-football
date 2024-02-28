import { useEffect, type FC } from 'react'
import { Box, Paper, Stack, Typography, keyframes, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { dismissMatchNotification, selectSseNotifications } from '../Store/sse'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import 'react-toastify/dist/ReactToastify.css'
interface LiveMatchProps {
  goBackToMatchPage: () => void
  match: Match
}

const LiveMatch: FC<LiveMatchProps> = ({ goBackToMatchPage, match }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const notifications = useAppSelector(selectSseNotifications)

  const blinkAnimation = keyframes`
  0% { color: ${theme.palette.primary.main}; }
  50% { color: ${theme.palette.secondary.main}; }
  100% { color: ${theme.palette.primary.main}; }
  `

  useEffect(() => {
    if (notifications?.[match.id]?.message !== '') {
      toast.success(notifications?.[match.id]?.message, {
        position: 'top-center',
        autoClose: 5000
      })
      dispatch(dismissMatchNotification({ matchid: match.id }))
    }
  }, [dispatch, match.id, notifications, t])

  return <Stack
    display='flex'
    width='100%'
    height='100%'
    bgcolor={theme.palette.primary.main}
    data-testid="match-component"
  >
    <ToastContainer position="top-center" autoClose={5000} />
    <Box display='flex' onClick={goBackToMatchPage} sx={{ cursor: 'pointer' }} height='10%' alignItems='center' padding='0 2vw'>
      <ArrowBackIosIcon color='secondary' />
      <Typography color={'secondary'}>{t('Match.back')}</Typography>
    </Box>
    <Stack
      display='flex'
      width='100%'
      height='80%'
      alignItems='center'
      justifyContent='center'
    >
      <Box display='flex' width='100%' height='100%' justifyContent='center' alignItems='center'>
        <Paper elevation={1} sx={{ p: 1, margin: 0, display: 'flex', width: '60%', height: '35%', flexDirection: 'column' }}>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{
              color: theme.palette.primary.main,
              transition: 'color 1.5s ease-in-out',
              animation: `${blinkAnimation} 1s linear infinite alternate`
            }}
          >
            <Typography mr='1vw' fontSize='xx-large'>{t('Match.live')}</Typography>
            <LiveTvIcon fontSize='large' sx={{ marginBottom: '0.5vh' }} />
          </Box>
          <Paper key={match.id} elevation={2} sx={{ my: 1, p: 2, display: 'flex', width: '90%', alignSelf: 'center' }}>
            <Stack spacing={2} display='flex' flexDirection='column' key={match.id} width='100%'>
              <Box display='flex' flexDirection='row' justifyContent='space-between' alignContent='center' width='100%'>
                <Typography color="primary" width='20%' fontWeight='700'>
                  {match.blue.name}
                </Typography>
                <Typography color="primary" width='40%'>
                  {`${t('matches.defender')} ${match.blue.defender}`}
                </Typography>
                <Typography color="primary" width='40%'>
                  {`${t('matches.striker')} ${match.blue.striker}`}
                </Typography>
                <Typography fontWeight='700' sx={{ marginLeft: '5vw' }} >{match.blue.score}</Typography>
              </Box>
              <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Typography color="secondary" width='20%' fontWeight='700'>
                  {match.red.name}
                </Typography>
                <Typography color="secondary" width='40%'>
                  {`${t('matches.defender')} ${match.red.defender}`}
                </Typography>
                <Typography color="secondary" width='40%'>
                  {`${t('matches.striker')} ${match.red.striker}`}
                </Typography>
                <Typography fontWeight='700' sx={{ marginLeft: '5vw' }}>{match.red.score}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Paper>
      </Box>
    </Stack>
    <Box height='10%' />
  </Stack>
}

export default LiveMatch
