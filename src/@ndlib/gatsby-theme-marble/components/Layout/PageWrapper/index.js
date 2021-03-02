import React from 'react'
import PropTypes from 'prop-types'
import SkipToMain from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/SkipToMain'
import NavigationHeader from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/NavigationHeader'
import Footer from './Footer'
import FeedbackModal from '../../Internal/FeedbackModal'
import BetaModal from '../../Internal/BetaModal'

const PageWrapper = ({ children, location }) => {
  const noFeedbackModal = ['/help/contact-us']
  const feedback = noFeedbackModal.includes(location.pathname) ? (
    null) : <FeedbackModal />
  let seenWarning
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
      <NavigationHeader location={location} />
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
