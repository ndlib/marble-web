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

    if (loginReducer.token) {
      getPortfolioUser({ loginReducer: loginReducer })
        .then((data) => {
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
}

export default PortfolioUserLayer
