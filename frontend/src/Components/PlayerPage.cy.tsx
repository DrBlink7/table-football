import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import { mainColor, secondaryColor } from '../Utils/config'
import { TestContainer } from '../Cypress/TestContainer'
import store from '../Store'
import PlayerPage from './PlayerPage'
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

describe('<PlayerPage />', () => {
  const blue = theme.palette.primary
  const red = theme.palette.secondary

  beforeEach(() => {
    cy.viewport(1440, 900).wait(500)
    cy.mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <TestContainer>
              <PlayerPage
                blue={blue}
                red={red}
                id={'1'}
                changeTeam={() => { }}
                goBackToPlayerPage={() => { }}
                teamColor={'blue'}
              />
            </TestContainer>
          </Router>
        </ThemeProvider>
      </Provider>
    )
  })
  it('renders', () => {
    cy.get("[data-testid='player-component']").should('exist').and('be.visible')
  })
})
