import Markdown from '../components/Markdown'
import Head from 'next/head'

const md = `
I'm a Full Stack Developer living in Brandon, MB. I also like hockey.

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
