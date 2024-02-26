import { type FC } from 'react'
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

interface MatchPageProps {
  id: string
  goBackToMatchPage: () => void
}

const MatchPage: FC<MatchPageProps> = ({ id, goBackToMatchPage }) => {
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
          <Box display='flex' width='35%' flexDirection='column' justifyContent='space-between'>
          </Box>
          <Box display='flex' width='55%' flexDirection='column'>
            <Typography>{t('Match.id')} {id}</Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
    <Box height='10%' />
  </Stack>
}

export default MatchPage