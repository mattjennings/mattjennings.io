import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, styled } from '@material-ui/styles'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import classnames from 'classnames'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: grey[700]
  },
  content: {},
  title: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 10
  },
  avatar: {
    borderRadius: 10,
    width: 50,
    height: 50,
    marginRight: 10
  },
  actions: {
    display: 'flex',
    justifyContent: 'stretch'
  }
}))

const Link = styled(({ children, ...linkProps }) => (
  <a {...linkProps}>
    <Button variant="outlined" fullWidth={true}>
      {children}
    </Button>
  </a>
))({
  textDecoration: 'none',
  width: '100%'
})

const PortfolioCard = props => {
  const classes = useStyles()

  return (
    <Card className={classnames(classes.root, props.className)} elevation={5}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5" className={classes.title}>
          {props.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        {props.downloadLinks.map(link => (
          <Link
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </Link>
        ))}
      </CardActions>
    </Card>
  )
}

PortfolioCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  imageBackground: PropTypes.string,
  downloadLinks: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  )
}

export default PortfolioCard
