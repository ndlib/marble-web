/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { navigate } from 'gatsby'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

const EditUserButton = () => {
  const { portfolioUser, isPorfolioOwner } = useUserContext()

  if (!isPorfolioOwner()) {
    console.log('nope on the button')
    return null
  }

  return (
    <Button
      onClick={() => navigate(`/user/${portfolioUser.portfolioUserId}/edit`)}
      variant='primary'
      sx={{ mb: '1em' }}
    >Edit Bio
    </Button>
  )
}

export default EditUserButton
