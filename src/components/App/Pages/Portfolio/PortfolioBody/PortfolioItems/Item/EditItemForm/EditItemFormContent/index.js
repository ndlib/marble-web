/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { savePortfolioItemQuery } from '../../../../../../../../utils/portfolioQueries'
import { jsx, Heading, Button } from 'theme-ui'
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
  console.log('event', event)
  console.log('body', item)
  console.log('query', savePortfolioItemQuery(item))
  closeFunc(event)

  getData({
    loginReducer: loginReducer,
    contentType: 'item',
    // id: collection.uuid,
    body: savePortfolioItemQuery(item),
    successFunc: (event) => {
      closeFunc(event)
    },
    errorFunc: (e) => {
      console.error(e)
    },
  })
}
