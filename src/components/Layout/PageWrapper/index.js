/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import SkipToMain from '@ndlib/gatsby-theme-marble/src/components/Shared/SkipToMain'
import NDBrandLayout from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Layout'
import MarbleLogoMono from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Logos/MarbleLogoMono'
import Footer from './Footer'
import FeedbackModal from '../../../components/Shared/FeedbackModal'
import BetaModal from '../../../components/Shared/BetaModal'
import NDBrandHeroBackgroundOnly from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Hero/BackgroundOnly'

const PageWrapper = ({ children, location, pageHeader }) => {
  let seenWarning = true
  if (typeof window !== 'undefined' && location.pathname === '/') {
    seenWarning = localStorage.getItem('seenWarning')
  } else {
    seenWarning = true
  }
  const betaPopup = seenWarning ? (
    null) : <BetaModal />

  if (!pageHeader) {
    pageHeader = (<NDBrandHeroBackgroundOnly location={location} />)
  }
  return (
    <>
      <SkipToMain location={location} />
      <NDBrandLayout
        location={location}
        titleOverride={<MarbleLogoMono />}
        siteFooter={<Footer location={location} />}
        pageHeader={pageHeader}
      >
        {children}
      </NDBrandLayout>
      <FeedbackModal location={location} />
      {betaPopup}
    </>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  pageHeader: PropTypes.object,
}

export default PageWrapper
