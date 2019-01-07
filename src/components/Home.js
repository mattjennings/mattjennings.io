import { Typography, Grid, Card, CardContent } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import React from 'react'
import { styled, makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import PortfolioCard from './PortfolioCard'

const projects = [
  {
    title: 'Icebreaker',
    description: `Delivers notifications when an NHL trade or rumour has been reported on Twitter`,
    downloadLinks: [
      {
        text: 'iTunes Store',
        url:
          'https://itunes.apple.com/ca/app/icebreaker-nhl-trades-rumours/id1131047467?mt=8'
      }
    ]
  },
  {
    title: 'team-finder',
    description: `Javascript library to help detect NHL teams from given text`,
    downloadLinks: [
      {
        text: 'github',
        url: 'https://github.com/mattjennings/team-finder'
      }
    ]
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    background: 'none',
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 10px',
    [theme.breakpoints.down('md')]: {
      marginTop: 20
    }
  },
  title: {
    color: grey[200]
  },
  projectsTitle: {
    marginBottom: 20
  },
  content: {
    marginTop: 60
  },
  link: {},
  card: {
    height: '100%'
  }
}))

const Link = styled('a')(({ theme }) => ({
  ...theme.typography.body1,
  fontSize: '1.25rem',
  textDecoration: 'none',
  color: grey[200],
  margin: 8
}))

const Subtitle = styled(props => <Typography {...props} variant="overline" />)(
  ({ theme }) => ({
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightMedium
  })
)

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3" align="center">
        Matt Jennings
      </Typography>
      <Subtitle className={classes.title} align="center" gutterBottom>
        software developer
      </Subtitle>
      <Grid container item justify="center">
        <Grid item>
          <Link href="https://twitter.com/mattjennings44" target="_blank">
            <Icon className="fab fa-twitter-square" />
          </Link>
          <Link href="https://github.com/mattjennings" target="_blank">
            <Icon className="fab fa-github-square" />
          </Link>
          <Link href="mailto:mattjennings44@gmail.com">
            <Icon className="fas fa-envelope-square" />
          </Link>
        </Grid>
      </Grid>
      <div className={classes.content}>
        <Typography
          className={classes.projectsTitle}
          variant="h5"
          align="center"
        >
          Projects
        </Typography>
        <Grid
          container
          justify="center"
          direction="row"
          wrap="wrap"
          spacing={16}
        >
          {projects.map(project => (
            <Grid key={project.title} item xs={8} sm={4} md={3} lg={2}>
              <PortfolioCard
                className={classes.card}
                title={project.title}
                description={project.description}
                downloadLinks={project.downloadLinks}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}
