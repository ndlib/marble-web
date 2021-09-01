/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx, Flex, Box } from 'theme-ui'
import VisibilitySettings from './VisibilitySettings'
import LayoutSettings from './LayoutSettings'
import DangerDelete from './DangerDelete'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'

const PortfolioSettingsContent = ({ onChangeLayout, onChangePrivacy }) => {
  const { portfolio } = usePortfolioContext()

  return (
    <Flex sx={{ flexWrap: 'wrap' }}>
      <Box sx={{ width: ['100%', '66%'], px: '1rem', py: '1rem' }}>
        <label htmlFor='layoutDisplay'>
          <h2>Layout</h2>
          <LayoutSettings
            portfolio={portfolio}
            onChange={onChangeLayout}
          />
        </label>
        <label htmlFor='visibility'>
          <h2>Privacy</h2>
          <VisibilitySettings
            portfolio={portfolio}
            onChange={onChangePrivacy}
          />
        </label>
      </Box>
      <Box sx={{ width: ['100%', '33%'], py: '1rem' }}>
        <label htmlFor='delete'>
          <h2>Danger Zone</h2>
          <DangerDelete portfolio={portfolio} />
        </label>
      </Box>
    </Flex>
  )
}

PortfolioSettingsContent.propTypes = {
  onChangeLayout: PropTypes.func.isRequired,
  onChangePrivacy: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
)(PortfolioSettingsContent)
