/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'
import { patchData, getData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import style from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/style.module.css'
import { BaseStyles, jsx } from 'theme-ui'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import SetPortfolioImage from './SetPortfolioImage'
import sx from './sx'

export const EditItemFormContent = ({ item, closeFunc, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const [annotation, changeAnnotation] = useState(item.annotation)
  const [patching, changePatching] = useState(false)

  const callBack = () => {
    getData({
      loginReducer: loginReducer,
      contentType: 'collection',
      id: portfolio.uuid,
      successFunc: (data) => {
        updatePortfolio(data)
        closeFunc()
      },
      errorFunc: (e) => {
        console.error(e)
      },
    })
  }
  return (
    <React.Fragment>
      <div className={style.buttonGroup}>
        <MaterialButton onClick={() => closeFunc()}>
          Cancel
        </MaterialButton>
        <MaterialButton
          primary
          onClick={
            (e) => {
              e.preventDefault()
              const body = {
                uuid: item.uuid,
                annotation: annotation || '',
              }
              updateItem(e, loginReducer, body, changePatching, callBack)
            }
          }>
          Save
        </MaterialButton>
      </div>
      <BaseStyles>
        <h2>{item.title}</h2>
      </BaseStyles>
      <label
        htmlFor='annotation'
        className='accessibilityOnly'
      >Annotation
      </label>
      <textarea
        id='annotation'
        defaultValue={annotation}
        onChange={(event) => {
          changeAnnotation(event.target.value)
        }}
        disabled={patching}
        sx={sx.textArea}
        aria-label='Annotation'
      />
      <SetPortfolioImage item={item} />
    </React.Fragment>
  )
}
EditItemFormContent.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    annotation: PropTypes.string,
    image: PropTypes.string,
    manifest: PropTypes.string,
    link: PropTypes.string,
    uuid: PropTypes.string,
  }),
  closeFunc: PropTypes.func.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(EditItemFormContent)

const updateItem = (event, loginReducer, body, patchingFunc, closeFunc) => {
  patchingFunc(true)
  patchData({
    loginReducer: loginReducer,
    contentType: 'item',
    id: body.uuid,
    body: body,
    successFunc: (event) => {
      closeFunc(event)
    },
    errorFunc: (e) => {
      console.error(e)
    },
  })
}
