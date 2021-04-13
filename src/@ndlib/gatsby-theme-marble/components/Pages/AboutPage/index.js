/** @jsx jsx */
import { BaseStyles, jsx, Flex, Box } from 'theme-ui'
import { useTranslation } from 'react-i18next'
import Image from '@ndlib/gatsby-theme-marble/src/components/Shared/Image'
import sniteImage from 'assets/images/02.jpg'
import rbImage from 'assets/images/03.jpg'
import archivesImage from 'assets/images/06.jpg'

const AboutPage = () => {
  const { t } = useTranslation()
  return (
    <BaseStyles>
      <div dangerouslySetInnerHTML={{ __html: t('text:aboutPage.text') }} />
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: ['100%', '33%'], px: '1rem', py: '1rem' }}>
          <h2>{t('text:aboutPage.snite.title')}</h2>
          <Image src={sniteImage} alt='' />
          <div dangerouslySetInnerHTML={{ __html: t('text:aboutPage.snite.text') }} />
        </Box>
        <Box sx={{ width: ['100%', '33%'], px: '1rem', py: '1rem' }}>
          <h2>{t('text:aboutPage.rb.title')}</h2>
          <Image src={rbImage} alt='' />
          <div dangerouslySetInnerHTML={{ __html: t('text:aboutPage.rb.text') }} />
        </Box>
        <Box sx={{ width: ['100%', '33%'], px: '1rem', py: '1rem' }}>
          <h2>{t('text:aboutPage.archives.title')}</h2>
          <Image src={archivesImage} alt='' />
          <div dangerouslySetInnerHTML={{ __html: t('text:aboutPage.archives.text') }} />
        </Box>
      </Flex>
    </BaseStyles>
  )
}

export default AboutPage
