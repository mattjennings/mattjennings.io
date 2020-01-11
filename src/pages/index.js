import { Grid } from '@material-ui/core'
import React from 'react'
import PortfolioCard from '../components/PortfolioCard'
import SEO from '../components/SEO'
import { motion } from 'framer-motion'
import { staggerVariants } from '../animations/stagger'

const items = [
  {
    title: 'Tradebreaker',
    description: `Notifies you when NHL trades are reported on Twitter`,
    web: 'https://tradebreaker.io',
    iOS: 'https://apps.apple.com/us/app/tradebreaker/id1471192218',
    android:
      'https://play.google.com/store/apps/details?id=xyz.appmaker.szwfyz&hl=en_CA',
  },
  {
    title: 'Friedman Decryptor',
    description: `Decrypts Elliotte Friedman's acronyms that nobody understands`,
    web: 'https://friedgism.mattjennings.io/',
    source: 'https://github.com/mattjennings/friedman-decryptor',
  },
  {
    title: 'Hockey Stats',
    description: `A hockey stats website using 100% scraped data from NHL.com. Made with Gatsby`,
    web: 'https://hockey-stats.netlify.com/',
    source: 'https://github.com/mattjennings/gatsby-hockey-stats',
  },
  {
    title: 'react-phaser-fiber',
    description: `Create Phaser games with React`,
    source: 'https://github.com/mattjennings/react-phaser-fiber',
  },
  {
    title: 'EHM IP Manager',
    description: `Manages and changes your online league IPs for Eastside Hockey Manager`,
    source: 'https://github.com/mattjennings/ehm-ip-manager',
  },
]

const MotionGrid = motion.custom(Grid)
const IndexPage = () => {
  return (
    <>
      <SEO title="Portfolio" />

      <MotionGrid
        container
        justify="center"
        alignItems="stretch"
        spacing={4}
        variants={staggerVariants}
        initial="exit"
        animate="enter"
      >
        {items.map(item => (
          <MotionGrid
            variants={{
              exit: { opacity: 0, y: 50 },
              enter: { opacity: 1, y: 0 },
            }}
            key={item.title}
            item
            xs={10}
            sm={6}
            md={4}
          >
            <PortfolioCard
              style={{ height: '100%', width: '100%' }}
              key={item.title}
              {...item}
            />
          </MotionGrid>
        ))}
      </MotionGrid>
    </>
  )
}

export default IndexPage
