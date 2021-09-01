/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import { connect } from 'react-redux'
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
import { savePortfolioCollectionQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'

import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const Ownership = ({ loginReducer }) => {
  const { portfolioUser, isPorfolioOwner } = useUserContext()
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const isOwner = isPorfolioOwner()
  const { portfolioCollectionId } = portfolio
  const [patching, setPatching] = useState(false)
  const [privacy, changePrivacy] = useState(portfolio.privacy)

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
            footer={(
              <div sx={{ textAlign: 'right', '& > button': { marginLeft: '.5rem' } }}>
                <SaveOrCancelButtons
                  closeFunc={() => setSettingsOpen(false)}
                  onClick={() => {
                    setPatching(true)
                    portfolio.privacy = privacy
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
                  changed={privacy !== portfolio.privacy}
                />
              </div>
            )}
          >
            <PrivacyEditSettings onPrivacyChange={changePrivacy} />
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
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(Ownership)
