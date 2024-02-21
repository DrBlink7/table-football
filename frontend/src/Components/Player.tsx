import { useState, type FC, useCallback } from 'react'
import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../Utils/store'
import { setComponent } from '../Store/util'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ErrorComponent from './Error'
import ImageLayout from './ImageLayout'
import blueShirt from '../Images/blue.png'
import redShirt from '../Images/red.png'

const Player: FC = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const { t } = useTranslation()

  const [teamColor, setTeamColor] = useState<TeamColor>('blue')

  const clearError = useCallback(() => {
    dispatch(setComponent('home'))
    navigate('/')
  }, [dispatch, navigate])

  const goBackToPlayerPage = useCallback(() => {
    dispatch(setComponent('players'))
    navigate('/')
  }, [dispatch, navigate])

  const changeTeam = useCallback(() => {
    if (teamColor === 'blue') setTeamColor('red')
    else setTeamColor('blue')
  }, [teamColor])

  if (id === undefined) return <ErrorComponent msg='id cannot be undefined' clearError={clearError} />

  const blue = theme.palette.primary
  const red = theme.palette.secondary

  return <Stack display='flex' width='100%' height='100%' bgcolor={teamColor === 'blue' ? blue.main : red.main}>
    <Box display='flex' onClick={goBackToPlayerPage} sx={{ cursor: 'pointer' }} height='10%' alignItems='center' padding='0 2vw'>
      <ArrowBackIosIcon color={teamColor === 'blue' ? 'secondary' : 'primary'} />
      <Typography color={teamColor === 'blue' ? 'secondary' : 'primary'}>{t('player.back')}</Typography>
    </Box>
    <Stack
      display='flex'
      width='100%'
      height='80%'
      alignItems='center'
      justifyContent='center'
    >
      <Stack
        display='flex'
        width='75%'
        height='85%'
        padding='2%'
        borderRadius='5%'
        component={Paper}
      >
        <Typography variant="h3" alignSelf='center' marginBottom='2vh'>{t('player.title')}</Typography>
        <Box display='flex' width='100%' height='100%' justifyContent='center'>
          <Box display='flex' width='45%' flexDirection='column' justifyContent='space-between'>
            <ImageLayout
              style={{ height: '70%', bgcolor: 'transparent', backgroundPosition: 'top' }}
              url={teamColor === 'blue' ? blueShirt : redShirt}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: teamColor === 'blue' ? red.main : blue.main,
                '&:hover': { backgroundColor: teamColor === 'blue' ? red.light : blue.light },
                '&:active': { backgroundColor: teamColor === 'blue' ? red.dark : blue.light }
              }
              } onClick={changeTeam}>
              {t(`player.cheer${teamColor === 'blue' ? 'red' : 'blue'}`)}
            </Button>
          </Box>
          <Box display='flex' width='45%' flexDirection='column'>
            <Typography>{t('player.id')} {id}</Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
    <Box height='10%' />
  </Stack>
}

export default Player
