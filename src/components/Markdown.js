import React from 'react'
import MarkdownToJsx from 'markdown-to-jsx'
import { Typography, makeStyles } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        variant: 'h1',
      },
    },
    h2: {
      component: Typography,
      props: {
        variant: 'h2',
      },
    },
    h3: {
      component: Typography,
      props: {
        variant: 'h3',
      },
    },
    h4: {
      component: Typography,
      props: {
        variant: 'h4',
      },
    },
    h5: {
      component: Typography,
      props: {
        variant: 'h5',
      },
    },
    h6: {
      component: Typography,
      props: {
        variant: 'h6',
      },
    },
    a: {
      props: {
        target: '_blank',
        referrer: 'noopener noreferrer',
        style: {
          color: blue[500],
          textDecoration: 'none',
        },
      },
    },
  },
}

const useStyles = makeStyles(theme => {
  console.log(theme)
  return {
    root: {
      ...theme.typography.body1,
    },
  }
})
export default function Markdown(props) {
  const classes = useStyles()
  return (
    <MarkdownToJsx className={classes.root} options={options}>
      {props.children}
    </MarkdownToJsx>
  )
}
