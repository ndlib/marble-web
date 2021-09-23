import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserLayout from './UserLayout'
import PortfolioUserLayer from '../../Layers/PortfolioUserLayer'
import AlertLayer from '../../Layers/AlertLayer'
import UserBody from './UserBody'

const User = ({ loginReducer, userName, location, edit }) => {
  return (
    <AlertLayer>
      <PortfolioUserLayer userName={userName} location={location} loginReducer={loginReducer}>
        <UserLayout
          location={location}
        >
          <UserBody
            edit={edit}
            location={location}
          />
        </UserLayout>
      </PortfolioUserLayer>
    </AlertLayer>
  )
}
User.propTypes = {
  userName: PropTypes.string,
  edit: PropTypes.bool,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(User)
