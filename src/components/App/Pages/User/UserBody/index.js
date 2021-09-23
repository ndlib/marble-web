import React from 'react'
import PropTypes from 'prop-types'
import PortfolioList from './PortfolioList'
import UserEdit from './UserEdit'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

const UserBody = ({ location, edit = false }) => {
  const { portfolioUser, isPorfolioOwner } = useUserContext()

  if (edit) {
    return <UserEdit location={location} portfolioUser={portfolioUser} isPorfolioOwner={isPorfolioOwner()} />
  } else {
    return <PortfolioList location={location} portfolioUser={portfolioUser} isPorfolioOwner={isPorfolioOwner()} />
  }
}

UserBody.propTypes = {
  edit: PropTypes.bool,
  location: PropTypes.object,
}

export default UserBody
