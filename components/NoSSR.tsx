import { useState } from 'react'
import useIsoLayoutEffect from '../hooks/useIsoLayoutEffect'
import React from 'react'

/**
 * Does not render children when SSR
 */
const NoSSR: React.FC<{}> = ({ children }) => {
  const [mount, setMount] = useState(false)

  useIsoLayoutEffect(() => {
    setMount(true)
  }, [])

  return <React.Fragment>{mount ? children : null}</React.Fragment>
}

export default NoSSR
