import PropTypes from 'prop-types'
import React from 'react'
import { Container, Typography, AppBar, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Link from './Link'

const useStyles = makeStyles(theme => ({
  root: {
    height: 60,
    color: 'inherit',
  },
  title: {},
  content: {
    padding: '16px 0px',
  },
}))

const Header = ({ siteTitle }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.content}
        >
          <Grid item>
            <Typography variant="h4" className={classes.title}>
              <Link to="/">
                <strong>{siteTitle}</strong>
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={4}>
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
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
