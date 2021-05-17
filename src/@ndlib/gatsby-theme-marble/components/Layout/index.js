/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { withI18nTranslation } from '@ndlib/gatsby-theme-marble/src/i18n/withI18nTranslation'
import AuthWrapper from './AuthWrapper'
import PrivateRoute from './PrivateRoute'
import PageWrapper from './PageWrapper'

/// CONSTRUCTION BANNER
import CornerBanner from './CornerBanner'

export const Layout = ({
  children,
  requireLogin, // bool to test login
  location,
  pageHeader,
}) => {
  const [qs] = useState(queryString.parse(location.search) || {})
  useEffect(() => {
    const scrollTo = document.querySelector(`#${qs.scrollto}`)
    if (scrollTo) {
      scrollTo.scrollIntoView()
    } else {
      document.querySelector('#gatsby-focus-wrapper').scrollTop = 0
    }
  })

  return (
    <>
      <AuthWrapper
        location={location}
      >
        <PrivateRoute
          location={location}
          requireLogin={requireLogin}
        >
          <PageWrapper location={location} pageHeader={pageHeader}>
            <article>
              {children}
            </article>
          </PageWrapper>
        </PrivateRoute>
      </AuthWrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  requireLogin: PropTypes.bool,
  pageHeader: PropTypes.object.isRequired,
}

Layout.defaultProps = {
  requireLogin: false,
}

export default withI18nTranslation(Layout)
