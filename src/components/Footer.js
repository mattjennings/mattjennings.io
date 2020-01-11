import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import EmailIcon from '@material-ui/icons/Email'
import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& a': {
      color: 'inherit',
    },
  },
})
export default function Footer() {
  const classes = useStyles({})
  return (
    <footer className={classes.root}>
      <IconButton component="a" href="https://twitter.com/mattjennings44">
        <TwitterIcon />
      </IconButton>
      <IconButton component="a" href="https://github.com/mattjennings">
        <GitHubIcon />
      </IconButton>
      <IconButton component="a" href="mailto:mattjennings44@gmail.com">
        <EmailIcon />
      </IconButton>
    </footer>
  )
}
