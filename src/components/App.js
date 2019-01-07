import React, { Component } from 'react'
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core'
import { install, ThemeProvider } from '@material-ui/styles'
import Home from './Home'
import { Router } from '@reach/router'
import { grey } from '@material-ui/core/colors'
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
  productionPrefix: 'c'
})
install()

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark',
    text: {
      primary: grey[200],
      secondary: grey[300]
    },
    background: {
      default: grey[800]
    }
  }
})

class App extends Component {
  render() {
    return (
      <>
        <StylesProvider generateClassName={generateClassName}>
          {/* Supply both theme providers to support new experimental hook api*/}
          <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                <Home path="/" />
              </Router>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </>
    )
  }
}

export default App
