import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const DataLayer = ({ title, description, author, image, url }) => {
  window.dataLayer = window.dataLayer || []
  return (
    <Helmet>
      {
        window.dataLayer.push({
          'name': title,
          'description': description,
          'creator': author,
          'image': image,
          'url': url,
        })
      }
    </Helmet>
  )
}

DataLayer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
export default DataLayer