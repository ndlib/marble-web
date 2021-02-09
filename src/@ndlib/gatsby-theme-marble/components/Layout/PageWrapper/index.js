import React from 'react'
import PropTypes from 'prop-types'
import SkipToMain from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/SkipToMain'
import BrandingHeader from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/BrandingHeader'
import NavigationHeader from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/NavigationHeader'
import Footer from './Footer'
import FeedbackModal from '../../Internal/FeedbackModal'

const PageWrapper = ({ children, location }) => {
  const noFeedbackModal = ['/help/contact-us']
  const feedback = noFeedbackModal.includes(location.pathname) ? (
    null) : <FeedbackModal />
  return (
    <>
      <SkipToMain />
      <BrandingHeader />
      <NavigationHeader location={location} />
      {children}
      <Footer />
      {feedback}
    </>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default PageWrapper
