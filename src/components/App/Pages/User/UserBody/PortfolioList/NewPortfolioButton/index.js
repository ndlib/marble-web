/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { savePortfolioCollectionQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const NewPortfolioButton = ({ loginReducer }) => {
  const { t } = useTranslation()
  const { portfolioUser, isPorfolioOwner } = useUserContext()
  const [creating, setCreating] = useState(false)

  if (!isPorfolioOwner()) {
    return null
  }

  return (
    <Button
      onClick={() => {
        setCreating(true)
        savePortfolioCollectionQuery({
          loginReducer: loginReducer,
          portfolio: {
            title: 'My Portfolio',
            description: null,
            imageUri: null,
            layout: 'default',
            privacy: 'private',
            portfolioUserId: portfolioUser.portfolioUserId,
          } })
          .then((data) => {
            navigate(`/user/${portfolioUser.portfolioUserId}/${data.portfolioCollectionId}`)
            setCreating(false)
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
  loginReducer: PropTypes.object.isRequired,
}

export default NewPortfolioButton
