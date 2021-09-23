/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import * as style from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/style.module.css'
import TextArea from '@ndlib/gatsby-theme-marble/src/components/Shared/FormElements/TextArea'
import { jsx, Heading, Button } from 'theme-ui'
import SetPortfolioImage from './SetPortfolioImage'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'

export const EditItemFormContent = ({ item, closeFunc }) => {
  const { updatePortfolioItem } = usePortfolioContext()
  const [annotation, changeAnnotation] = useState(item.annotation)
  const [patching, changePatching] = useState(false)

  return (
    <React.Fragment>
      <div className={style.buttonGroup} sx={{ mb: '1em' }}>
        <Button
          variant='primary'
          onClick={
            (e) => {
              e.preventDefault()
              changePatching(true)
              item.annotation = annotation
              updatePortfolioItem(item).then((data) => {
                closeFunc(data)
                changePatching(false)
              })
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
}

export default EditItemFormContent
