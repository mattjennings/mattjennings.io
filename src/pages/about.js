import React from 'react'
import SEO from '../components/SEO'
import Markdown from '../components/Markdown'

const md = `
I'm a Full Stack Developer living in Calgary, AB. I also like hockey, and am an avid Canucks fan.

That's it. That's the page.
`

const About = () => {
  return (
    <>
      <SEO title="About" />
      <Markdown>{md}</Markdown>
    </>
  )
}

export default About
