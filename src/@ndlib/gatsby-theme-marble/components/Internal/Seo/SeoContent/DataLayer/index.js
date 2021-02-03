import PropTypes from 'prop-types'

const DataLayer = ({ title, description, author, image, url }) => {
  let dataLayer = []
  dataLayer.push({
    'name': title,
    'description': description,
    'creator': author,
    'image': image,
    'url': url,
  })
  return null
}

DataLayer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
export default DataLayer