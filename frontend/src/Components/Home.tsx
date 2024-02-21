import { type FC } from 'react'
import { Stack, Box, CssBaseline } from '@mui/material'
import MainPage from '../Controllers/MainPage'
import LeftMenu from '../Controllers/LeftMenu'

const Home: FC = () => <Stack
  data-testid="home-component"
  display='flex'
  height='100vh'
  width='100vw'
  flexDirection='row'
>
  <CssBaseline />
  <Box
    display='flex'
    flexDirection='row'
    alignItems='center'
    alignSelf='center'
    justifyContent='center'
    width='100%'
    height='100%'
  >
    <LeftMenu />
    <MainPage />
  </Box>
</Stack>

export default Home
