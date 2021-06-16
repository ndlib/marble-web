/** @jsx jsx */
import { jsx, Heading } from 'theme-ui'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Layout from '../../../Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import FeedbackForm from '../../../Shared/FeedbackForm'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import typy from 'typy'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
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

      <NDBrandSectionLeftNav location={location}>
        <NDBrandSection variant='sidebar'>
          <Menu items={menu} variant='navLeft' />
        </NDBrandSection>

        <NDBrandSection location={location} variant='fullBleedWithSidebar'>
          <NDBrandBreadcrumbs
            currentPageTitle={t(`text:helpPage.${page}.title`)}
            breadcrumbs={[
              { url: '/help', title: 'Help' },
            ]}
          />

          <Heading as='h1' variant='pageTitle'>{t(`text:helpPage.${page}.title`)}</Heading>

          <Html html={t(`text:helpPage.${page}.text`)} />
          {feedbackForm}
        </NDBrandSection>
      </NDBrandSectionLeftNav>
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
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
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
