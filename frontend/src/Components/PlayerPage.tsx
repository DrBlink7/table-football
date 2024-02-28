import { type FC } from 'react'
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../Utils/store'
import { selectPlayerStats } from '../Store/player'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

interface PlayerPageProps {
  goBackToPlayerPage: () => void
}

const PlayerPage: FC<PlayerPageProps> = ({ goBackToPlayerPage }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const playerStats = useAppSelector(selectPlayerStats)

  return <Stack
    display='flex'
    width='100%'
    height='100%'
    bgcolor={theme.palette.primary.main}
    data-testid="player-component"
  >
    <Box display='flex' onClick={goBackToPlayerPage} sx={{ cursor: 'pointer' }} height='10%' alignItems='center' padding='0 2vw'>
      <ArrowBackIosIcon color='secondary' />
      <Typography color='secondary'>{t('player.back')}</Typography>
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
        <Typography variant="h3" alignSelf='center' marginBottom='5vh'>{t('player.title')} {playerStats.name}</Typography>
        <Box display='flex' width='100%' height='100%' justifyContent='center'>
          <Box display='flex' width='45%' flexDirection='column'>
            <Typography m='2vh 0'>{t('player.defenderPlayed')} {playerStats.defenderPlayed}</Typography>
            <Typography m='2vh 0'>{t('player.goalsConceded')} {playerStats.goalsConceded}</Typography>
            <Typography m='2vh 0'>{t('player.goalsConcededPerMatch')} {playerStats.goalsConcededPerMatch}</Typography>
            <Typography m='2vh 0'>{t('player.playedForBlue')} {playerStats.playedForBlue}</Typography>
          </Box>
          <Box display='flex' width='45%' flexDirection='column'>
            <Typography m='2vh 0'>{t('player.strikerPlayed')} {playerStats.strikerPlayed}</Typography>
            <Typography m='2vh 0'>{t('player.goalsScored')} {playerStats.goalsScored}</Typography>
            <Typography m='2vh 0'>{t('player.goalsScoredPerMatch')} {playerStats.goalsScoredPerMatch}</Typography>
            <Typography m='2vh 0'>{t('player.playedForRed')} {playerStats.playedForRed}</Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
    <Box height='10%' />
  </Stack>
}

export default PlayerPage
