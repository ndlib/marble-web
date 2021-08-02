/** @jsx jsx */
import { Heading, jsx, Flex, Box } from 'theme-ui'
import { useTranslation } from 'react-i18next'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

const PrivacyPolicyPage = () => {
  const { t } = useTranslation()
  return (
    <NDBrandSection variant='fullBleed' sx={{ '& div.sectionContent': { maxWidth: 'inherit', minWidth: '90vw' } }}>
      <NDBrandBreadcrumbs
        currentPageTitle={t('text:privacyPolicyPage.title')}
        breadcrumbs={[]}
      />
      <main>
        <Heading as='h1' variant='pageTitle'>{t('text:privacyPolicyPage.title')}</Heading>
        <Flex sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ width: '100%', px: '1rem', py: '1rem' }}>
            <Html html={t('text:privacyPolicyPage.text')} />
          </Box>
        </Flex>
      </main>
    </NDBrandSection>
  )
}

export default PrivacyPolicyPage
