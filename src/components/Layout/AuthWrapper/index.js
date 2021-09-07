import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  putAuthSettingsInStore,
  getTokenAndPutInStore,
} from '@ndlib/gatsby-theme-marble/src/store/actions/loginActions'

export const AuthWrapper = ({ children, location, loginReducer, dispatch }) => {
  if (!loginReducer.authClientSettings) {
    console.log('no settings')
    dispatch(putAuthSettingsInStore(location))
  } else {
    console.log('toky')
    dispatch(getTokenAndPutInStore(loginReducer, location))
  }

  return (
    <>
      {children}
    </>
  )
}

AuthWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  loginReducer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthWrapper)
