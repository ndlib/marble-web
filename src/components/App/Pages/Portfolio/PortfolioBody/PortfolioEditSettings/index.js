/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, Button } from 'theme-ui'
import PortfolioSettingsContent from './PortfolioSettingsContent'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import SaveOrCancelButtons from '../SaveOrCancelButtons'
import sx from './sx'

export const PortfolioEditSettings = () => {
  const { portfolio } = usePortfolioContext()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [layout, changeLayout] = useState(portfolio.layout)
  const [privacy, changePrivacy] = useState(portfolio.privacy)
  const [patching, setPatching] = useState(false)

  return (
    <React.Fragment>
      <Button
        variant='primary'
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
              body={{
                privacy: privacy || 'private',
                layout: layout || 'default',
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

export default PortfolioEditSettings
