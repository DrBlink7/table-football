import { type FC } from 'react'
import { Box, IconButton, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { keyframes } from '@emotion/react'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import EditIcon from '@mui/icons-material/Edit'

interface MatchListProps {
  isOpen: boolean
  matches: Match[]
  title: string
  testIdLabel: string
  goToStats: () => void
  toggle: () => void
  goToLiveMatch: (id: number) => void
  goToTeamPage: (id: number) => void
  matchToEdit?: (id: number) => void
  matchToDelete?: (id: number) => void
}
const MatchList: FC<MatchListProps> = ({
  isOpen, matches, title, testIdLabel, goToLiveMatch, goToStats, goToTeamPage, toggle, matchToEdit, matchToDelete
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const blinkAnimation = keyframes`
  0% { color: ${theme.palette.primary.main}; }
  50% { color: ${theme.palette.secondary.main}; }
  100% { color: ${theme.palette.primary.main}; }
  `

  return <Paper elevation={1} sx={{ p: 1, margin: title === t('matches.onGoing') ? 0 : '2vh 0' }} data-testid={testIdLabel}>
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Typography variant='subtitle1'>{title} ({matches.length})</Typography>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Typography
          variant='subtitle1'
          sx={{ ml: 1, textDecoration: 'underline', cursor: 'pointer' }}
          onClick={goToStats}
        >
          {t('matches.stats')}
        </Typography>
        <IconButton onClick={toggle}>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
    </Box>
    {isOpen && matches.map(match => (
      <Paper key={match.id} elevation={2} sx={{ my: 1, p: 2 }}>
        <Stack spacing={2} display='flex' flexDirection='column' key={match.id} width='100%'>
          {match.status === 'ongoing'
            ? <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Box
                onClick={() => { goToLiveMatch(match.id) }}
                display='flex'
                sx={{
                  cursor: 'pointer',
                  color: theme.palette.primary.main,
                  transition: 'color 1.5s ease-in-out',
                  animation: `${blinkAnimation} 1s linear infinite alternate`
                }}
              >
                <Typography mr='1vw'>{t('matches.live')}</Typography>
                <LiveTvIcon fontSize='small' sx={{ marginBottom: 'auto' }} />
              </Box>
            </Box>
            : <Box
              display='flex'
              alignItems='center'
              justifyContent='flex-end'
              alignContent='center'
            >
              {(matchToEdit !== undefined) && <>
                <Typography>{t('matches.edit')}</Typography>
                <EditIcon onClick={() => { matchToEdit(match.id) }} sx={{ cursor: 'pointer' }} />
              </>}
              {(matchToDelete !== undefined) && <>
                <Typography>{t('matches.delete')}</Typography>
                <DeleteForeverOutlinedIcon onClick={() => { matchToDelete(match.id) }} sx={{ cursor: 'pointer' }} />
              </>}
            </Box>
          }
          <Box display='flex' flexDirection='row' justifyContent='space-between' width='100%'>
            <Tooltip
              title={`${t('matches.defender')} ${match.blue.defender} ${t('matches.striker')} ${match.blue.striker}`}
              sx={{ width: '15%', display: 'flex' }}
            >
              <Typography variant="subtitle1" color="primary" sx={{ cursor: 'help', width: '15%' }}>
                {t('matches.teamBlue')}
              </Typography>
            </Tooltip>
            <Typography variant="body1" fontWeight='700' width='30%' display='flex' justifyContent='flex-end'>
              {match.blue.score}
            </Typography>
            <Box
              width='55%'
              display='flex'
              justifyContent='flex-end'
            >
              <Typography
                variant='body1'
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => { goToTeamPage(match.blue.id) }}
              >
                {t('matches.teamPage')}
              </Typography>
            </Box>
          </Box>
          <Box display='flex' flexDirection='row' justifyContent='space-between' width='100%'>
            <Tooltip
              title={`${t('matches.defender')} ${match.red.defender} ${t('matches.striker')} ${match.red.striker}`}
              sx={{ width: '15%', display: 'flex' }}
            >
              <Typography variant="subtitle1" color="secondary" sx={{ cursor: 'help', width: '15%' }}>
                {t('matches.teamRed')}
              </Typography>
            </Tooltip>
            <Typography variant="body1" fontWeight='700' width='30%' display='flex' justifyContent='flex-end'>
              {match.red.score}
            </Typography>
            <Box
              width='55%'
              display='flex'
              justifyContent='flex-end'
            >
              <Typography
                variant='body1'
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => { goToTeamPage(match.red.id) }}
              >
                {t('matches.teamPage')}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>
    ))}
  </Paper>
}

export default MatchList
