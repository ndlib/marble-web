/** @jsx jsx */
import { BaseStyles, jsx, Flex, Box } from 'theme-ui'
import { useTranslation } from 'react-i18next'

const DisclaimerPage = () => {
  const { t } = useTranslation()
  return (
    <BaseStyles>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: '100%', px: '1rem', py: '1rem' }}>
          <h2>{t('text:disclaimerPage.title')}</h2>
          <div dangerouslySetInnerHTML={{ __html: t('text:disclaimerPage.text') }} />
        </Box>
      </Flex>
    </BaseStyles>
  )
}

export default DisclaimerPage
