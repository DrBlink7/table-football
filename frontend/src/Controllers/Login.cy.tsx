import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import { mainColor, secondaryColor } from '../Utils/config'
import store from '../Store'
import Login from './Login'
import en from '../Translations/en'
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

describe('<Login />', () => {
  beforeEach(() => {
    cy.viewport(1440, 900).wait(500)
    cy.mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Login />
          </Router>
        </ThemeProvider>
      </Provider>
    )
    cy.intercept(
      'POST',
      '/api/login/authenticate',
      {
        statusCode: 204
      }
    )
  })
  it('renders', () => {
    cy.get("[data-testid='login-button']").should('exist').and('be.visible')
  })

  it('should have two text fields and a button', () => {
    cy.get('form').within(() => {
      cy.get("[data-testid='email-text']").should('exist').and('be.visible')
      cy.get("[data-testid='password-text']").should('exist').and('be.visible')
      cy.get("button[type='submit']")
        .should('exist')
        .and('be.visible')
        .contains(en.login.signin)
    })
  })

  it('simulate login form: empty fields', () => {
    cy.get("button[type='submit']").click().wait(200)
    cy.get('[id=":r4:-helper-text"]').should('exist').and('be.visible').contains(en.login.emailRequired)
    cy.get('[id=":r5:-helper-text"]').should('exist').and('be.visible').contains(en.login.passRequired)
  })

  it('simulate login form: empty password field', () => {
    cy.get("[data-testid='email-text']").type('test@email.it').wait(100)
    cy.get("button[type='submit']").click().wait(200)
    cy.get('[id=":r6:-helper-text"]').should('not.exist', { timeout: 0 })
    cy.get('[id=":r7:-helper-text"]').should('exist').and('be.visible').contains(en.login.passRequired)
  })

  it('simulate login form: wrong password field', () => {
    cy.get("button[type='submit']").click().wait(200)
    cy.get("[data-testid='email-text']").type('test@email.it').wait(100)
    cy.get("[data-testid='password-text']").type('Password123').wait(100)
    cy.get('[id=":r8:-helper-text"]').should('not.exist', { timeout: 0 })
    cy.get('[id=":r9:-helper-text"]')
      .should('exist')
      .and('be.visible')
      .contains(en.login.passError)
  })

  it('simulate login form empty email field', () => {
    cy.get("[data-testid='password-text']").type('Password123!').wait(100)
    cy.get("button[type='submit']").click().wait(200)
    cy.get('[id=":ra:-helper-text"]').should('exist').and('be.visible').contains(en.login.emailRequired)
    cy.get('[id=":rb:-helper-text"]').should('not.exist', { timeout: 0 })
  })

  it('simulate login form: wrong email field', () => {
    cy.get("button[type='submit']").click().wait(200)
    cy.get("[data-testid='email-text']").type('testemail.it').wait(100)
    cy.get("[data-testid='password-text']").type('Password123!').wait(100)
    cy.get('[id=":rc:-helper-text"]').should('exist').and('be.visible').contains(en.login.emailError)
  })

  it('simulate login form correct filled field', () => {
    cy.get("[data-testid='email-text']").type('test@email.it').wait(100)
    cy.get("[data-testid='password-text']").type('Password123!').wait(100)
    cy.get("button[type='submit']").click().wait(200)
    cy.get('[id=":r10:-helper-text"]').should('not.exist', { timeout: 0 })
    cy.get('[id=":r11:-helper-text"]').should('not.exist', { timeout: 0 })
  })
})
