/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { jsx, Button } from 'theme-ui'
import Gravatar from '@ndlib/gatsby-theme-marble/src/components/Shared/Gravatar'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import TextField from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextField'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import Unauthorized from './Unauthorized'
import * as style from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/style.module.css'
import { NDBrandBreadcrumbs } from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const UserEdit = ({ portfolioUser, isPorfolioOwner, location }) => {
  const { updatePortfolioUser } = useUserContext()
  const [fullName, changeName] = useState(portfolioUser.fullName)
  const [email, changeEmail] = useState(portfolioUser.email)
  const [bio, changeBio] = useState(portfolioUser.bio)
  const [patching, setPatching] = useState(false)
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g

  if (!isPorfolioOwner) {
    return (<Unauthorized />)
  }

  const callBack = () => {
    setPatching(true)
    const newUser = {
      bio: bio,
      email: email,
      fullName: fullName,
    }
    updatePortfolioUser(newUser)
      .then(() => {
        setPatching(false)
        navigate(`/user/${portfolioUser.portfolioUserId}`)
      })
  }

  return (
    <>
      <NDBrandBreadcrumbs
        currentPageTitle='Edit'
        breadcrumbs={[
          {
            url: `/user/${portfolioUser.userPorfolioId}`,
            title: portfolioUser.fullName,
          },
        ]}
      />
      <form className={style.edit}>
        <div className={style.buttonGroup}>
          <Button
            onClick={(e) => {
              e.preventDefault()
              if (window.confirm(
                'Any unsaved changes you have made will be lost.',
              )) {
                navigate(`/user/${portfolioUser.portfolioUserId}`)
              }
            }}
            disabled={patching}
            variant='light'
          >Cancel</Button>
          <Button
            onClick={(e) => {
              e.preventDefault()
              callBack()
            }}
            disabled={patching || !emailRegex.test(email) || fullName === ''}
            variant='primary'
          >Save</Button>
        </div>
        <TextField
          id='profileName'
          label='Name'
          defaultValue={portfolioUser.fullName}
          onChange={(event) => {
            changeName(event.target.value)
          }}
          disabled={patching}
          valid={fullName !== ''}
          warning='Name cannot be blank.'
        />
        <TextField
          id='profileUserName'
          label='Username'
          defaultValue={portfolioUser.portfolioUserId}
          disabled
        />
        <TextField
          id='profileEmail'
          label='Email Address'
          defaultValue={portfolioUser.email}
          onChange={(event) => {
            changeEmail(event.target.value)
          }}
          disabled={patching}
          valid={email.match(emailRegex)}
          warning='Email must be a valid address.'
        />
        <TextArea
          id='profileBio'
          label='Bio'
          defaultValue={portfolioUser.bio}
          onChange={(event) => {
            changeBio(event.target.value)
          }}
          disabled={patching}
        />
        <div>
          <label
            htmlFor='profileGravatar'
            className={style.editLabel}
          >Avatar</label>
          <div
            id='profileGravatar'
            className={style.gravatarEdit}
          >
            <Gravatar email={portfolioUser.email} size={100} />
            <span>User icons are provided by <Link to='https://en.gravatar.com'>Gravatar</Link>, the globally recognized avatar service.</span>
          </div>
        </div>
      </form>
    </>
  )
}

UserEdit.propTypes = {
  portfolioUser: PropTypes.object.isRequired,
  isPorfolioOwner: PropTypes.bool,
  location: PropTypes.object,
}

export default UserEdit
