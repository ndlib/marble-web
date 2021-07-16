/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'
import sx from './sx'

// eslint-disable-next-line complexity
const TitleEdit = ({ closeFunc }) => {
  const { portfolio } = usePortfolioContext()
  const defaultTitle = portfolio.title
  const [newTitle, setNewTitle] = useState(defaultTitle)
  const [patching, setPatching] = useState(false)
  const [valid, setValid] = useState(newTitle !== '')

  return (
    <div>
      <label
        htmlFor='portfolioName'
        className='accessibilityOnly'
      >Title
      </label>
      <input
        type='text'
        name='portfolioName'
        defaultValue={newTitle}
        onChange={(event) => {
          setValid(event.target.value !== '')
          setNewTitle(event.target.value)
        }}
        aria-label='Title'
        disabled={patching}
        sx={sx.input(valid)}
      />
      <span sx={sx.buttonWrapper}>
        <SaveOrCancelButtons
          closeFunc={closeFunc}
          patching={patching}
          setPatching={setPatching}
          body={`mutation {
            savePortfolioCollection(
              title: "${newTitle}",
              portfolioCollectionId: "${portfolio.portfolioCollectionId}",
              privacy: ${portfolio.privacy},
              layout: "${portfolio.layout}",
              description: "${portfolio.description}",
              imageUri: "${portfolio.imageUri}"
            ) {
              dateAddedToDynamo
              dateModifiedInDynamo
              description
              featuredCollection
              highlightedCollection
              imageUri
              layout
              portfolioCollectionId
              portfolioUserId
              privacy
              title
              portfolioItems {
                items {
                  annotation
                  dateAddedToDynamo
                  dateModifiedInDynamo
                  description
                  imageUri
                  internalItemId
                  itemType
                  portfolioCollectionId
                  portfolioItemId
                  portfolioUserId
                  sequence
                  title
                  uri
                }
              }
            }
          }`}
          valid={valid}
          changed={defaultTitle !== newTitle}
        />
      </span>
      { valid ? null : <div sx={sx.warning}><em>Title cannot be blank.</em></div> }
    </div>
  )
}

TitleEdit.propTypes = {
  closeFunc: PropTypes.func.isRequired,
}

export default TitleEdit
