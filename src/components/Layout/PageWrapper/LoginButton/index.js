/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'

// eslint-disable-next-line complexity
export const LoginButton = ({ location, loginReducer }) => {
  const { t } = useTranslation()
  // if (!process.env.AUTH_CLIENT_ID || !process.env.AUTH_CLIENT_ISSUER || !process.env.AUTH_CLIENT_URL) {
  //   return null
  // }
  if (loginReducer.status === 'STATUS_LOGGED_IN') {
    return (
      <>
        <Link
          variant='navTop'
          to={`/user/${loginReducer.user.userName}`}
        >{t('common:loginMenu.userPage')}
        </Link>
        <Link
          variant='navTop'
          to='/user/logout'
        >{t('common:loginMenu.logout')}
        </Link>
      </>
    )
  }
  return (
    <>
      <Link
        variant='navTop'
        to={`/user`}
      >{t('common:loginMenu.userPage')}
      </Link>
      <Link
        variant='navTop'
        to='/user'
      >{t('common:loginMenu.login')}
      </Link>
    </>
  )
}

LoginButton.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.shape({
    status: PropTypes.string.isRequired,
    user: PropTypes.object,
  }).isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(LoginButton)
