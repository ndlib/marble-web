/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Link } from 'gatsby'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'

const BetaModal = () => {
  const [settingsOpen, setSettingsOpen] = useState(true)
  const handleChange = (e) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('seenWarning', e)
    }
  }
  const handleCloseModal = () => {
    setSettingsOpen(false)
  }

  const checkSeenWarning = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('seenWarning')
    }
    return false
  }

  return (
    <div>
      <ActionModal
        isOpen={settingsOpen}
        contentLabel='Welcome to Marble'
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
        closeFunc={handleCloseModal}
      >
        <div>
          <p> Welcome to the Beta version of Marble—a new platform to discover digitized cultural heritage holdings from the Snite Museum of Art and the Hesburgh Libraries at the University of Notre Dame. </p>
          <p>The project team will be refining the Marble website through the summer of 2021 in preparation for the campus launch in the fall. If you have any suggestions or notice something that does not function as expected, please <a href='https://marble.nd.edu/help/contact-us'>contact us</a> and let us know.</p>
          <label><input name='notAgain' type='checkbox' checked={checkSeenWarning()} onChange={e => handleChange(e)} />Do not show this again</label>
        </div>
        <div>&nbsp;</div>
        <MaterialButton
          onClick={() => {
            handleCloseModal()
          }}
          primary
          id='cancel'
        >Close
        </MaterialButton>
      </ActionModal>
    </div>
  )
}

export default BetaModal
