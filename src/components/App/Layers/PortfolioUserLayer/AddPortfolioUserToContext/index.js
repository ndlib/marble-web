/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import UserContext, { initialContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

const PortfolioUserLayer = ({ portfolioUser, children, loginReducer }) => {
  const [loggedInState, setLoggedInState] = useState(loginReducer.status)

  const updatePortfolioUser = (portfolioUser) => {
    setContext({ ...context, portfolioUser: portfolioUser })
  }

  const [context, setContext] = useState({
    ...initialContext,
    portfolioUser: portfolioUser,
    updatePortfolioUser: updatePortfolioUser,
    isPorfolioOwner: () => {
      return loginReducer && loginReducer.status && portfolioUser.portfolioUserId === loginReducer.user.netid
    },
  })

  if (loggedInState !== loginReducer.status && loginReducer.status === 'STATUS_LOGGED_IN') {
    setLoggedInState(loginReducer.status)
  } else if (loggedInState === 'STATUS_LOGGED_IN' && loginReducer.status !== loggedInState) {
    setLoggedInState(loginReducer.status)
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  )
}

PortfolioUserLayer.propTypes = {
  portfolioUser: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export default PortfolioUserLayer
