/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, Button } from 'theme-ui'
import PortfolioSettingsContent from './PortfolioSettingsContent'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'

export const PortfolioEditSettings = () => {
  const { portfolio } = usePortfolioContext()
  const [settingsOpen, setSettingsOpen] = useState(false)
  return (
    <React.Fragment>
      <Button
        variant='light'
        onClick={() => setSettingsOpen(true)}
        className='edit-settings'
      >Edit Settings</Button>
      <ActionModal
        isOpen={settingsOpen}
        contentLabel={`Settings for <i>${portfolio.title}</i>`}
        closeFunc={() => setSettingsOpen(false)}
        fullscreen
      >
        <PortfolioSettingsContent
          callBack={() => {
            setSettingsOpen(false)
          }}
        />
      </ActionModal>
    </React.Fragment>
  )
}

export default PortfolioEditSettings
