/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import editIcon from 'assets/icons/svg/baseline-edit-24px.svg'
import sx from './sx'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

const EditButton = ({ setEditFunc }) => {
  const { isPorfolioOwner } = useUserContext()
  if (isPorfolioOwner()) {
    return (
      <button
        onClick={() => setEditFunc()}
        sx={sx.editButton}
      >
        <img
          src={editIcon}
          alt='edit'
        />
      </button>
    )
  }
  return null
}

EditButton.propTypes = {
  setEditFunc: PropTypes.func.isRequired,
}

export default EditButton
