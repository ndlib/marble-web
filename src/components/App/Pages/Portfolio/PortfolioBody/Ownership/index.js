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
import SaveOrCancelButtons from '../SaveOrCancelButtons'

import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const Ownership = ({ portfolio, location }) => {
  const { portfolioUser, isPorfolioOwner } = useUserContext()
  const { updatePortfolio } = usePortfolioContext()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const isOwner = isPorfolioOwner()
  const { portfolioCollectionId } = portfolio
  const [patching, setPatching] = useState(false)
  const [privacy, changePrivacy] = useState(portfolio.privacy)
  console.log('l', location)
  if (isOwner) {
    return (
      <div sx={sx.wrapper}>
        <div sx={sx.visibilityWrapper}>
        This is your <button sx={sx.button}
            onClick={() => setSettingsOpen(true)}
          ><VisibilityLabel visibility={portfolio.privacy} /></button> portfolio.
          <ActionModal
            isOpen={settingsOpen}
            contentLabel={`Settings for <em>${portfolio.title}</em>`}
            closeFunc={() => setSettingsOpen(false)}
            fullscreen
            footer={(
              <div sx={{ textAlign: 'right', '& > button': { marginLeft: '.5rem' } }}>
                <SaveOrCancelButtons
                  closeFunc={() => setSettingsOpen(false)}
                  onClick={() => {
                    setPatching(true)
                    portfolio.privacy = privacy
                    updatePortfolio(portfolio)
                      .then(() => {
                        setPatching(false)
                        setSettingsOpen(false)
                      })
                      .catch((e) => {
                        setPatching(false)
                        console.error(e)
                      })
                  }}

                  valid
                  patching={patching}
                  changed={privacy !== portfolio.privacy}
                />
              </div>
            )}
          >
            <PrivacyEditSettings onPrivacyChange={changePrivacy} />
          </ActionModal>
        </div>
        <div sx={sx.shareWrapper}>
          <ShareButton path={location.pathname.substring(1)} />
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
        <ShareButton path={location.pathname.substring(1)} />
        <PrintButton />
      </div>
    </div>
  )
}

Ownership.propTypes = {
  portfolio: PropTypes.object.isRequired,
}

export default Ownership
