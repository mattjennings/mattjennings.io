import React from 'react'

import { Typography } from '@material-ui/core'
import Head from 'next/head'

const NotFoundPage = () => (
  <div>
    <Head>
      <title>404</title>
    </Head>
    <Typography variant="h5" align="center" style={{ padding: '30px 0' }}>
      {`oops, this page doesn't exist`}
    </Typography>

    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <img
        src="https://media.giphy.com/media/1rK7WULnc8YgdmVIBz/giphy.gif"
        alt="philadelphia flyers mascot falling down"
      />
    </div>
  </div>
)

export default NotFoundPage
