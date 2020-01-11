import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { Typography } from "@material-ui/core"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Typography variant="h5" align="center" style={{ padding: "30px 0" }}>
      oops, this page doesn't exist
    </Typography>

    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <img
        src="https://media.giphy.com/media/1rK7WULnc8YgdmVIBz/giphy.gif"
        alt="philadelphia flyers mascot falling down"
      />
    </div>
  </Layout>
)

export default NotFoundPage
