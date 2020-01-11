import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as MuiLink, styled } from "@material-ui/core"
import { motion } from "framer-motion"

const Link = props => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.0 }}
      {...props}
    >
      <MuiLink
        component={GatsbyLink}
        {...props}
        style={{ textDecoration: "none", color: "inherit" }}
      />
    </motion.div>
  )
}

export default Link
