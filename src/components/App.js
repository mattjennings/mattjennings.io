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
        {/* Supply both theme providers to support new experimental hook api*/}
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Home path="/" />
            </Router>
          </MuiThemeProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default App
