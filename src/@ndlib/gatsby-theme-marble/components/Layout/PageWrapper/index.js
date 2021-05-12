import React from 'react'
import PropTypes from 'prop-types'
import SkipToMain from '@ndlib/gatsby-theme-marble/src/components/Shared/SkipToMain'
import NDBrandHeader from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Header'
import NavigationHeader from './NavigationHeader'
import Footer from './Footer'
import FeedbackModal from '../../Shared/FeedbackModal'
import BetaModal from '../../Shared/BetaModal'

const PageWrapper = ({ children, location }) => {
  const noFeedbackModal = ['/help/contact-us']
  const feedback = noFeedbackModal.includes(location.pathname) ? (
    null) : <FeedbackModal />
  let seenWarning = true
  if (typeof window !== 'undefined' && location.pathname === '/') {
    seenWarning = localStorage.getItem('seenWarning')
  } else {
    seenWarning = true
  }
  const betaPopup = seenWarning ? (
    null) : <BetaModal />
  return (
    <>
      <SkipToMain />
      <NDBrandHeader location={location} />
      {children}
      <Footer />
      {feedback}
      {betaPopup}
    </>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default PageWrapper
