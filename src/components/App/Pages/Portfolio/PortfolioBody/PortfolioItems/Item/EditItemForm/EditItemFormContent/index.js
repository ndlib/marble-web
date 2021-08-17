/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { savePortfolioItemQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { jsx, Heading, Button } from 'theme-ui'
import SetPortfolioImage from './SetPortfolioImage'
import sx from './sx'

export const EditItemFormContent = ({ item, closeFunc, loginReducer }) => {
  const [annotation, changeAnnotation] = useState(item.annotation)
  const [patching, changePatching] = useState(false)

  return (
    <React.Fragment>
      <div sx={{ minHeight: '425px', borderBottom: '6px solid', borderColor: 'primary' }}>
        <Heading as='h2' sx={
          { maxHeight: '2rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }
        }>{item.title}</Heading>
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
          placeholder='Add Annotation'
          disabled={patching}
          sx={sx.textArea}
          aria-label='Annotation'
        />
        <SetPortfolioImage item={item} />
      </div>
      <div sx={{ padding: '.5rem', display: 'flex', width: '100%', justifyContent: 'space-around' }}>
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
