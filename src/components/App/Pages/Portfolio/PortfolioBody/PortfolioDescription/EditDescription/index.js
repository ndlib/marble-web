/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'
import sx from './sx'

const EditDescription = ({ closeFunc }) => {
  const { portfolio } = usePortfolioContext()
  const description = portfolio.description
  const [newDescription, setNewDescription] = useState(description)
  const [patching, setPatching] = useState(false)

  return (
    <div sx={sx.wrapper}>
      <label
        htmlFor='portfolioDescription'
        className='accessibilityOnly'
      >Description
      </label>
      <textarea
        name='portfolioDescription'
        defaultValue={newDescription}
        onChange={(event) => {
          setNewDescription(event.target.value)
        }}
        disabled={patching}
        sx={sx.textArea}
        aria-label='Description'
      />
      <span sx={sx.buttonWrapper}>
        <SaveOrCancelButtons
          closeFunc={closeFunc}
          patching={patching}
          setPatching={setPatching}
          body={`mutation {
            savePortfolioCollection(
              description: "${newDescription}",
              portfolioCollectionId: "${portfolio.portfolioCollectionId}",
              title: "${portfolio.title}",
              privacy: ${portfolio.privacy},
              layout: "${portfolio.layout}",
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
          valid
          changed={description !== newDescription}
        />
      </span>
    </div>
  )
}

EditDescription.propTypes = {
  closeFunc: PropTypes.func.isRequired,
}

export default EditDescription
