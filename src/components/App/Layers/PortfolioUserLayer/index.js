import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import UserContext from '@ndlib/gatsby-theme-marble/src/context/UserContext'
import { getPortfolioUser, removeCollection, savePortfolioUser, savePortfolioCollectionQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import typy from 'typy'
import { navigate } from 'gatsby'

const PortfolioUserLayer = ({ userName, loginReducer, children }) => {
  const [portfolioUserDirty, setPortfolioUserDirty] = useState(true)
  const [currentPortfolioUser, setCurrentPortfolioUser] = useState({})

  const updatePortfolioUser = (newData) => {
    return savePortfolioUser({ loginReducer: loginReducer, user: newData })
      .then((data) => {
        setCurrentPortfolioUser(data)
        setPortfolioUserDirty(true)
        return data
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const optimisticallyRemoveCollection = (portfolio) => {
    const portfolios = typy(currentPortfolioUser, 'portfolioCollections.items').safeArray
    currentPortfolioUser.portfolioCollections.items = portfolios.filter(p => {
      return p.portfolioCollectionId !== portfolio.portfolioCollectionId
    })

    setCurrentPortfolioUser(currentPortfolioUser)
  }

  const removeUserPortfolio = (portfolio) => {
    optimisticallyRemoveCollection(portfolio)

    return removeCollection({
      loginReducer: loginReducer,
      portfolio: portfolio,
    })
      .then(() => {
        setPortfolioUserDirty(true)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const createNewPortfolio = () => {
    return savePortfolioCollectionQuery({
      loginReducer: loginReducer,
      portfolio: {
        title: 'My Portfolio',
        description: null,
        imageUri: null,
        layout: 'default',
        privacy: 'private',
        portfolioUserId: currentPortfolioUser.portfolioUserId,
      } })
      .catch((e) => {
        console.error(e)
      })
  }

  const context = {
    portfolioUser: currentPortfolioUser,
    portfolioUserLoading: portfolioUserDirty,
    updatePortfolioUser: updatePortfolioUser,
    removeUserPortfolio: removeUserPortfolio,
    createNewPortfolio: createNewPortfolio,
    isPorfolioOwner: () => {
      return loginReducer && loginReducer.status && currentPortfolioUser.portfolioUserId === loginReducer.user.netid
    },
  }

  useEffect(() => {
    const abortController = new AbortController()

    if ((loginReducer.status === 'STATUS_NOT_LOGGED_IN' || loginReducer.status === 'STATUS_LOGGED_IN') && typeof window !== 'undefined' && portfolioUserDirty) {
      getPortfolioUser({ userName: userName, loginReducer: loginReducer })
        .then((data) => {
          if (!data.portfolioUserId) {
            // if they have not logged in before go to the create page.
            if (loginReducer.user.netid === userName) {
              navigate('/user/create')
            } else {
              data.portfolioUserId = userName
              data.userNotFound = true
            }
          }
          setCurrentPortfolioUser(data)
          setPortfolioUserDirty(false)
        })
        .catch(() => {
          setCurrentPortfolioUser({})
        })
    }
    return () => {
      abortController.abort()
    }
  }, [loginReducer, userName, children, portfolioUserDirty])

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  )
}

PortfolioUserLayer.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
}

export default PortfolioUserLayer
