/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'
import VisibilitySettings from './VisibilitySettings'
import LayoutSettings from './LayoutSettings'
import DangerDelete from './DangerDelete'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'
import sx from './sx'

const PortfolioSettingsContent = ({ callBack }) => {
  const { portfolio } = usePortfolioContext()
  const [layout, changeLayout] = useState(portfolio.layout)
  const [privacy, changePrivacy] = useState(portfolio.privacy)
  const [patching, setPatching] = useState(false)

  return (
    <React.Fragment>
      <div sx={sx.buttonWrapper}>
        <SaveOrCancelButtons
          closeFunc={callBack}
          patching={patching}
          setPatching={setPatching}
          body={{
            privacy: privacy || 'private',
            layout: layout || 'default',
          }}
          valid
          changed={layout !== portfolio.layout || privacy !== portfolio.privacy}
        />
      </div>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', '66%'], px: '1rem', py: '1rem' }}>
          <label htmlFor='layoutDisplay'>
            <h2>Layout</h2>
            <LayoutSettings
              portfolio={portfolio}
              onChange={changeLayout}
            />
          </label>
          <label htmlFor='visibility'>
            <h2>Privacy</h2>
            <VisibilitySettings
              portfolio={portfolio}
              onChange={changePrivacy}
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

    </React.Fragment>
  )
}

PortfolioSettingsContent.propTypes = {
  callBack: PropTypes.func.isRequired,
}

export default PortfolioSettingsContent
