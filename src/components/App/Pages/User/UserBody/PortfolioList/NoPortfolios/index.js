/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'

const NoPortfolios = ({ isPortfolioOwner = false, button }) => {
  const sx = {
    border: '1px solid',
    borderColor: 'gray.4',
    color: 'gray.9',
    margin: '1rem',
    padding: '.5rem',
    textAlign: 'center',
    width: 'calc(100% - 2rem)',
  }
  if (isPortfolioOwner) {
    return (
      <div sx={sx}>
        <p>You have not created any portfolios yet.</p>
        {button}

      </div>
    )
  }
  return (
    <div sx={sx}>
      <p>This user does not have any public portfolios.</p>
    </div>
  )
}

NoPortfolios.propTypes = {
  isOwner: PropTypes.bool,
  button: PropTypes.object,
}

NoPortfolios.defaultProps = {
  button: null,
}

export default NoPortfolios
