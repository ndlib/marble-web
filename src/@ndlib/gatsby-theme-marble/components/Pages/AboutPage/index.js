/** @jsx jsx */
import { Heading, jsx, Flex, Box } from 'theme-ui'
import { useTranslation } from 'react-i18next'
import Image from '@ndlib/gatsby-theme-marble/src/components/Shared/Image'
import sniteImage from 'assets/images/02.jpg'
import rbImage from 'assets/images/03.jpg'
import archivesImage from 'assets/images/06.jpg'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'

const AboutPage = ({ location }) => {
  const { t } = useTranslation()
  return (
    <NDBrandSection location={location} variant='fullBleed' sx={{ '& div.sectionContent': { maxWidth: 'inherit', minWidth: '90vw' } }}>
      <NDBrandBreadcrumbs
        currentPageTitle='About'
        breadcrumbs={[]}
      />

      <Heading as='h1' variant='pageTitle'>About</Heading>
      <Html html={t('text:aboutPage.text')} />

      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', '33%'], px: '1rem', py: '1rem' }}>
          <h2>{t('text:aboutPage.snite.title')}</h2>
          <Image src={sniteImage} alt='' />
          <Html html={t('text:aboutPage.snite.text')} />
        </Box>
        <Box sx={{ width: ['100%', '33%'], px: '1rem', py: '1rem' }}>
          <h2>{t('text:aboutPage.rb.title')}</h2>
          <Image src={rbImage} alt='' />
          <Html html={t('text:aboutPage.rb.text')} />
        </Box>
        <Box sx={{ width: ['100%', '33%'], px: '1rem', py: '1rem' }}>
          <h2>{t('text:aboutPage.archives.title')}</h2>
          <Image src={archivesImage} alt='' />
          <Html html={t('text:aboutPage.archives.text')} />
        </Box>
      </Flex>
    </NDBrandSection>
  )
}

export default AboutPage
