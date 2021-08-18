import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getPortfolioQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

const PortfolioLayer = ({ loginReducer, children, portfolioId }) => {
  const { isPorfolioOwner } = useUserContext()

  const updatePortfolio = (portfolio) => {
    setCurrentPortfolio(portfolio)
  }

  const [currentPortfolio, setCurrentPortfolio] = useState({})
  const context = {
    portfolio: currentPortfolio,
    updatePortfolio: updatePortfolio,
  }

  useEffect(() => {
    const abortController = new AbortController()
    if (loginReducer.status === 'STATUS_NOT_LOGGED_IN' || loginReducer.status === 'STATUS_LOGGED_IN') {
      const isOwner = isPorfolioOwner()
      getPortfolioQuery({ loginReducer: loginReducer, isOwner: isOwner, portfolioId: portfolioId })
        .then(data => {
          setCurrentPortfolio(data)
        })
        .catch(() => {
          setCurrentPortfolio({ portfolioId: portfolioId, status: 'private' })
        })
    }
    return () => {
      abortController.abort()
    }
  }, [portfolioId, loginReducer, isPorfolioOwner])

  return (
    <PortfolioContext.Provider value={context}>{children}</PortfolioContext.Provider>
  )
}

PortfolioLayer.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  portfolioId: PropTypes.string.isRequired,
}

export default PortfolioLayer
