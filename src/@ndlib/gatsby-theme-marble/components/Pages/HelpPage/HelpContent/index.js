/** @jsx jsx */
import { jsx, Flex, Box, Heading } from 'theme-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Layout from 'components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import FeedbackForm from '@ndlib/gatsby-theme-marble/src/components/Shared/FeedbackForm'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import typy from 'typy'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'

export const menuQuery = graphql`
query {
  menusJson(id: {eq: "help"}) {
    id
    label
    items {
      id
      label
      link
    }
  }
}
`

const HelpContent = ({ location }) => {
  const { menusJson } = useStaticQuery(menuQuery)
  const menu = typy(menusJson, 'items').safeArray
  const { t } = useTranslation()
  const page = getPageName(location)
  const feedbackForm = page === 'contactUs' ? (<FeedbackForm closeFunc={() => navigate(`/help`)} />) : null

  return (
    <Layout
      title={t(`text:helpPage.${page}.title`)}
      location={location}
    >
      <Seo
        data={{}}
        location={location}
      />
      <NDBrandSection location={location} variant='fullBleed'>
        <NDBrandBreadcrumbs
          currentPageTitle={t(`text:helpPage.${page}.title`)}
          breadcrumbs={[
            { url: '/help', title: 'Help' },
          ]}
        />

        <Heading as='h1' variant='pageTitle'>{t(`text:helpPage.${page}.title`)}</Heading>
        <Flex sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ width: ['100%', '20%'], px: '1rem', py: '1rem' }}>
            <Menu items={menu} variant='help' />
          </Box>
          <Box sx={{ width: ['100%', '80%'], px: '1rem', py: '1rem' }}>
            <Html html={t(`text:helpPage.${page}.text`)} />
            {feedbackForm}
          </Box>
        </Flex>
      </NDBrandSection>
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
