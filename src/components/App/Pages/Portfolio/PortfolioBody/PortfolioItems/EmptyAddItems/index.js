/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Button } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'

const EmptyAddItems = () => {
  const sx = {
    border: '1px solid',
    borderColor: 'gray.4',
    color: 'gray.7',
    margin: '2rem auto',
    padding: '2rem ',
    textAlign: 'left',
    maxWidth: '800px',
    width: '100%',
  }
  const buttonSx = {
    textAlign: 'center',
    '& button': {
      margin: '1rem',
    },
  }
  return (
    <div sx={sx}>
      <div>Welcome to your new portfolio. To add items, <Link to='/search?images[0]=true'>search for content</Link> or <Link to='/browse'>browse via categories</Link>. For more help, learn <Link to='/portfolios-about'>About Portfolios</Link>.</div>
      <div sx={buttonSx}>
        <Link to='/search?images[0]=true'>
          <Button variant='primary'>Search</Button>
        </Link>
        <Link to='/browse'>
          <Button variant='primary'>Browse</Button>
        </Link>
      </div>
    </div>
  )
}

export default EmptyAddItems
