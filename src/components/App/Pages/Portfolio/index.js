import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import PortfolioBody from './PortfolioBody'
import UserLayout from '../User/UserLayout'
import PortfolioUserLayer from '../../Layers/PortfolioUserLayer'
import PortfolioLayer from '../../Layers/PortfolioLayer'

export const Portfolio = ({ userName, portfolioId, location, loginReducer }) => {
  return (
    <PortfolioUserLayer userName={userName} location={location} loginReducer={loginReducer}>
      <PortfolioLayer portfolioId={portfolioId} location={location} loginReducer={loginReducer}>

        <UserLayout location={location}>
          <PortfolioBody
            location={location}
          />
        </UserLayout>
      </PortfolioLayer>
    </PortfolioUserLayer>

  )
}

Portfolio.propTypes = {
  portfolioId: PropTypes.string,
  userName: PropTypes.string,
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
