import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import EmailIcon from '@material-ui/icons/Email'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& a': {
      color: 'inherit',
      marginRight: 16,
    },
  },
})
export default function Footer() {
  const classes = useStyles({})
  return (
    <footer className={classes.root}>
      <a href="https://twitter.com/mattjennings44">
        <TwitterIcon />
      </a>
      <a href="https://github.com/mattjennings">
        <GitHubIcon />
      </a>
      <a href="mailto:mattjennings44@gmail.com">
        <EmailIcon />
      </a>
    </footer>
  )
}
