/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'

const EditUserButton = ({ userName }) => {
  const { t } = useTranslation()
  return (
    <Button
      onClick={() => navigate(`/user/${userName}/edit`)}
      variant='inverse'
      title='Edit my portfolio'
    >Edit Bio
    </Button>
  )
}

EditUserButton.propTypes = {
  userName: PropTypes.string.isRequired,
}
export default EditUserButton
