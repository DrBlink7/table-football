import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import { mainColor, secondaryColor } from '../Utils/config'
import { TestContainer } from '../Cypress/TestContainer'
import { match } from '../Cypress/utils'
import store from '../Store'
import MatchPage from './MatchPage'
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

describe('<MatchPage />', () => {
  beforeEach(() => {
    cy.viewport(1440, 900).wait(500)
    cy.mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <TestContainer>
              <MatchPage
                match={match as Match}
                goBackToMatchPage={() => { }}
                goToTeamPage={() => (id: number) => { }}
              />
            </TestContainer>
          </Router>
        </ThemeProvider>
      </Provider>
    )
  })
  it('renders', () => {
    cy.get("[data-testid='match-component']").should('exist').and('be.visible')
  })
})
