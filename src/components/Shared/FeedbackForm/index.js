/* eslint-disable complexity */
/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { useState } from 'react'
import PropTypes from 'prop-types'
import useForm from './useForm'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import TextField from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextField'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { createData } from './api'
import { connect } from 'react-redux'
import typy from 'typy'
import sx from './sx'

export const FeedbackForm = ({ closeFunc }) => {
  const [response, setResponse] = useState(false)
  const [name, changeName] = useState('')
  const [email, changeEmail] = useState('')
  const [feedback, changeFeedback] = useState('')
  const [patching, setPatching] = useState(false)
  const [error, setError] = useState(null)
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g

  const {
    handleSubmit,
  } = useForm(submit)

  function submit () {
    console.log('Submitted')
  }

  if (patching) {
    return (
      <Loading />
    )
  }
  if (error) {
    return (
      <div>
        <form>
          <p id='thankYou'>Houston. We have a problem.</p>
          <p>We were unable to create a ticket for you due to network issues.</p>
          <div sx={sx.buttonGroup}>
            <Button
              onClick={() => {
                changeFeedback('')
                setResponse(false)
                setError(false)
              }}
              id='submitAnother'
              variant='primary'
            >Try Again?
            </Button>
            <Button
              onClick={() => {
                closeFunc()
              }}
              variant='light'
              id='cancel'
            >Close
            </Button>
          </div>
        </form>
      </div>
    )
  } else {
    if (response) {
      return (
        <div>
          <form>
            <p id='thankYou'>Thank you for your feedback! You will receive an automated email from ND Service Desk.</p>
            <p>Your ServiceNow ticket number is: #{typy(response.result, 'number').safeString}</p>
            <p>You can submit <Link to='/help/contact-us'>another response</Link>.</p>
            <div sx={sx.buttonGroup}>
              <Button
                onClick={() => {
                  closeFunc()
                }}
                variant='light'
                id='cancel'
              >Close
              </Button>
            </div>
          </form>
        </div>
      )
    }
    return (
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id='name'
            label='Name'
            defaultValue={name}
            onChange={(event) => {
              changeName(event.target.value)
            }}
            disabled={patching}
            valid={name !== ''}
            warning='Required'
          />
          <TextField
            id='email'
            label='Email Address'
            defaultValue={email}
            onChange={(event) => {
              changeEmail(event.target.value)
            }}
            disabled={patching}
            valid={emailRegex.test(email)}
            warning='Email must be a valid address.'
          />
          <TextArea
            id='feedback'
            label='Tell us about your experience, ideas, or questions related to the site.'
            defaultValue=''
            onChange={(event) => {
              changeFeedback(event.target.value)
            }}
            valid={feedback !== ''}
            warning='Feedback cannot be blank.'
            disabled={patching}
          />
          <div>
            <Button
              id='submit'
              onClick={(e) => {
                e.preventDefault()
                setPatching(true)
                const body = {
                  name: name,
                  email: email,
                  feedback: feedback,
                  assignment_group: 'e86420211b79e0109a56ea866e4bcbd9',
                }
                createData({
                  body: body,
                  successFunc: (data) => {
                    setResponse(data)
                    setPatching(false)
                  },
                  errorFunc: (e) => {
                    setError(true)
                    setPatching(false)
                    console.error(e)
                  },
                })
              }}
              disabled={patching || !email.match(emailRegex) || name === '' || feedback === ''}
              variant='primary'
            >Submit
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

FeedbackForm.propTypes = {
  closeFunc: PropTypes.func,
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
)(FeedbackForm)
