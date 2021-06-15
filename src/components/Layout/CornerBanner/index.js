import React from 'react'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'

const sx = {
  bg: '#009845',
  boxShadow: '0px 3px 6px 2px #0000006b',
  color: 'white',
  position: 'fixed',
  bottom: '0',
  display: ['none', 'none', 'inline'],
  textAlign: 'center',
  textDecoration: 'none',
  padding: '10px',
  marginLeft: '50px',
  borderadius: '5px 5px 0px 0px',
}

const CornerBanner = () => {
  return (

    <Link
      sx={sx}
      to='https://innovation.library.nd.edu/marble/'
    >
      <div>This is a beta preview of the Marble website.</div>
    </Link>
  )
}

export default CornerBanner
