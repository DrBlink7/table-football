import { type FC } from 'react'
import { Stack, useTheme } from '@mui/material'
import bg from '../Images/logo.png'
import ImageLayout from './ImageLayout'

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
    <ImageLayout url={bg} style={{ width: '100%', backgroundColor: theme.palette.primary.main }} />
  </Stack>
}

export default DefaultHomeLogo
