import './_app.css'
import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import {
  ThemeProvider,
  responsiveFontSizes,
  createMuiTheme,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { grey } from '@material-ui/core/colors'
import Header from '../components/Header'
import { Container } from '@material-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'
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

export default function MyApp(props) {
  const { Component, pageProps } = props

  const router = useRouter()
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Matt Jennings</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <AnimatePresence initial={false} exitBeforeEnter>
          <motion.main
            key={router.pathname}
            variants={{
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
            }}
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
              <Component {...pageProps} />
            </Container>
            <Footer />
          </motion.main>
        </AnimatePresence>
      </ThemeProvider>
    </React.Fragment>
  )
}
