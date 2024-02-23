import { type FC } from 'react'
import { Box, Button, type PaletteColor, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ImageLayout from './ImageLayout'
import blueShirt from '../Images/blue.png'
import redShirt from '../Images/red.png'

interface PlayerPageProps {
  blue: PaletteColor
  red: PaletteColor
  teamColor: TeamColor
  id: string
  changeTeam: () => void
  goBackToPlayerPage: () => void
}

const PlayerPage: FC<PlayerPageProps> = ({ blue, red, id, teamColor, changeTeam, goBackToPlayerPage }) => {
  const { t } = useTranslation()

  return <Stack
    display='flex'
    width='100%'
    height='100%'
    bgcolor={teamColor === 'blue' ? blue.main : red.main}
    data-testid="player-component"
  >
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
          <Box display='flex' width='35%' flexDirection='column' justifyContent='space-between'>
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
              }} onClick={changeTeam}>
              {t(`player.cheer${teamColor === 'blue' ? 'red' : 'blue'}`)}
            </Button>
          </Box>
          <Box display='flex' width='55%' flexDirection='column'>
            <Typography>{t('player.id')} {id}</Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
    <Box height='10%' />
  </Stack>
}

export default PlayerPage
