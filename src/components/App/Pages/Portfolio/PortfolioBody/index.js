/** @jsx jsx */
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
  const { portfolio } = usePortfolioContext()
  const { portfolioUser, isPorfolioOwner } = useUserContext()
  const isOwner = isPorfolioOwner()
  if ('status' in portfolio && portfolio.status === 'private') {
    return <PortfolioUnavailable />
  }
  if (!('title' in portfolio)) {
    return (<Loading />)
  }
  return (
    <>
      <Seo
        title={portfolio.title}
        location={location}
        data={{}}
        noIndex // = {portfolio.privacy !== 'public'}
      />
      <NDBrandBreadcrumbs
        currentPageTitle={portfolio.title}
        breadcrumbs={[
          {
            url: `/user/${portfolioUser.portfolioUserId}`,
            title: portfolioUser.fullName,

          },
        ]}
      />
      <PortfolioTitle />
      <Ownership
        isOwner={isOwner}
        location={location}
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
