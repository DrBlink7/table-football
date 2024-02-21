import { type FC } from 'react'
import { Stack, useTheme } from '@mui/material'
import BgImage from './BgImage'

const DefaultHomeLogo: FC = () => {
  const theme = useTheme()

  return <Stack
    display='flex'
    width='80%'
    height='100%'
    alignItems='center'
    alignSelf='center'
    justifyContent='center'
    color={theme.palette.primary.contrastText}
    bgcolor={theme.palette.primary.main}
  >
    <BgImage style={{ width: '100%', backgroundColor: theme.palette.primary.main }} />
  </Stack>
}

export default DefaultHomeLogo
