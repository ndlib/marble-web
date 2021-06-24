/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { jsx, Button } from 'theme-ui'
import { Trans, useTranslation } from 'react-i18next'

export const FollowButton = ({ userName, showButton, following = false }) => {
  const { t } = useTranslation()
  if (!showButton) {
    return (
      <div
        sx={{
          border: '1px solid',
          borderColor: 'gray.4',
          padding: '.5rem',
        }}
      >
        <Trans i18nKey='text:userPage.followPrompt'>
          <Link to='/user'>Log in</Link>.
        </Trans>
      </div>
    )
  } else if (following) {
    return (
      <Button
        onClick={() => unfollowAction(userName)}
      >
        {t('common:userMenu.unfollow')}
      </Button>
    )
  }
  return (
    <Button
      onClick={() => followAction(userName)}
    >
      {t('common:userMenu.follow')}
    </Button>
  )
}

FollowButton.propTypes = {
  showButton: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  following: PropTypes.bool,
}
export default FollowButton

export const followAction = (userName) => {
  console.log(`follow ${userName}`)
}

export const unfollowAction = (userName) => {
  console.log(`unfollow ${userName}`)
}
