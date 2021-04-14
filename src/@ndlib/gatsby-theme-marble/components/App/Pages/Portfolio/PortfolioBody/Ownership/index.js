/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'
import Attribution from '@ndlib/gatsby-theme-marble/src/components/Shared/Attribution'
import UserCartouche from '@ndlib/gatsby-theme-marble/src/components/Shared/UserCartouche'
import PortfolioEditSettings from '../PortfolioEditSettings'
import ShareButton from '@ndlib/gatsby-theme-marble/src/components/Shared/ShareButton'
import PrintButton from '@ndlib/gatsby-theme-marble/src/components/Shared/PrintButton'

import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'

export const Ownership = ({ isOwner }) => {
  const { portfolio } = usePortfolioContext()
  const { privacy, userId, uuid } = portfolio
  if (isOwner) {
    return (
      <div sx={sx.wrapper}>
        <div sx={sx.visibilityWrapper}>
          This is your <VisibilityLabel visibility={privacy} /> portfolio.
        </div>
        <div sx={sx.shareWrapper}>
          <ShareButton path={`myportfolio/${uuid}`} />
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
        Portfolio collected and annotated by <UserCartouche user={{ uuid: userId }} />
      </Attribution>
      <div sx={sx.shareWrapper}>
        <ShareButton path={`myportfolio/${uuid}`} />
        <PrintButton />
      </div>
    </div>
  )
}

Ownership.propTypes = {
  isOwner: PropTypes.bool,
}

export default Ownership