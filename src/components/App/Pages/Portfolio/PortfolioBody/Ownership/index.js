/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'
import Attribution from '@ndlib/gatsby-theme-marble/src/components/Shared/Attribution'
import UserCartouche from '@ndlib/gatsby-theme-marble/src/components/Shared/UserCartouche'
import PortfolioEditSettings from '../PortfolioEditSettings'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import PrivacyEditSettings from './PrivacyEditSettings'
import ShareButton from '@ndlib/gatsby-theme-marble/src/components/Shared/ShareButton'
import PrintButton from '@ndlib/gatsby-theme-marble/src/components/Shared/PrintButton'

import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const Ownership = () => {
  const { portfolioUser, isPorfolioOwner } = useUserContext()
  const { portfolio } = usePortfolioContext()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const isOwner = isPorfolioOwner()
  const { privacy, portfolioCollectionId } = portfolio
  if (isOwner) {
    return (
      <div sx={sx.wrapper}>
        <div sx={sx.visibilityWrapper}>
        This is your <button sx={sx.button}
          onClick={() => setSettingsOpen(true)}
          ><VisibilityLabel visibility={privacy} /></button> portfolio.
          <ActionModal
            isOpen={settingsOpen}
            contentLabel={`Settings for <em>${portfolio.title}</em>`}
            closeFunc={() => setSettingsOpen(false)}
            fullscreen
          >
            <PrivacyEditSettings
              callBack={() => {
                setSettingsOpen(false)
              }}
            />
          </ActionModal>
        </div>
        <div sx={sx.shareWrapper}>
          <ShareButton path={`user/xyz/${portfolioCollectionId}`} />
          <PrintButton />
        </div>
        <div sx={sx.editWrapper}>
          <PortfolioEditSettings />
        </div>
      </div>
    )
  }
  return (
    <div sx={sx.wrapper}>
      <Attribution>
        Portfolio collected and annotated by <UserCartouche user={portfolioUser} />
      </Attribution>
      <div sx={sx.shareWrapper}>
        <ShareButton path={`user/xyz/${portfolioCollectionId}`} />
        <PrintButton />
      </div>
    </div>
  )
}

Ownership.propTypes = {
}

export default Ownership
