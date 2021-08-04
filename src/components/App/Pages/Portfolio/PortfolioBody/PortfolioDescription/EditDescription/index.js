/** @jsx jsx */
import { useState } from 'react'
import { connect } from 'react-redux'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import { savePortfolioCollectionQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'
import sx from './sx'

const EditDescription = ({ closeFunc, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
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
          onClick={() => {
            setPatching(true)
            portfolio.description = newDescription
            savePortfolioCollectionQuery({ portfolio: portfolio, loginReducer: loginReducer })
              .then((result) => {
                updatePortfolio(result)
                setPatching(false)
                closeFunc()
              })
              .catch((e) => {
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
  loginReducer: PropTypes.func.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(EditDescription)
