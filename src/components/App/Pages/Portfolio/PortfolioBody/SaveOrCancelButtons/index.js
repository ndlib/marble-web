/** @jsx jsx */
import React from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { patchData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'

// eslint-disable-next-line complexity
const SaveOrCancelButtons = ({
  closeFunc,
  patching,
  setPatching,
  body,
  valid,
  changed,
  loginReducer,
}) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  return (
    <React.Fragment>
      <Button
        onClick={closeFunc}
        disabled={patching}
        variant='light'
      >Cancel</Button>
      <Button
        onClick={() => {
          if (valid) {
            setPatching(true)
            patchData({
              loginReducer: loginReducer,
              contentType: 'collection',
              id: portfolio.uuid,
              body: body,
              successFunc: (result) => {
                updatePortfolio(result)
                setPatching(false)
                closeFunc()
              },
              errorFunc: (e) => {
                console.error(e)
              },
            })
          }
        }}
        variant='primary'
        disabled={!valid || patching || !changed}
      >Save</Button>
    </React.Fragment>
  )
}

SaveOrCancelButtons.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  closeFunc: PropTypes.func.isRequired,
  patching: PropTypes.bool,
  setPatching: PropTypes.func.isRequired,
  body: PropTypes.object.isRequired,
  valid: PropTypes.bool,
  changed: PropTypes.bool,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(SaveOrCancelButtons)
