/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import SkipToMain from '@ndlib/gatsby-theme-marble/src/components/Shared/SkipToMain'
import NDBrandHeader from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Header'
import NDBrandLayout from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Layout'
import ClickableMarbleLogoMono from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Logos/ClickableMarbleLogoMono'
import Footer from './Footer'
import FeedbackModal from '../../../components/Shared/FeedbackModal'
import BetaModal from '../../../components/Shared/BetaModal'
import LoginButton from './LoginButton'
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

  const brandHeader = (
    <NDBrandHeader
      location={location}
      titleOverride={<ClickableMarbleLogoMono url='/' />}
      additionalNavButtons={<LoginButton location={location} />}
    />
  )
  return (
    <>
      <SkipToMain />
      <NDBrandLayout
        location={location}
        siteHeader={brandHeader}
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
  pageHeader: PropTypes.object.isRequired,
}

export default PageWrapper
