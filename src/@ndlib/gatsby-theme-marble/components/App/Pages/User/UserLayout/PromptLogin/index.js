/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { Trans } from 'react-i18next'
import { jsx } from 'theme-ui'

export const PromptLogin = ({ showButton }) => {
  if (!showButton) {
    return null
  }
  return (
    <div
      sx={{
        border: '1px solid',
        borderColor: 'gray.1',
        padding: '.5rem',
      }}
    >
      <p>
        <Trans i18nKey='text:userPage.loginPrompt'>
          <Link to={`/user`}>Log in</Link>.
        </Trans>
      </p>
    </div>
  )
}

PromptLogin.propTypes = {
  showButton: PropTypes.bool.isRequired,

}
export default PromptLogin
