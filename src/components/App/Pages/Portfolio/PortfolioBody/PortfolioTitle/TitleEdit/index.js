/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import TextField from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextField'
import SaveOrCancelButtons from '../../SaveOrCancelButtons'
import sx from './sx'

// eslint-disable-next-line complexity
export const TitleEdit = ({ closeFunc }) => {
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
