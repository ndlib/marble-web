/** @jsx jsx */
import { jsx, Button} from 'theme-ui'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'

export const LogOut = () => {
  const { t } = useTranslation()
  return (
    <p>
      <Button
        id='okta'
        onClick={() => {
          navigate('/user/logout')
        }}
        variant='primary'

      >
        {t('common:loginMenu.logout')}
      </Button>
    </p>
  )
}

export default LogOut
