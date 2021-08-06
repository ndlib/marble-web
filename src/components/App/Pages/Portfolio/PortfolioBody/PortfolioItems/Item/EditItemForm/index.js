/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import EditItemFormContent from './EditItemFormContent'

export const EditItemForm = ({ item, closeFunc }) => {
  return (
    <div sx={{
      backgroundColor: 'background',
      margin: '0',
      width: '100%',
    }}>
      <EditItemFormContent
        item={item}
        closeFunc={closeFunc}
      />
    </div>
  )
}
EditItemForm.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
}

export default EditItemForm
