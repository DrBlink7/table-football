import { type FC } from 'react'
import { Stack, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../Utils/store'
import { selectComponent } from '../Store/util'
import Players from './Players'
import Teams from './Teams'
import DefaultHomeLogo from '../Components/DefaultHomeLogo'

const MainPage: FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const component = useAppSelector(selectComponent)

  switch (component) {
    case 'team':
      return <Teams />
    case 'info':
      return <Stack
        display='flex'
        width='80%'
        height='100%'
        alignItems='center'
        alignSelf='center'
        justifyContent='center'
        color={theme.palette.primary.contrastText}
        bgcolor={theme.palette.primary.main}
      >{t('home.info')}</Stack>
    case 'matches':
      return <Stack
        display='flex'
        width='80%'
        height='100%'
        alignItems='center'
        alignSelf='center'
        justifyContent='center'
        color={theme.palette.primary.contrastText}
        bgcolor={theme.palette.primary.main}
      >{t('home.matches')}</Stack>
    case 'players':
      return <Players />
    case 'stats':
      return <Stack
        display='flex'
        width='80%'
        height='100%'
        alignItems='center'
        alignSelf='center'
        justifyContent='center'
        color={theme.palette.primary.contrastText}
        bgcolor={theme.palette.primary.main}
      >{t('home.stats')}</Stack>
    default:
      return <DefaultHomeLogo />
  }
}

export default MainPage
