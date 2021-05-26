/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import DeleteItemButton from './DeleteItemButton'
import MaterialButton from 'components/Shared/MaterialButton'

import sx from './sx'

const ItemControls = ({ item, isOwner, setEditFunc }) => {
  if (isOwner) {
    return (
      <div sx={sx.wrapper}>
        <MaterialButton
          isOwner={isOwner}
          setEditFunc={setEditFunc}
          onClick={() => setEditFunc()}
          primary
        >Edit</MaterialButton>
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
