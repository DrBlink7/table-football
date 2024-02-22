import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import { mainColor, secondaryColor } from '../Utils/config'
import store from '../Store'
import Home from './Home'
import { players } from '../Cypress/utils'
import '../Translations'

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

describe('<Home />', () => {
  beforeEach(() => {
    cy.viewport(1440, 900).wait(500)
    cy.mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Home />
          </Router>
        </ThemeProvider>
      </Provider>
    )
    cy.intercept(
      'GET',
      '/api/player',
      {
        statusCode: 200,
        body: players
      }
    )
  })
  it('renders', () => {
    cy.get("[data-testid='home-component']").should('exist').and('be.visible')
  })
})