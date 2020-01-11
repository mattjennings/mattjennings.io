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
import { grey } from '@material-ui/core/colors'
import { AnimatePresence, motion } from 'framer-motion'
import Footer from './Footer'

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

const Layout = ({ children, location }) => {
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
      <Container
        style={{
          // 60px = header, 40px = footer
          minHeight: 'calc(100vh - 60px - 40px)',
          paddingTop: 32,
          paddingBottom: 32,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <AnimatePresence initial={false} exitBeforeEnter>
          <motion.main
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </Container>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
