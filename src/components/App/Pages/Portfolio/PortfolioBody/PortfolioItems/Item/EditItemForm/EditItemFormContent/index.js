/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { savePortfolioItemQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'

import * as style from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/style.module.css'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import { jsx, Heading, Button } from 'theme-ui'
import SetPortfolioImage from './SetPortfolioImage'

export const EditItemFormContent = ({ item, closeFunc, loginReducer }) => {
  const [annotation, changeAnnotation] = useState(item.annotation)
  const [patching, changePatching] = useState(false)

  return (
    <React.Fragment>
      <div className={style.buttonGroup} sx={{ mb: '1em' }}>
        <Button
          onClick={() => closeFunc()}
          variant='light'
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={
            (e) => {
              e.preventDefault()
              updateItem(e, loginReducer, item, annotation, changePatching, closeFunc)
            }
          }>
        Save
        </Button>
        <Button
          onClick={() => closeFunc()}
          variant='inverse'
        >
          Cancel
        </Button>
      </div>
      <Heading as='h2'>{item.title}</Heading>
      <TextArea
        id={`${item.uuid}_annotation`}
        defaultValue={annotation}
        onChange={(event) => {
          changeAnnotation(event.target.value)
        }}
        disabled={patching}
        label='Annotation'
        hideLabel
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

const updateItem = (event, loginReducer, item, annotation, patchingFunc, closeFunc) => {
  patchingFunc(true)
  item.annotation = annotation
  closeFunc(event)
  savePortfolioItemQuery({ loginReducer: loginReducer, item: item })
    .then((event) => {
      closeFunc(event)
    })
    .catch((e) => {
      console.error(e)
    })
}
