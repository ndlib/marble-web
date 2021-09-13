/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Button } from 'theme-ui'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import { FaTrash } from 'react-icons/fa'

const DeleteItemButton = ({ item }) => {
  const { removePortfolioItem } = usePortfolioContext()
  const [patching, setPatching] = useState(false)
  return (
    <Button
      disabled={patching}
      onClick={() => {
        setPatching(true)
        if (window.confirm(`This action cannot be undone.`)) {
          removePortfolioItem(item)
            .then(() => {
              setPatching(false)
            })
            .catch((e) => {
              console.error(e)
              setPatching(false)
            })
        } else {
          setPatching(false)
        }
      }}
      variant='inverse'
    >
      <FaTrash sx={{ color: 'red' }} />
    </Button>
  )
}

DeleteItemButton.propTypes = {
  item: PropTypes.object.isRequired,
}

export default DeleteItemButton
