/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import { jsx, Button } from 'theme-ui'
import typy from 'typy'
import Gravatar from '@ndlib/gatsby-theme-marble/src/components/Shared/Gravatar'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import TextField from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextField'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import Unauthorized from './Unauthorized'
import { savePortfolioUser } from '@ndlib/gatsby-theme-marble/src/utils/api'
import * as style from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/style.module.css'
import { NDBrandBreadcrumbs } from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const UserEdit = ({ loginReducer, location }) => {
  const { user, setUser } = useUserContext()
  console.log('userEdit', user)
  const claims = typy(loginReducer, 'token.claims').safeObject
  const [fullName, changeName] = useState(user.fullName)
  const [email, changeEmail] = useState(user.email)
  const [bio, changeBio] = useState(user.bio)
  const [patching, setPatching] = useState(false)
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g

  if (!ownsPage(loginReducer, location)) {
    return (<Unauthorized />)
  }

  const callBack = () => {
    setPatching(true)
    const newUser = {
      bio: bio,
      email: email,
      fullName: fullName,
    }
    console.log('user=', user)
    savePortfolioUser({ loginReducer: loginReducer, user: newUser })
      .then((data) => {
        setPatching(false)
        console.log(data)
        setUser(data)
        navigate(`/user/${user.portfolioUserId}`)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <>
      <NDBrandBreadcrumbs
        currentPageTitle='Edit'
        breadcrumbs={[
          {
            url: `/user/${loginReducer.user.userPorfolioId}`,
            title: loginReducer.user.fullName,
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
                navigate(`/user/${user.portfolioUserId}`)
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
          defaultValue={user.fullName}
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
          defaultValue={user.portfolioUserId}
          disabled
        />
        <TextField
          id='profileEmail'
          label='Email Address'
          defaultValue={user.email}
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
          defaultValue={user.bio}
          onChange={(event) => {
            console.log('change bio')
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
            <Gravatar email={user.email} size={100} />
            <span>User icons are provided by <Link to='https://en.gravatar.com'>Gravatar</Link>, the globally recognized avatar service.</span>
          </div>
        </div>
      </form>
    </>
  )
}

UserEdit.propTypes = {
  user: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserEdit)
