import { type FC } from 'react'
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

interface MatchPageProps {
  match: Match
  goBackToMatchPage: () => void
  goToTeamPage: (id: number) => void
}

const MatchPage: FC<MatchPageProps> = ({ match, goBackToMatchPage, goToTeamPage }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return <Stack
    display='flex'
    width='100%'
    height='100%'
    bgcolor={theme.palette.primary.main}
    data-testid="match-component"
  >
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
      <Stack
        display='flex'
        width='75%'
        height='85%'
        padding='2%'
        borderRadius='5%'
        component={Paper}
      >
        <Typography variant="h3" alignSelf='center' marginBottom='2vh'>{t('Match.title')}</Typography>
        <Box display='flex' width='100%' height='100%' justifyContent='center'>
          <Paper key={match.id} elevation={2} sx={{ my: 1, p: 2 }}>
            <Stack spacing={2} display='flex' flexDirection='column' key={match.id} width='100%'>
              <Box display='flex' flexDirection='row' justifyContent='space-between' width='100%'>

                <Typography variant="subtitle1" color="primary" sx={{ cursor: 'help', width: '15%' }}>
                  {match.blue.name}
                </Typography>
                <Typography sx={{ width: '15%', display: 'flex' }}>
                  {`${t('matches.defender')} ${match.blue.defender} ${t('matches.striker')} ${match.blue.striker}`}
                </Typography>
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
                <Typography variant="subtitle1" color="secondary" sx={{ cursor: 'help', width: '15%' }}>
                  {match.red.name}
                </Typography>
                <Typography sx={{ width: '15%', display: 'flex' }}>
                  {`${t('matches.defender')} ${match.red.defender} ${t('matches.striker')} ${match.red.striker}`}
                </Typography>
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
        </Box>
      </Stack>
    </Stack>
    <Box height='10%' />
  </Stack>
}

export default MatchPage
