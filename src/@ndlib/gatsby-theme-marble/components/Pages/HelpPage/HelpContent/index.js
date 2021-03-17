/** @jsx jsx */
import { jsx, BaseStyles, Flex, Box } from 'theme-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Layout from 'components/Layout'
import Seo from 'components/Shared/Seo'
import Menu from 'components/Shared/Menu'
import FeedbackForm from 'components/Shared/FeedbackForm'
import { navigate } from 'gatsby'

const HelpContent = ({ location }) => {
  const { t } = useTranslation()
  const page = getPageName(location)
  const feedbackForm = page === 'contactUs' ? (
    <FeedbackForm closeFunc={() => navigate(`/help`)} />) : null
  return (
    <Layout
      title={t(`text:helpPage.${page}.title`)}
      location={location}
    >
      <Seo
        data={{}}
        location={location}
      />
      <BaseStyles>
        <Flex sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ width: ['100%', '20%'], px: '1rem', py: '1rem' }}>
            <Menu navClass='verticalMenu' menu='help' />
          </Box>
          <Box sx={{ width: ['100%', '80%'], px: '1rem', py: '1rem' }}>
            <div dangerouslySetInnerHTML={{ __html: t(`text:helpPage.${page}.text`) }} />
            {feedbackForm}
          </Box>
        </Flex>
      </BaseStyles>
    </Layout>
  )
}

HelpContent.propTypes = {
  location: PropTypes.object.isRequired,
}
export default HelpContent

export const getPageName = (location) => {
  let pathname = location.pathname
  if (pathname[0] === '/') {
    pathname = pathname.slice(1)
  }
  if (pathname.startsWith('help/')) {
    pathname = pathname
      .replace('help/', '')
      .toLowerCase()
      .replace(/-(.)/g, (match, group1) => {
        return group1.toUpperCase()
      })
  } else {
    pathname = 'index'
  }
  return pathname
}
