import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AddPortfolioUserToContext from './AddPortfolioUserToContext'
import NoUser from './NoUser'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import { getPortfolioUser } from '@ndlib/gatsby-theme-marble/src/utils/api'

const PortfolioUserLayer = ({ userName, loginReducer, children }) => {
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()

    if (loginReducer.status === 'STATUS_NOT_LOGGED_IN' || loginReducer.status === 'STATUS_LOGGED_IN') {
      console.log('un=', userName)
      getPortfolioUser({ userName: userName, loginReducer: loginReducer })
        .then((data) => {
          console.log('result', data)
          setContent(<AddPortfolioUserToContext loginReducer={loginReducer} portfolioUser={data}>
            {children}
          </AddPortfolioUserToContext>
          )
        }
        )
        .catch(() => {
          setContent(<NoUser userName={userName} />)
        }
        )
    }
    return () => {
      abortController.abort()
    }
  }, [loginReducer, userName, children])

  return (
    <>
      { content }
    </>
  )
}

PortfolioUserLayer.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
}

export default PortfolioUserLayer
