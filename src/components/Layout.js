/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
  Container,
  CssBaseline,
} from '@material-ui/core'

import Header from './Header'
import './layout.css'
import { blueGrey, grey } from '@material-ui/core/colors'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const theme = useMemo(
    () =>
      responsiveFontSizes(
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
      ),
    []
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container style={{ paddingTop: 32 }}>
        <main>{children}</main>
      </Container>
    </ThemeProvider>
  )
}

export default Layout
