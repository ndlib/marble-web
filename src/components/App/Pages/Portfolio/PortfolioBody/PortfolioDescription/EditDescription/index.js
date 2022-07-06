/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import Editor from '@akord/rich-markdown-editor'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'
import sx from './sx'

export const EditDescription = ({ closeFunc }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const { description64 } = portfolio
  const [newDescription, setNewDescription] = useState(description64)
  const [patching, setPatching] = useState(false)
  return (
    <div sx={sx.wrapper}>
      <div sx={sx.textArea}>
        <Editor
          id={portfolio.portfolioCollectionId}
          defaultValue={newDescription}
          disableExtensions={['blockquote', 'highlight', 'strikethrough', 'bullet_list', 'checkbox_item', 'checkbox_list']}
          onChange={setNewDescription}
          onClickLink={(href, event) => {
            // prevent navigation on link click
            console.log(href)
            console.log(event)
          }}
          readOnly={patching}
          hideDropDownToolbar={true}
        />
      </div>
      <span sx={sx.buttonWrapper}>
        <SaveOrCancelButtons
          closeFunc={closeFunc}
          onClick={() => {
            setPatching(true)
            portfolio.description64 = newDescription
            updatePortfolio(portfolio)
              .then(() => {
                setPatching(false)
                closeFunc()
              })
              .catch((e) => {
                setPatching(false)
                console.error(e)
              })
          }}
          valid
          changed={description64 !== newDescription}
        />
      </span>
    </div>
  )
}

EditDescription.propTypes = {
  closeFunc: PropTypes.func.isRequired,
}

export default EditDescription
