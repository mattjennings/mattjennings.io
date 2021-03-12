import React from 'react'
import MarkdownToJsx from 'markdown-to-jsx'

const options = {
  overrides: {
    // h1: {
    //   component: Typography,
    //   props: {
    //     variant: 'h1',
    //   },
    // },
    // h2: {
    //   component: Typography,
    //   props: {
    //     variant: 'h2',
    //   },
    // },
    // h3: {
    //   component: Typography,
    //   props: {
    //     variant: 'h3',
    //   },
    // },
    // h4: {
    //   component: Typography,
    //   props: {
    //     variant: 'h4',
    //   },
    // },
    // h5: {
    //   component: Typography,
    //   props: {
    //     variant: 'h5',
    //   },
    // },
    // h6: {
    //   component: Typography,
    //   props: {
    //     variant: 'h6',
    //   },
    // },
    a: {
      component: 'a',
      props: {
        target: '_blank',
        referrer: 'noopener noreferrer',
        className: 'text-blue-500 no-underline',
      },
    },
  },
}

export default function Markdown(props) {
  return (
    <MarkdownToJsx className={'text-md'} options={options}>
      {props.children}
    </MarkdownToJsx>
  )
}
