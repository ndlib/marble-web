import React from 'react'
import PropTypes from 'prop-types'
// import { OktaAuth } from '@okta/okta-auth-js'

const LoginReturn = ({ userName, location, edit }) => {
  const authClientSettings = {
    url: 'https://okta.nd.edu',
    clientId: '0oa1f3ut0aKpdwap5357',
    redirectUri: `${location.origin}/testLogin`,
    issuer: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
    ignoreSignature: true,
    responseType: 'id_token',
    responseMode: 'fragment',
    pkce: true,
  }

  // const authClient = new OktaAuth(authClientSettings)
  // authClient.start()

  // console.log(authClient)
  return (
    <div>Hi</div>
  )
}

export default LoginReturn
