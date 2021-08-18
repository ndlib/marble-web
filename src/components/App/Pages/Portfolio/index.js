import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import PortfolioBody from './PortfolioBody'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import { getPortfolioQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import UserLayout from '../User/UserLayout'
import PortfolioUserLayer from '../../Layers/PortfolioUserLayer'
import PortfolioLayer from '../../Layers/PortfolioLayer'

export const Portfolio = ({ portfolioId, location, loginReducer }) => {
  return (
    <PortfolioUserLayer location={location} loginReducer={loginReducer}>
      <PortfolioLayer portfolioId={portfolioId} location={location} loginReducer={loginReducer}>

        <UserLayout loginReducer={loginReducer} location={location}>
          <PortfolioBody
            location={location}
            loginReducer={loginReducer}
          />
        </UserLayout>
      </PortfolioLayer>
    </PortfolioUserLayer>

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
