import React from 'react'
import NextLink from 'next/link'
import { Link as MuiLink, styled } from '@material-ui/core'
import { motion } from 'framer-motion'

const Link = (props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.0 }}
      {...props}
    >
      <NextLink href={props.href}>
        <MuiLink
          {...props}
          style={{ textDecoration: 'none', color: 'inherit' }}
        />
      </NextLink>
    </motion.div>
  )
}

export default Link
