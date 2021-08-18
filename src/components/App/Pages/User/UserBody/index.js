import React from 'react'
import PropTypes from 'prop-types'
import PortfolioList from './PortfolioList'
import UserEdit from './UserEdit'

const UserBody = ({ location, edit = false }) => {
  return edit ? <UserEdit location={location} /> : <PortfolioList location={location} />
}

UserBody.propTypes = {
  edit: PropTypes.bool,
  location: PropTypes.object,
}

export default UserBody
