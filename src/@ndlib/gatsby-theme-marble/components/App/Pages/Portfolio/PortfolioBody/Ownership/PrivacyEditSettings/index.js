/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'
import VisibilitySettings from '../../PortfolioEditSettings/PortfolioSettingsContent/VisibilitySettings'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'

const PrivacyEditSettings = ({ callBack }) => {
  const { portfolio } = usePortfolioContext()
  const [privacy, changePrivacy] = useState(portfolio.privacy)
  const [patching, setPatching] = useState(false)

  return (
    <React.Fragment>
      <div sx={{textAlign: 'right', '& > button': {marginLeft: '.5rem'}}}>
        <SaveOrCancelButtons
          closeFunc={callBack}
          patching={patching}
          setPatching={setPatching}
          body={{
            privacy: privacy || 'private',
          }}
          valid
          changed={ privacy !== portfolio.privacy}
        />
      </div>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', '66%'], px: '1rem', py: '1rem' }}>
          <label htmlFor='visibility'>
            <h2>Privacy</h2>
            <VisibilitySettings
              portfolio={portfolio}
              onChange={changePrivacy}
            />
          </label>
        </Box>
      </Flex>

    </React.Fragment>
  )
}

PrivacyEditSettings.propTypes = {
  callBack: PropTypes.func.isRequired,
}

export default PrivacyEditSettings
