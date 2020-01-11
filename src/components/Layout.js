/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Container } from '@material-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Footer from './Footer'
import Header from './Header'
import './layout.css'

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

  return (
    <>
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
              paddingTop: 32,
              paddingBottom: 32,
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
    </>
  )
}

export default Layout
