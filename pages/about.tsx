import Markdown from '../components/Markdown'
import Head from 'next/head'

const md = `
I'm a Full Stack Developer living in Calgary, AB. I also like hockey, and am an avid Canucks fan.

That's it. That's the page.
`

const About = () => {
  return (
    <>
      <Head>
        <title>Matt Jennings | About</title>
      </Head>
      <Markdown>{md}</Markdown>
    </>
  )
}

export default About
