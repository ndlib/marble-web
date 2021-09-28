/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Heading } from 'theme-ui'
import { connect } from 'react-redux'
// import { useTranslation } from 'react-i18next'
import { isLoggedIn } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { NDBrandBreadcrumbs } from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

import OktaLogin from './OktaLogin'
import LogOut from './LogOut'

const sx = {
  loginArea: {
    padding: '1rem',
    textAlign: 'center',
  },
  message: {
    margin: '0 auto 2rem',
  },
}

export const LoginArea = ({ loginReducer }) => {
  // const { t } = useTranslation()
  if (isLoggedIn(loginReducer)) {
    return (
      <div>
        <form sx={sx.loginArea}>
          <LogOut />
        </form>
      </div>
    )
  }
  return (
    <div>
      <NDBrandBreadcrumbs
        currentPageTitle='Marble Login'
        breadcrumbs={[]}
      />
      <Heading as='h1' variant='pageTitle'>Marble Login</Heading>
      <form sx={sx.loginArea}>
        <OktaLogin />
      </form>
      <Heading as='h2'>What is a portfolio?</Heading>
      <p>Portfolios allow logged in users from the University of Notre Dame community to bring digitized items from across campus together in different ways. Each user can create customized lists and collections of content.</p>
      <p>Users can learn more <Link to='/portfolios-about'>about portfolios</Link> or how to <Link to='/portfolios-teaching'>use Marble in your classroom</Link>. </p>

    </div>
  )
}

LoginArea.propTypes = {
  loginReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(LoginArea)
