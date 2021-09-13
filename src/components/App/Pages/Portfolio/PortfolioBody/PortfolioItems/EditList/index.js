/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { useState } from 'react'
import PropTypes from 'prop-types'
import SortableList from 'react-sortable-dnd-list'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import SortableItem from './SortableItem'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'

const EditList = ({ items, closeFunc }) => {
  const { reorderPortfolio } = usePortfolioContext()
  const [sortedItems, setItems] = useState(items)
  const [saving, setSaving] = useState(false)

  if (saving) {
    return (
      <Loading />
    )
  }
  return (
    <div sx={sx.wrapper}>
      <div sx={sx.controls}>
        <Button
          onClick={() => closeFunc()}
          variant='light'
        >Cancel
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            setSaving(true)
            reorderPortfolio(sortedItems)
              .then(() => {
                setSaving(false)
                closeFunc()
              })
          }}
        >Save
        </Button>
      </div>
      <SortableList
        className='list'
        itemComponent={SortableItem}
        value={sortedItems}
        onChange={result => {
          setItems(result)
        }}
      />
    </div>
  )
}

EditList.propTypes = {
  items: PropTypes.array,
  closeFunc: PropTypes.func.isRequired,
}

export default EditList
