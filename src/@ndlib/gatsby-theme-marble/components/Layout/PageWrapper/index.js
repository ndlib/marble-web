import React from 'react'
import PropTypes from 'prop-types'
import SkipToMain from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/SkipToMain'
import BrandingHeader from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/BrandingHeader'
import NavigationHeader from '@ndlib/gatsby-theme-marble/src/components/Layout/PageWrapper/NavigationHeader'
import Footer from './Footer'
import FeedbackModal from '../../Internal/FeedbackForm'

const PageWrapper = ({ children, location }) => {
  return (
    <>
      <SkipToMain />
      <BrandingHeader />
      <FeedbackModal />
      <NavigationHeader location={location} />
      {children}
      <Footer />
    </>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default PageWrapper
