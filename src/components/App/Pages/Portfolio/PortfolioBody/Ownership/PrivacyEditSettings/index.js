/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx, Flex, Box } from 'theme-ui'
import VisibilitySettings from '../../PortfolioEditSettings/PortfolioSettingsContent/VisibilitySettings'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import { savePortfolioCollectionQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'

const PrivacyEditSettings = ({ callBack, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const [privacy, changePrivacy] = useState(portfolio.privacy)
  const [patching, setPatching] = useState(false)

  return (
    <>
      <div sx={{ textAlign: 'right', '& > button': { marginLeft: '.5rem' } }}>
        <SaveOrCancelButtons
          closeFunc={callBack}
          onClick={() => {
            setPatching(true)
            portfolio.privacy = privacy
            savePortfolioCollectionQuery({ portfolio: portfolio, loginReducer: loginReducer })
              .then((result) => {
                updatePortfolio(result)
                setPatching(false)
                callBack()
              })
              .catch((e) => {
                console.error(e)
              })
          }}

          valid
          changed={privacy !== portfolio.privacy}
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

    </>
  )
}

PrivacyEditSettings.propTypes = {
  callBack: PropTypes.func.isRequired,
  loginReducer: PropTypes.func.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(PrivacyEditSettings)
