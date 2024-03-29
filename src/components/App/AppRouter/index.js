import React from 'react'
import PropTypes from 'prop-types'
import { Router } from '@reach/router'
import Layout from '../../Layout'
import UserBasePath from '../Pages/User/UserBasePath'
import User from '../Pages/User'
import CreateAccount from '../Pages/CreateAccount'
import LogOut from '../Pages/User/LogOut'
import Portfolio from '../Pages/Portfolio'

export const AppRouter = (props) => {
  return (
    <Layout location={props.location}>
      <Router>
        <CreateAccount path='/user/create' {...props} />
        <UserBasePath path='/user' {...props} />
        <LogOut path='/user/logout' {...props} />
        <User path='/user/:userName/edit' edit {...props} />
        <Portfolio path='/user/:userName/:portfolioId' {...props} />
        <User path='/user/:userName' {...props} />

      </Router>
    </Layout>
  )
}

AppRouter.propTypes = {
  location: PropTypes.object.isRequired,
}

export default AppRouter
