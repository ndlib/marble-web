import React from 'react'
import PropTypes from 'prop-types'
import AppRouter from './AppRouter'

export const App = ({ location }) => <AppRouter location={location} />

App.propTypes = {
  location: PropTypes.object.isRequired,
}

export default App
