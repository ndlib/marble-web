/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'
import sx from './sx'

export const EditDescription = ({ closeFunc }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const description = portfolio.description
  const [newDescription, setNewDescription] = useState(description)
  const [patching, setPatching] = useState(false)

  return (
    <div sx={sx.wrapper}>
      <TextArea
        id='portfolioDescription'
        defaultValue={newDescription}
        onChange={(event) => {
          setNewDescription(event.target.value)
        }}
        sx={sx.textArea}
        disabled={patching}
        label='Description'
        hideLabel
      />
      <span sx={sx.buttonWrapper}>
        <SaveOrCancelButtons
          closeFunc={closeFunc}
          onClick={() => {
            setPatching(true)
            portfolio.description = newDescription
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
