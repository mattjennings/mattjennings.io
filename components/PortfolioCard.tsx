import {
  Button,
  IconButton,
  makeStyles,
  Paper,
  Typography,
  PaperProps,
} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(),
  },
  content: {
    flexGrow: 1,
  },
  actions: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    // color: 'white',
    marginLeft: theme.spacing(),
  },
}))

export default function PortfolioCard({
  title,
  description,
  web,
  iOS,
  android,
  source,
  ...rest
}: {
  title: string
  description: string
  web?: string
  iOS?: string
  android?: string
  source?: string
} & PaperProps) {
  const classes = useStyles()

  return (
    <Paper className={classes.root} {...rest}>
      <div className={classes.content}>
        <div className={classes.title}>
          <Typography variant="h5">{title}</Typography>
          {source && (
            <IconButton
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={source}
            >
              <GitHubIcon />
            </IconButton>
          )}
        </div>
        <Typography variant="body1">{description}</Typography>
      </div>
      <div className={classes.actions}>
        {web && (
          <Button
            component="a"
            variant="outlined"
            size="small"
            href={web}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            Website
          </Button>
        )}
        {iOS && (
          <Button
            component="a"
            variant="outlined"
            size="small"
            href={iOS}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            iOS
          </Button>
        )}
        {android && (
          <Button
            component="a"
            size="small"
            variant="outlined"
            href={android}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            Android
          </Button>
        )}
      </div>
    </Paper>
  )
}
