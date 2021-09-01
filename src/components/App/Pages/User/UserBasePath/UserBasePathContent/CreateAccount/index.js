/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Heading, Button, Box, Label, Checkbox } from 'theme-ui'
import { connect } from 'react-redux'
import typy from 'typy'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import WelcomeMessage from './WelcomeMessage'
import TextField from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextField'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import { createNewUser } from '@ndlib/gatsby-theme-marble/src/store/actions/loginActions'

const CreateAccount = ({ loginReducer, dispatch }) => {
  const claims = typy(loginReducer, 'token.claims').safeObject
  const [fullName, changeName] = useState(claims.name)
  const [email, changeEmail] = useState(claims.email)
  const [bio, changeBio] = useState('')
  const [patching, setPatching] = useState(false)
  const [hasAcceptedTerms, acceptTerms] = useState(false)
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g

  return (
    <form>
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
      <Box>
        <Label mb={3}>
          <Checkbox
            checked={hasAcceptedTerms}
            onChange={() => acceptTerms(!hasAcceptedTerms)}
          />
          <span>
      I have reviewed and agree to the <Link to='https://policy.nd.edu/assets/185268/responsible_use_it_resources_2015.pdf'>Responsible Use Policy</Link>.</span>
        </Label>
      </Box>
      <p>
        <Button
          id='createAccount'
          onClick={(event) => {
            event.preventDefault()
            setPatching(true)
            const body = `
            mutation {
              savePortfolioUser(
                bio: "${bio}"
                email: "${email}"
                fullName: "${fullName}"
              ) {
                bio
                dateAddedToDynamo
                dateModifiedInDynamo
                department
                email
                fullName
                portfolioUserId
                primaryAffiliation
              }
            }`
            // const body = {
            //   fullName: fullName,
            //   email: email,
            //   bio: bio || '',
            //   uuid: `${claims.sub}.${btoa(claims.iss)}`,
            //   userName: claims.netid,
            // }
            dispatch(createNewUser(body, loginReducer))
          }}
          variant='primary'
          disabled={patching || !email.match(emailRegex) || fullName === '' || !hasAcceptedTerms}
        >Create Account</Button>
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
