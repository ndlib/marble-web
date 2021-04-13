/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import LoginButton from '../LoginButton'
import ndLogo from '@ndlib/gatsby-theme-marble/src/assets/logos/ND_mark_white.svg'
import marbleLogo from '@ndlib/gatsby-theme-marble/src/assets/logos/Marble.Logo.svg'
import sx from './sx'
import HeroBackground from '../HeroBackground'
import WordMark from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/NavigationHeader/WordMark'

export const DefaultHeader = ({ location }) => {
  return (
    <>
      <WordMark />
      <div sx={sx.wrapper}>
        <div sx={sx.backgroundWrapper}>
          <HeroBackground />
        </div>
        <div sx={sx.heroWrapper}>
          <Link to='/'>
            <img
              src={marbleLogo}
              sx={sx.marbleLogo}
              alt='MARBLE: Museums, Archives, Rare Books & Libraries Exploration'
            />
          </Link>
        </div>
        <div sx={sx.secondRow}>
          <div sx={sx.triangleTopright} />
          <div sx={sx.rightOfTriangle} />
        </div>
        <div sx={sx.topBar}>
          <div sx={sx.extraTriangle} />
          <Link
            to='/exhibits'
            sx={sx.exhibitsLink}
          >Digital Exhibits
          </Link>
          <Link
            to='/browse'
            sx={sx.browseLink}
          >Browse
          </Link>
          <div sx={sx.loginWrapper}>
            <LoginButton location={location} />
          </div>
        </div>
        <div className='logo'>
          <a href='https://nd.edu' className='desktop'>
            <img
              src={ndLogo}
              sx={sx.ndLogo}
              alt='University of Notre Dame'
            />
          </a>
        </div>
      </div>
    </>
  )
}

DefaultHeader.propTypes = {
  location: PropTypes.object.isRequired,
}
export default DefaultHeader
