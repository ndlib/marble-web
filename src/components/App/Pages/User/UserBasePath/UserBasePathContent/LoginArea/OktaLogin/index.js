/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import OktaAuth from '@okta/okta-auth-js'

export const OktaLogin = ({ loginReducer }) => {
  const { t } = useTranslation()
  return (
    <p>
      <Button
        id='okta'
        onClick={(e) => {
          e.preventDefault()
          const authClient = loginReducer.authClientSettings
          authClient.token.getWithRedirect({
            responseType: 'id_token',
            responseMode: 'fragment',
            scopes: [
              'openid',
              'email',
              'profile',
              'netid',
              'directory',
            ],
            pkce: false,
          })
        }}
        variant='primary'
      >{t('text:loginPage.button')}
      </Button>
    </p>
  )
}

OktaLogin.propTypes = {
  loginReducer: PropTypes.object.isRequired,
}
const mapStateToProps = (state, ownProps) => {
  return { ...state, ...ownProps }
}

export default connect(mapStateToProps)(OktaLogin)
