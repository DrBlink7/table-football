import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import { mainColor, secondaryColor } from '../Utils/config'
import { TestContainer } from '../Cypress/TestContainer'
import store from '../Store'
import TeamPage from './TeamPage'
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

describe('<TeamPage />', () => {
  beforeEach(() => {
    cy.viewport(1440, 900).wait(500)
    cy.mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <TestContainer>
              <TeamPage
                goBackToTeamPage={() => { }}
                goToTeamPage={function (id: number): void { }}
                goToLiveMatch={function (id: number): void { }}
                goToStats={function (): void { }}
                toggleOnGoingFoldable={function (): void { }}
                toggleEndedFoldable={function (): void { }}
                togglePreparingFoldable={function (): void { }}
                isOnGoingFoldableOpen={false} isEndedFoldableOpen={false} isPreparingFoldableOpen={false} />
            </TestContainer>
          </Router>
        </ThemeProvider>
      </Provider>
    )
  })
  it('renders', () => {
    cy.get("[data-testid='team-component']").should('exist').and('be.visible')
  })
})
