/** @jsx jsx */
import React from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// eslint-disable-next-line complexity
const SaveOrCancelButtons = ({
  closeFunc,
  patching,
  valid,
  changed,
  onClick,
}) => {
  return (
    <React.Fragment>
      <Button
        onClick={() => closeFunc()}
        disabled={patching}
        variant='light'
      >Cancel</Button>
      <Button
        onClick={() => {
          onClick()
        }}
        variant='primary'
        disabled={!valid || patching || !changed}
      >Save</Button>
    </React.Fragment>
  )
}

SaveOrCancelButtons.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  patching: PropTypes.bool,
  valid: PropTypes.bool,
  changed: PropTypes.bool,
}

export default SaveOrCancelButtons
