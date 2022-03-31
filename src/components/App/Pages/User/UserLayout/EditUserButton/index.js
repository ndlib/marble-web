/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { navigate } from 'gatsby'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

const EditUserButton = () => {
  const { portfolioUser, isPortfolioOwner } = useUserContext()

  if (!isPortfolioOwner()) {
    return null
  }

  return (
    <Button
      onClick={() => navigate(`/user/${portfolioUser.portfolioUserId}/edit`)}
      variant='light'
      title='Edit my portfolio'
    >Edit Bio
    </Button>
  )
}

export default EditUserButton
