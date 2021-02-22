/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Link } from 'gatsby'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Internal/ActionModal'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Internal/MaterialButton'

const BetaModal = () => {
  const [settingsOpen, setSettingsOpen] = useState(true)
  const handleChange = (e) => {
    localStorage.setItem('seenWarning', e)
  }
  const handleCloseModal = () => {
    setSettingsOpen(false)

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
          <p> Welcome to the Beta version of the Marble website - a platform for discovering digitized rare and unique materials from the Snite Museum of Art and Hesburgh Libraries.
            You will find that some of the pages, icons, and buttons on this site do not function as expected and you might notice occasional outages or changes.
            The project team will be refining and actively improving this site until our launch in the summer of 2021. <Link to='/about'>Please let us know what you think about the Marble site</Link> and <Link to='/help/contact-us'> how we can improve it by filling out our contact form.</Link>
            We will be adding more content - check back for new additions!
          </p>
          <input name='notAgain' type='checkbox' checked={localStorage.getItem('seenWarning')} onChange={e => handleChange(e)} /><label>Do not show this again</label>
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
