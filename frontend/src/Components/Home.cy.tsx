import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import { mainColor, secondaryColor } from '../Utils/config'
import { players, teams } from '../Cypress/utils'
import store from '../Store'
import Home from './Home'
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
    cy.intercept(
      'GET',
      '/api/team',
      {
        statusCode: 200,
        body: teams
      }
    )
  })
  it('renders', () => {
    cy.get("[data-testid='home-component']").should('exist').and('be.visible')
  })
})
