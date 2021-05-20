/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Heading } from 'theme-ui'
import { connect } from 'react-redux'
import typy from 'typy'
import WelcomeMessage from './WelcomeMessage'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'
import TextField from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextField'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import { createNewUser } from '@ndlib/gatsby-theme-marble/src/store/actions/loginActions'
import style from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/style.module.css'

const CreateAccount = ({ loginReducer, dispatch }) => {
  const claims = typy(loginReducer, 'token.claims').safeObject
  const [fullName, changeName] = useState(claims.name)
  const [email, changeEmail] = useState(claims.email)
  const [bio, changeBio] = useState('')
  const [patching, setPatching] = useState(false)
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g

  return (
    <form className={style.loginArea}>
      <Heading as='h1' variant='pageTitle'>Finalize Account</Heading>
      <WelcomeMessage />
      <TextField
        id='profileName'
        label='Name'
        defaultValue={fullName}
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
        defaultValue={claims.netid}
        disabled
      />
      <TextField
        id='profileEmail'
        label='Email Address'
        defaultValue={claims.email}
        onChange={(event) => {
          changeEmail(event.target.value)
        }}
        disabled={patching}
        valid={emailRegex.test(email)}
        warning='Email must be a valid address.'
      />
      <TextArea
        id='profileBio'
        label='Bio'
        defaultValue={''}
        onChange={(event) => {
          changeBio(event.target.value)
        }}
        disabled={patching}
      />
      <p>
        <MaterialButton
          id='createAccount'
          onClick={(event) => {
            event.preventDefault()
            setPatching(true)
            const body = {
              fullName: fullName,
              email: email,
              bio: bio || '',
              uuid: `${claims.sub}.${btoa(claims.iss)}`,
              userName: claims.netid,
            }
            dispatch(createNewUser(`${claims.sub}.${btoa(claims.iss)}`, body, loginReducer))
          }}
          primary
          wide
          disabled={patching || !email.match(emailRegex) || fullName === ''}
        >Create Account</MaterialButton>
      </p>
    </form>
  )
}
const mapStateToProps = (state) => {
  return { ...state }
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}
CreateAccount.propTypes = {
  loginReducer: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccount)
