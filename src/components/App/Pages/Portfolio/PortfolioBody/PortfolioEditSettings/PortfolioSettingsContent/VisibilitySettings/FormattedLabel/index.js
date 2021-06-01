/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import PropTypes from 'prop-types'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'

export const FormattedLabel = ({ value, description }) => {
  return (
    <React.Fragment>
      <span
        className='visibilityLabel'
        sx={{
          display: 'inline-block',
          width: '90px',
        }}>
        <VisibilityLabel visibility={value} />
      </span>
      <span
        className='description'
        sx={{
          display: 'inline-block',
          padding: '0 0 0 2rem,',
          verticalAlign: 'top',
          width: 'calc(100% - 90px)',
        }}>
        {description}
      </span>
    </React.Fragment>
  )
}

FormattedLabel.propTypes = {
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default FormattedLabel
