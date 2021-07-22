/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { useState } from 'react'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import FeedbackForm from '../FeedbackForm'
import sx from './sx'

const FeedbackModal = ({ location }) => {
  const noFeedbackModal = ['/help/contact-us']
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleOpenModal = () => {
    setSettingsOpen(true)
  }
  const handleCloseModal = () => {
    setSettingsOpen(false)
  }

  if (noFeedbackModal.includes(location.pathname)) {
    return null
  }

  return (
    <div>
      <button id='feedbackButton' onClick={handleOpenModal} sx={sx.feedbackButton}>Feedback</button>
      <ActionModal
        aria-modal='true'
        isOpen={settingsOpen}
        contentLabel='Marble Feedback'
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
        closeFunc={handleCloseModal}
      >
        <div>
          {/* Optional Google Form for backup */}
          {/* <iframe title='Marble Feedback' src='https://docs.google.com/forms/d/e/1FAIpQLSd_hrPoNy1SvGYnYAa8d9MQ5fNIQYpkxcHFFVu6rv8VmlFCgw/viewform?embedded=true' frameBorder='0' marginHeight='0' marginWidth='0'>Loading…</iframe> */}
          <FeedbackForm closeFunc={handleCloseModal} />
        </div>
      </ActionModal>
    </div>
  )
}

FeedbackModal.propTypes = {
  location: PropTypes.object.isRequired,
}

export default FeedbackModal
