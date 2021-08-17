/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import PortfolioTitle from './PortfolioTitle'
import PortfolioDescription from './PortfolioDescription'
import PortfolioItems from './PortfolioItems'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Ownership from './Ownership'
import PortfolioContext, { initialContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

const PortfolioBody = ({ portfolio, location, loginReducer, isOwner }) => {
  const updatePortfolio = (portfolio) => {
    setContext({ ...context, portfolio: portfolio })
  }

  const [context, setContext] = useState({
    ...initialContext,
    portfolio: portfolio,
    updatePortfolio: updatePortfolio,
  })
  return (
    <PortfolioContext.Provider value={context}>
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
            url: `/item/${loginReducer.user.portfolioUserId}`,
            title: loginReducer.user.fullName,

          },
        ]}
      />
      <PortfolioTitle
        isOwner={isOwner}
      />
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
    </PortfolioContext.Provider>
  )
}

PortfolioBody.propTypes = {
  portfolio: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isOwner: PropTypes.bool,
}

export default PortfolioBody
