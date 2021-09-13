/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const NewPortfolioButton = () => {
  const { t } = useTranslation()
  const { portfolioUser, isPorfolioOwner, createNewPortfolio } = useUserContext()
  const [creating, setCreating] = useState(false)

  if (!isPorfolioOwner()) {
    return null
  }

  return (
    <Button
      onClick={() => {
        setCreating(true)
        createNewPortfolio()
          .then((data) => {
            setCreating(false)
            navigate(`/user/${portfolioUser.portfolioUserId}/${data.portfolioCollectionId}`)
          })
          .catch((e) => {
            console.error(e)
          })
      }}
      variant='primary'
      disabled={creating}
    >{t('common:button.createPortfolio')}
    </Button>
  )
}

NewPortfolioButton.propTypes = {
}

export default NewPortfolioButton
