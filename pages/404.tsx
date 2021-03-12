import React from 'react'
import Head from 'next/head'

const NotFoundPage = () => (
  <div>
    <Head>
      <title>404</title>
    </Head>
    <h5 className="text-center p-16">{`oops, this page doesn't exist`}</h5>

    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <img
        src="https://media.giphy.com/media/1rK7WULnc8YgdmVIBz/giphy.gif"
        alt="philadelphia flyers mascot falling down"
      />
    </div>
  </div>
)

export default NotFoundPage
