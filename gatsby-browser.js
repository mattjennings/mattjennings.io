/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import Layout from './src/components/Layout'
import Root from './src/components/Root'

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
export const wrapRootElement = ({ element, props }) => {
  return <Root {...props}>{element}</Root>
}
