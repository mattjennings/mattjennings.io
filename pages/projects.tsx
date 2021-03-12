import React from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from 'components/Header'
import Link from 'next/link'
import { GetStaticProps } from 'next'

const items = [
  {
    title: `Tradebreaker`,
    description: `Notifies you when NHL trades are reported on Twitter`,
    web: `https://tradebreaker.io`,
    iOS: `https://apps.apple.com/us/app/tradebreaker/id1471192218`,
    android: `https://play.google.com/store/apps/details?id=xyz.appmaker.szwfyz&hl=en_CA`,
  },
  {
    title: `svelte-phaser`,
    description: `Create Phaser games with Svelte`,
    source: `https://github.com/mattjennings/svelte-phaser`,
  },
  {
    title: `react-phaser-fiber`,
    description: `Create Phaser games with React`,
    source: `https://github.com/mattjennings/react-phaser-fiber`,
  },
  {
    title: `Hockey Stats`,
    description: `NHL stats website built with Gatsby`,
    web: `https://hockey-stats.netlify.com/`,
    source: `https://github.com/mattjennings/gatsby-hockey-stats`,
  },
  {
    title: `Friedman Decryptor`,
    description: `Decrypts Elliotte Friedman's acronyms that nobody understands`,
    web: `https://friedgism.mattjennings.io/`,
    source: `https://github.com/mattjennings/friedman-decryptor`,
  },
]

export default function Projects() {
  return (
    <>
      <Header.Content>Projects</Header.Content>
      <div className="pt-6">
        <Link href="/">
          <a>home</a>
        </Link>
      </div>
    </>
  )
}
