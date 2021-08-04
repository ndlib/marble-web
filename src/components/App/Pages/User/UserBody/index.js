import React from 'react'
import PropTypes from 'prop-types'
import PortfolioList from './PortfolioList'
import UserEdit from './UserEdit'

const UserBody = ({ user, location, edit = false }) => {
  return edit ? <UserEdit location={location} user={user} /> : <PortfolioList location={location} user={user} />
}

UserBody.propTypes = {
  user: PropTypes.object.isRequired,
  edit: PropTypes.bool,
}

export default UserBody
