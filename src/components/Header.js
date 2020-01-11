import PropTypes from 'prop-types'
import React from 'react'
import { Container, Typography, AppBar, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Link from './Link'

const useStyles = makeStyles(
  {
    root: {
      height: 60,
      color: 'inherit',
    },
    title: {},
    content: {
      padding: '16px 0px',
    },
  },
  {
    name: 'Header',
  }
)

const Header = ({ siteTitle }) => {
  const classes = useStyles()

  return (
    <header className={classes.root}>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.content}
        >
          <Grid item>
            <Typography variant="h4" component="h1" className={classes.title}>
              <Link to="/">
                <strong>{siteTitle}</strong>
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item>
                <Typography variant="h6">
                  <Link to="/about">About</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  <Link to="/uses">Uses</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
