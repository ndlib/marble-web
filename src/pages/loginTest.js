import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { OktaAuth } from '@okta/okta-auth-js/dist/okta-auth-js.umd'
let Okta
if (typeof window !== `undefined`) {
  Okta = React.lazy(() => import('@okta/okta-auth-js'))
}

const authClientSettings = {
  url: 'https://okta.nd.edu',
  clientId: '0oa1f3ut0aKpdwap5357',
  redirectUri: `https://localhost:8000/user`,
  issuer: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
  ignoreSignature: true,
  responseType: 'id_token',
  responseMode: 'fragment',
  pkce: true,
}


const LoginTest = ({ userName, location, edit }) => {
  let authClient = {}
  useEffect(() => {
    try {
      if (Okta) {
        console.log(Okta().OktaAuth)
      }


      // authClient = new OktaAuth(authClientSettings)
      // authClient = new OktaAuth(authClientSettings)
    }
    catch (e) {
      console.error("authy", e)
    }
  }, [authClient])
  //authClient.start()


  console.log(authClient)
  return (
    <p>
    </p>
  )

}

export default LoginTest
