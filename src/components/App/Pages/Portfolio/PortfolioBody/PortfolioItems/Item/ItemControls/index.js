/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import DeleteItemButton from './DeleteItemButton'

import sx from './sx'

const ItemControls = ({ item, isOwner, setEditFunc }) => {
  if (isOwner) {
    return (
      <div sx={sx.wrapper}>
        <Button
          isOwner={isOwner}
          setEditFunc={setEditFunc}
          onClick={() => setEditFunc()}
          variant='primary'
        >Edit</Button>
        <DeleteItemButton item={item} />
      </div>
    )
  }
  return null
}

ItemControls.propTypes = {
  item: PropTypes.object.isRequired,
  isOwner: PropTypes.bool,
  setEditFunc: PropTypes.func.isRequired,
}
export default ItemControls
