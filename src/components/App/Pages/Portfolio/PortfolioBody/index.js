/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import PortfolioTitle from './PortfolioTitle'
import PortfolioDescription from './PortfolioDescription'
import PortfolioItems from './PortfolioItems'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Ownership from './Ownership'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'
import PortfolioUnavailable from './PortfolioUnavailable'

const PortfolioBody = ({ location }) => {
  const { portfolio, portfolioLoading } = usePortfolioContext()
  const { portfolioUser, isPortfolioOwner } = useUserContext()
  const isOwner = isPortfolioOwner()

  if (portfolioLoading) {
    return (<Loading />)
  }
  if (portfolio.portfolioNotFound) {
    return (<PortfolioUnavailable />)
  }

  const breadcrumbs = []
  if (portfolio.featuredCollection) {
    breadcrumbs.push({
      url: '/featured',
      title: 'Featured Portfolios',
    })
  } else {
    breadcrumbs.push({
      url: `/user/${portfolioUser.portfolioUserId}`,
      title: `${portfolioUser.fullName}'s Portfolios`,
    })
  }

  return (
    <>
      <Seo
        title={portfolio.title}
        location={location}
        data={{}}
        noIndex={portfolio.privacy !== 'public'}
      />
      <NDBrandBreadcrumbs
        currentPageTitle={portfolio.title}
        breadcrumbs={breadcrumbs}
      />
      <PortfolioTitle />
      <Ownership
        isOwner={isOwner}
        location={location}
        portfolio={portfolio}
      />
      <PortfolioDescription
        isOwner={isOwner}
      />
      <PortfolioItems
        isOwner={isOwner}
      />
    </>
  )
}

PortfolioBody.propTypes = {
  location: PropTypes.object.isRequired,
}

export default PortfolioBody
