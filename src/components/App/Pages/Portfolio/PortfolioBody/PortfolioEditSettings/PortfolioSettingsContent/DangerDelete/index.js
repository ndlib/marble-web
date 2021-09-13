/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import * as style from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/style.module.css'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const DangerDelete = ({ portfolio }) => {
  const { removeUserPortfolio } = useUserContext()
  console.log(useUserContext())
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
            removeUserPortfolio(portfolio).then(() => {
              navigate(`/user/${portfolio.portfolioUserId}`)
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
}

export default DangerDelete
