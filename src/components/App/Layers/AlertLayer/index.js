import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AlertContext from '@ndlib/gatsby-theme-marble/src/context/AlertContext'

const AlertLayer = ({ children }) => {
  const [currentAlerts, setAlerts] = useState({})
  const [updates, setUpdates] = useState(0)

  const addAlert = (msg, type) => {
    const id = Date.now()
    currentAlerts[id] = { msg: msg, type: type }

    setTimeout(() => {
      removeAlert(id)
    }, 5000)

    setAlerts(currentAlerts)
    setUpdates(updates + 1)
  }

  const removeAlert = (id) => {
    delete currentAlerts[id]

    setAlerts(currentAlerts)
    setUpdates(updates + 1)
  }

  const context = {
    alerts: currentAlerts,
    addAlert: addAlert,
    removeAlert: removeAlert,
  }

  return (
    <AlertContext.Provider value={context}>{children}</AlertContext.Provider>
  )
}

AlertLayer.propTypes = {
  children: PropTypes.object.isRequired,
}

export default AlertLayer
