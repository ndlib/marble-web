/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import TextField from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextField'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'
import { savePortfolioCollectionQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import sx from './sx'

// eslint-disable-next-line complexity
const TitleEdit = ({ closeFunc, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
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
      <TextField
        id='portfolioName'
        defaultValue={newTitle}
        onChange={(event) => {
          setValid(event.target.value !== '')
          setNewTitle(event.target.value)
        }}
        label='Title'
        hideLabel
        disabled={patching}
        inputSx={sx.input}
        wrapperSx={sx.inputWrapper}
        autoFocus
      />
      <span sx={sx.buttonWrapper}>
        <SaveOrCancelButtons
          closeFunc={closeFunc}
          patching={patching}
          onClick={() => {
            setPatching(true)
            portfolio.title = newTitle
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
  loginReducer: PropTypes.func.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(TitleEdit)
