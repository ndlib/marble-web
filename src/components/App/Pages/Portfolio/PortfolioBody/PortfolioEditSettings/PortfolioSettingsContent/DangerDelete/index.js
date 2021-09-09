/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import { removeCollection } from '@ndlib/gatsby-theme-marble/src/utils/api'
import * as style from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/style.module.css'

export const DangerDelete = ({ portfolio, loginReducer }) => {
  const warning = 'Once you delete this portfolio it can not be recovered.'
  const groupId = 'danger'
  const fieldId = 'delete'
  return (
    <div
      id={groupId}
      className={style.editGroup}
    >
      <label htmlFor={fieldId}>
        <p><strong>{warning}</strong></p>
        <p>Are you sure you want to delete <code>{portfolio.title}</code>?</p>
      </label>
      <div className={style.buttonGroup}>
        <Button
          onClick={(e) => {
            e.preventDefault()
            removeCollection({
              loginReducer: loginReducer,
              portfolio: portfolio,
            }).then(() => {
              navigate(`/user/${loginReducer.user.netid}`)
            })
              .catch((e) => {
                console.error(e)
              })
          }}
        >Delete</Button>
      </div>
    </div>
  )
}

DangerDelete.propTypes = {
  portfolio: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(DangerDelete)
