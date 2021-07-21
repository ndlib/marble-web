/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import sx from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionButtonGroup/DownloadButton/DownloadModalContent/Copyright/sx'
import { useTranslation } from 'react-i18next'

export const Copyright = () => {
  const { t } = useTranslation()
  return (
    <div sx={sx.wrapper}>
      <Link to='/policies'>{t('text:actionGroup.copyright-link')}</Link>.
    </div>
  )
}

export default Copyright
