/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import {
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React, { useMemo } from 'react'
import './layout.css'

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: grey,
      secondary: grey,
    },
    typography: {
      fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },

    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
    overrides: {
      MuiCard: {
        root: {
          borderRadius: 10,
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius: 10,
        },
      },
    },
  })
)

const Root = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Root
