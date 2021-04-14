/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import sx from './sx'
import SearchBox from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchBox'
import PortfolioTitle from './PortfolioTitle'
import PortfolioDescription from './PortfolioDescription'
import PortfolioItems from './PortfolioItems'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Ownership from './Ownership'
import PortfolioContext, { initialContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'

const PortfolioBody = ({ portfolio, location, isOwner }) => {
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
      <div sx={sx.searchBoxBG}>
        <SearchBox boxLabel='Search the Collections' location={location} />
      </div>
      <PortfolioTitle
        isOwner={isOwner}
      />
      <Ownership
        isOwner={isOwner}
        location={location}
      />
      <div className='clearfix' />
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