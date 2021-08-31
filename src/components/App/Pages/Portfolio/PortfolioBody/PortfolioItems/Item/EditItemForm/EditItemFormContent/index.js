/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { patchData, getData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import * as style from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/style.module.css'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import { jsx, Heading, Button } from 'theme-ui'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import SetPortfolioImage from './SetPortfolioImage'

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
              const body = {
                uuid: item.uuid,
                annotation: annotation || '',
              }
              updateItem(e, loginReducer, body, changePatching, callBack)
            }
          }>
          Save
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
