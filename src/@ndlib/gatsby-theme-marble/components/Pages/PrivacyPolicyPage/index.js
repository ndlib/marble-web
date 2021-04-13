/** @jsx jsx */
import { BaseStyles, jsx, Flex, Box } from 'theme-ui'
import { useTranslation } from 'react-i18next'

const PrivacyPolicyPage = () => {
  const { t } = useTranslation()
  return (
    <BaseStyles>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: '100%', px: '1rem', py: '1rem' }}>
          <h2>{t('text:privacyPolicyPage.title')}</h2>
          <div dangerouslySetInnerHTML={{ __html: t('text:privacyPolicyPage.text') }} />
        </Box>
      </Flex>
    </BaseStyles>
  )
}

export default PrivacyPolicyPage
