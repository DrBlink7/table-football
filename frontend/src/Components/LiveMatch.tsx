import { useEffect, type FC } from 'react'
import { Box, Paper, Stack, Tooltip, Typography, keyframes, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../Utils/store'
import { dismissMatchNotification, selectSseNotificationMatch } from '../Store/sse'
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

  const notification = useAppSelector(selectSseNotificationMatch(match.id))

  const blinkAnimation = keyframes`
  0% { color: ${theme.palette.primary.main}; }
  50% { color: ${theme.palette.secondary.main}; }
  100% { color: ${theme.palette.primary.main}; }
  `

  useEffect(() => {
    if (notification.message !== '') {
      toast.success(notification.message, {
        position: 'top-center',
        autoClose: 5000
      })
      dispatch(dismissMatchNotification({ matchid: match.id }))
    }
  }, [dispatch, match.id, notification.message, t])

  return <Stack
    display='flex'
    width='100%'
    height='100%'
    bgcolor={theme.palette.primary.main}
    data-testid="match-component"
  >
    <ToastContainer position="top-center" autoClose={15000} />
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
              <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Tooltip title={`${t('matches.defender')} ${match.blue.defender} ${t('matches.striker')} ${match.blue.striker}`}>
                  <Typography variant="subtitle1" color="primary" sx={{ cursor: 'help' }}>
                    {t('matches.teamBlue')}
                  </Typography>
                </Tooltip>
                <Typography variant="body1" fontWeight='700' sx={{ marginLeft: '5vw' }}>{match.blue.score}</Typography>
              </Box>
              <Box display='flex' flexDirection='row' justifyContent='space-between'>
                <Tooltip title={`${t('matches.defender')} ${match.red.defender} ${t('matches.striker')} ${match.red.striker}`}>
                  <Typography variant="subtitle1" color="secondary" sx={{ cursor: 'help' }}>
                    {t('matches.teamRed')}
                  </Typography>
                </Tooltip>
                <Typography variant="body1" fontWeight='700' sx={{ marginLeft: '5vw' }}>{match.red.score}</Typography>
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
