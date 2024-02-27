import { useState, type FC, useCallback } from 'react'
import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useAppSelector } from '../Utils/store'
import { selectUser } from '../Store/users'
import { useTranslation } from 'react-i18next'
import blueShirt from '../Images/blue.png'
import redShirt from '../Images/red.png'
import ImageLayout from '../Components/ImageLayout'

const User: FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const user = useAppSelector(selectUser)

  const [teamColor, setTeamColor] = useState<TeamColor>('blue')

  const changeTeam = useCallback(() => {
    if (teamColor === 'blue') setTeamColor('red')
    else setTeamColor('blue')
  }, [teamColor])

  const blue = theme.palette.primary
  const red = theme.palette.secondary

  return <Stack
    display='flex'
    width='100%'
    height='100%'
    bgcolor={teamColor === 'blue' ? blue.main : red.main}
    data-testid="user-component"
  >
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
        <Typography variant="h3" alignSelf='center' marginBottom='2vh'>{t('user.title')}</Typography>
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
              {t(`user.cheer${teamColor === 'blue' ? 'red' : 'blue'}`)}
            </Button>
          </Box>
          <Box display='flex' width='55%' flexDirection='column'>
            <Typography>{t('user.email')} {user.email}</Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
    <Box height='10%' />
  </Stack>
}

export default User
