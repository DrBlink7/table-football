import { type FC } from 'react'
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../Utils/store'
import { selectTeamStats } from '../Store/team'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Scrollbar from 'react-perfect-scrollbar'
import MatchList from '../Controllers/MatchList'
import 'react-perfect-scrollbar/dist/css/styles.css'

interface TeamPageProps {
  goBackToTeamPage: () => void
  goToTeamPage: (id: number) => void
  goToLiveMatch: (id: number) => void
  goToStats: () => void
  toggleOnGoingFoldable: () => void
  toggleEndedFoldable: () => void
  togglePreparingFoldable: () => void
  isOnGoingFoldableOpen: boolean
  isEndedFoldableOpen: boolean
  isPreparingFoldableOpen: boolean
}

const TeamPage: FC<TeamPageProps> = ({
  goBackToTeamPage,
  goToLiveMatch,
  goToStats,
  goToTeamPage,
  toggleEndedFoldable,
  toggleOnGoingFoldable,
  togglePreparingFoldable,
  isEndedFoldableOpen,
  isOnGoingFoldableOpen,
  isPreparingFoldableOpen
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const teamStats = useAppSelector(selectTeamStats)

  return <Stack
    display='flex'
    width='100%'
    height='100%'
    bgcolor={theme.palette.primary.main}
    data-testid="team-component"
  >
    <Box display='flex' onClick={goBackToTeamPage} sx={{ cursor: 'pointer' }} height='10%' alignItems='center' padding='0 2vw'>
      <ArrowBackIosIcon color='secondary' />
      <Typography color={'secondary'}>{t('team.back')}</Typography>
    </Box>
    <Stack
      display='flex'
      width='100%'
      height='90%'
      alignItems='center'
      marginBottom='2vh'
    >
      <Scrollbar style={{ maxHeight: '90vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack display='flex' width='75%' height='40%' padding='2%' borderRadius='5%' component={Paper}>
          <Typography variant="h3" alignSelf='center' marginBottom='5vh'>{t('team.title')} {teamStats.name}</Typography>
          <Box display='flex' width='100%' height='100%' justifyContent='center'>
            <Box display='flex' width='45%' flexDirection='column'>
              <Typography m='2vh 0'>{t('team.defenderName')} {teamStats.defender.name}</Typography>
              <Typography m='2vh 0'>{t('team.goalsConceded')} {teamStats.goalsConceded}</Typography>
              <Typography m='2vh 0'>{t('team.gamesPlayed')} {teamStats.gamesPlayed}</Typography>
            </Box>
            <Box display='flex' width='45%' flexDirection='column'>
              <Typography m='2vh 0'>{t('team.strikerName')} {teamStats.striker.name}</Typography>
              <Typography m='2vh 0'>{t('team.goalsScored')} {teamStats.goalsScored}</Typography>
              <Typography m='2vh 0'>{t('team.points')} {teamStats.points}</Typography>
            </Box>
          </Box>
        </Stack>
        <Stack display='flex' width='78%' height='40%' padding='2%'>
          <MatchList
            matches={teamStats.onGoingMatches}
            isOpen={isOnGoingFoldableOpen}
            title={t('matches.onGoing')}
            goToStats={goToStats}
            toggle={toggleOnGoingFoldable}
            goToLiveMatch={goToLiveMatch}
            goToTeamPage={goToTeamPage}
            testIdLabel="matches-ongoing"
          />
          <MatchList
            matches={teamStats.preparingMatches}
            isOpen={isPreparingFoldableOpen}
            title={t('matches.preparing')}
            goToStats={goToStats}
            toggle={togglePreparingFoldable}
            goToLiveMatch={goToLiveMatch}
            goToTeamPage={goToTeamPage}
            testIdLabel="matches-preparing"
          />
          <MatchList
            matches={teamStats.endedMatches}
            isOpen={isEndedFoldableOpen}
            title={t('matches.ended')}
            goToStats={goToStats}
            toggle={toggleEndedFoldable}
            goToLiveMatch={goToLiveMatch}
            goToTeamPage={goToTeamPage}
            testIdLabel="matches-ended"
          />
        </Stack>
      </Scrollbar>
    </Stack>
  </Stack>
}

export default TeamPage
