/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { isLoggedIn } from 'utils/auth'
import OktaLogin from './OktaLogin'
import LogOut from './LogOut'

const sx = {
  loginArea: {
    border: '1px solid #dedede',
    padding: '1rem',
    textAlign: 'center',
  },
  message: {
    margin: '0 auto 2rem',
  },
}

export const LoginArea = ({ loginReducer }) => {
  const { t } = useTranslation()
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
      <form sx={sx.loginArea}>
        <div sx={sx.message}>
          {t('text:loginPage.message')}
        </div>
        <OktaLogin />
      </form>
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
