/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import {
  Container,
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { AnimatePresence, motion } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Footer from './Footer'
import Header from './Header'

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header siteTitle={data.site.siteMetadata.title} />

      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.main
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Container
            style={{
              // 60px = header, 60px = footer
              minHeight: 'calc(100vh - 60px - 60px)',
              paddingTop: 16,
              paddingBottom: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {children}
          </Container>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
