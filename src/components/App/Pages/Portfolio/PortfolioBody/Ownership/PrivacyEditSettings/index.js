/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'
import VisibilitySettings from '../../PortfolioEditSettings/PortfolioSettingsContent/VisibilitySettings'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'

const PrivacyEditSettings = ({ onPrivacyChange }) => {
  const { portfolio } = usePortfolioContext()

  return (
    <Flex sx={{ flexWrap: 'wrap' }}>
      <Box sx={{ width: ['100%', '66%'], px: '1rem', py: '1rem' }}>
        <label htmlFor='visibility'>
          <h2>Privacy</h2>
          <VisibilitySettings
            portfolio={portfolio}
            onChange={onPrivacyChange}
          />
        </label>
      </Box>
    </Flex>
  )
}

PrivacyEditSettings.propTypes = {
  onPrivacyChange: PropTypes.func.isRequired,
}

export default PrivacyEditSettings
