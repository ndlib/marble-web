/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { useState } from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const NewPortfolioButton = () => {
  const { t } = useTranslation()
  const { portfolioUser, isPortfolioOwner, createNewPortfolio } = useUserContext()
  const [creating, setCreating] = useState(false)

  if (!isPortfolioOwner()) {
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
      variant='light'
      disabled={creating}
    >{t('common:button.createPortfolio')}
    </Button>
  )
}

NewPortfolioButton.propTypes = {
}

export default NewPortfolioButton
