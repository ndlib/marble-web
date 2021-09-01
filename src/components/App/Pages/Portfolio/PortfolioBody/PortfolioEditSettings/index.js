/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, Button } from 'theme-ui'
import { connect } from 'react-redux'
import PortfolioSettingsContent from './PortfolioSettingsContent'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import SaveOrCancelButtons from '../SaveOrCancelButtons'
import { savePortfolioCollectionQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import sx from './sx'

export const PortfolioEditSettings = ({ loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  console.log('mp', portfolio)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [layout, changeLayout] = useState(portfolio.layout)
  const [privacy, changePrivacy] = useState(portfolio.privacy)
  const [patching, setPatching] = useState(false)

  return (
    <React.Fragment>
      <Button
        variant='light'
        onClick={() => setSettingsOpen(true)}
        className='edit-settings'
      >Edit Settings</Button>
      <ActionModal
        aria-modal='true'
        isOpen={settingsOpen}
        contentLabel={`Settings for <i>${portfolio.title}</i>`}
        closeFunc={() => setSettingsOpen(false)}
        fullscreen
        footer={(
          <div sx={sx.buttonWrapper}>
            <SaveOrCancelButtons
              closeFunc={() => setSettingsOpen(false)}
              patching={patching}
              setPatching={setPatching}
              onClick={() => {
                setPatching(true)
                portfolio.privacy = privacy || 'private'
                portfolio.layout = layout || 'default'
                savePortfolioCollectionQuery({ portfolio: portfolio, loginReducer: loginReducer })
                  .then((result) => {
                    updatePortfolio(result)
                    setPatching(false)
                    setSettingsOpen(false)
                  })
                  .catch((e) => {
                    console.error(e)
                  })
              }}
              valid
              changed={layout !== portfolio.layout || privacy !== portfolio.privacy}
            />
          </div>
        )}
      >
        <PortfolioSettingsContent
          onChangeLayout={changeLayout}
          onChangePrivacy={changePrivacy}
        />
      </ActionModal>
    </React.Fragment>
  )
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(PortfolioEditSettings)
