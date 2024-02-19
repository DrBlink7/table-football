import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { environment } from './Utils/config'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import AppRouter from './Controllers/Router'
import LoggerProvider from './Hooks/Logger'
import store from './Store'
import './Translations'
import './index.css'

const rootElement = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootElement!)

root.render(
  environment === 'DEV'
    ? (
      <LoggerProvider>
        <Provider store={store}>
          <Router>
            <AppRouter />
          </Router>
        </Provider>
      </LoggerProvider>
    )
    : (
      <StrictMode>
        <Provider store={store}>
          <LoggerProvider>
            <Router>
              <AppRouter />
            </Router>
          </LoggerProvider>
        </Provider>
      </StrictMode>
    )
)
