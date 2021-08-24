/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import NDBrandLayout from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Layout'
import MarbleLogoMono from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Logos/MarbleLogoMono'
import Footer from './Footer'
import FeedbackModal from '../../../components/Shared/FeedbackModal'
import NDBrandHeroBackgroundOnly from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Hero/BackgroundOnly'

const PageWrapper = ({ children, location, pageHeader }) => {
  if (!pageHeader) {
    pageHeader = (<NDBrandHeroBackgroundOnly location={location} />)
  }
  return (
    <>
      <NDBrandLayout
        location={location}
        titleOverride={<MarbleLogoMono />}
        siteFooter={<Footer location={location} />}
        pageHeader={pageHeader}
      >
        {children}
      </NDBrandLayout>
      <FeedbackModal location={location} />
    </>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  pageHeader: PropTypes.object,
}

export default PageWrapper
