import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import PortfolioCard from './PortfolioCard'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '40px 0'
  },
  projectsTitle: {
    marginBottom: 20
  },
  card: {
    height: '100%'
  },
  container: {
    maxWidth: 800,
    margin: '0 auto'
  }
}))

export default function PortfolioSection({ title, data }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.projectsTitle} variant="h5" align="center">
        {title}
      </Typography>
      <Grid
        className={classes.container}
        container
        justify="center"
        direction="row"
        wrap="wrap"
        spacing={16}
      >
        {data.map(item => (
          <Grid key={item.title} item xs={8} lg={4}>
            <PortfolioCard
              className={classes.card}
              title={item.title}
              description={item.description}
              downloadLinks={item.downloadLinks}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
