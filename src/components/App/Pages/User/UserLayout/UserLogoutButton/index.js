/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { connect } from 'react-redux'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

const UserLogoutButton = ({ loginReducer }) => {
  const { portfolioUser, isPortfolioOwner } = useUserContext()

  if (!isPortfolioOwner()) {
    return null
  }
  return (
    <Button
      onClick={async () => {
        try {
          localStorage.removeItem('okta-cache-storage')
          await loginReducer.authClientSettings.tokenManager.clear()
          window.location = '/'
        } catch {
          console.error('Could not log out user.')
        }
      }}
      variant='light'
      title='Log Out'
    >Log Out
    </Button>
  )
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(UserLogoutButton)
