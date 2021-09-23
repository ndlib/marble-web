import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  getPortfolioQuery,
  savePortfolioItemQuery,
  savePortfolioCollectionQuery,
  removeCollectionItem,
} from '@ndlib/gatsby-theme-marble/src/utils/api'
import PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'
import typy from 'typy'

const PortfolioLayer = ({ loginReducer, children, portfolioId }) => {
  const { isPorfolioOwner, portfolioUserLoading } = useUserContext()
  const [portfolioDirty, setPortfolioDirty] = useState(true)
  const [portfolioUpdates, setUportfolioUpdates] = useState(1)
  const [currentPortfolio, setCurrentPortfolio] = useState({})

  const optimisticallyUpdatePortfolio = (portfolio) => {
    setCurrentPortfolio(portfolio)
    setUportfolioUpdates(portfolioUpdates + 1)
  }

  const optimisticallyRemoveItem = (item) => {
    currentPortfolio.portfolioItems.items = typy(currentPortfolio, 'portfolioItems.items').safeArray.filter(i => item.portfolioItemId !== i.portfolioItemId)
    optimisticallyUpdatePortfolio(currentPortfolio)
  }

  const optimisticallyUpdateItem = (newItem) => {
    const index = typy(currentPortfolio, 'portfolioItems.items').safeArray.findIndex(i => newItem.portfolioItemId === i.portfolioItemId)
    currentPortfolio.portfolioItems.items[index] = newItem
    optimisticallyUpdatePortfolio(currentPortfolio)
  }

  const updatePortfolioItem = (portfolioItem) => {
    optimisticallyUpdateItem(portfolioItem)
    return savePortfolioItemQuery({ loginReducer: loginReducer, item: portfolioItem })
      .catch((e) => {
        console.error(e)
      })
  }

  const updatePortfolio = (portfolio) => {
    optimisticallyUpdatePortfolio(portfolio)
    return savePortfolioCollectionQuery({ loginReducer: loginReducer, portfolio: portfolio })
      .then((data) => {
        return data
      })
      .catch((e) => {
        setPortfolioDirty(true)
        console.error(e)
      })
  }

  const removePortfolioItem = (item) => {
    optimisticallyRemoveItem(item)
    return removeCollectionItem({
      loginReducer: loginReducer,
      item: item,
    })
      .catch((e) => {
        setPortfolioDirty(true)
        console.error(e)
      })
  }

  const reorderPortfolio = (sortedItems) => {
    currentPortfolio.portfolioItems.items = sortedItems
    optimisticallyUpdatePortfolio(currentPortfolio)

    return Promise.all(sortedItems.map((item, index) => {
      item.sequence = index
      return savePortfolioItemQuery({ item: item, loginReducer: loginReducer })
        .catch((e) => {
          console.error(e)
        })
    }))
      .catch(error => console.error(error))
  }

  const context = {
    portfolioLoading: portfolioDirty,
    portfolio: currentPortfolio,
    updatePortfolio: updatePortfolio,
    updatePortfolioItem: updatePortfolioItem,
    removePortfolioItem: removePortfolioItem,
    reorderPortfolio: reorderPortfolio,
  }

  useEffect(() => {
    const abortController = new AbortController()
    if (!portfolioUserLoading && portfolioDirty) {
      getPortfolioQuery({ loginReducer: loginReducer, isOwner: isPorfolioOwner(), portfolioId: portfolioId })
        .then(data => {
          if (!data.portfolioCollectionId) {
            data.portfolioNotFound = true
          }
          console.log(data)
          setCurrentPortfolio(data)
          setPortfolioDirty(false)
        })
        .catch(() => {
          setCurrentPortfolio({ portfolioId: portfolioId, status: 'private' })
        })
    }
    return () => {
      abortController.abort()
    }
  }, [portfolioId, loginReducer, isPorfolioOwner, portfolioDirty, portfolioUserLoading])

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
