import { type FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { selectIsUserLogged } from '../Store/users'
import { useAppSelector } from '../Utils/store'
import { mainColor, secondaryColor } from '../Utils/config'
import ErrorBoundary from './Error'
import Login from './Login'
import Player from './Player'
import Team from './Team'
import Match from './Match'
import Home from '../Components/Home'

const theme = createTheme({
  palette: {
    primary: {
      main: mainColor
    },
    secondary: {
      main: secondaryColor
    }
  }
})

const Router: FC = () => {
  const isUserLoggedIn: boolean = useAppSelector(selectIsUserLogged)

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/login"
            element={
              isUserLoggedIn ? <Navigate to="/" /> : <Login />
            }
          />
          <Route
            path="/"
            element={isUserLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/player/:id"
            element={isUserLoggedIn ? <Player /> : <Navigate to="/login" />}
          />
          <Route
            path="/team/:id"
            element={isUserLoggedIn ? <Team /> : <Navigate to="/login" />}
          />
          <Route
            path="/match/:id"
            element={isUserLoggedIn ? <Match /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default Router
