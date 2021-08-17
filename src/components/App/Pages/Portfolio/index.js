import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import PortfolioBody from './PortfolioBody'
import PortfolioUnavailable from './PortfolioUnavailable'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import { getPortfolioQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import UserLayout from '../User/UserLayout'

export const Portfolio = ({ portfolioId, location, loginReducer }) => {
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()
    console.log(loginReducer.status)
    if (loginReducer.status === 'STATUS_NOT_LOGGED_IN' || loginReducer.status === 'STATUS_LOGGED_IN') {
      const isOwner = ownsPage(loginReducer, location)
      getPortfolioQuery({ loginReducer: loginReducer, isOwner: isOwner, portfolioId: portfolioId })
        .then(data => {
          const { privacy } = data
          if (privacy === 'private' && !isOwner) {
            setContent(<PortfolioUnavailable />)
          } else {
            setContent(<PortfolioBody
              location={location}
              portfolio={data}
              isOwner={isOwner}
              loginReducer={loginReducer}
            />)
          }
        })
        .catch(() => {
          setContent(<PortfolioUnavailable />)
        })
    }
    return () => {
      abortController.abort()
    }
  }, [portfolioId, loginReducer, location])

  return (
    <UserLayout loginReducer={loginReducer} location={location}>
      {content}
    </UserLayout>
  )
}

Portfolio.propTypes = {
  portfolioId: PropTypes.string,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(Portfolio)

export const shouldShow = (portfolio, isOwner) => {
  const visibility = typy(portfolio, 'visibility').safeString
  return visibility === 'public' || visibility === 'shared' || isOwner
}
