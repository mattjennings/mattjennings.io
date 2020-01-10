import { Typography } from "@material-ui/core"
import React from "react"
import Layout from "../components/Layout"
import PortfolioCard from "../components/PortfolioCard"
import SEO from "../components/SEO"

const IndexPage = () => (
  <Layout>
    <SEO title="Matt Jennings" />

    <Typography variant="h5">I made these</Typography>

    <PortfolioCard />
  </Layout>
)

export default IndexPage
