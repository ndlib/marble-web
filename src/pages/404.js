/** @jsx jsx */
import { jsx, Heading } from 'theme-ui'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Layout from '../components/Layout'

const NotFoundPage = ({ location }) => {
  return (
    <Layout
      title='Page Not Found'
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title='The requested page could not be found'
        description='The requested page could not be found.'
      />
      <I18nextProvider i18n={i18next}>
        <NDBrandSection location={location} sx={{ paddingBottom: '1rem' }}>
          <NDBrandBreadcrumbs
            currentPageTitle='404'
            breadcrumbs={[]}
          />
          <Heading as='h1' variant='pageTitle'>Page not found</Heading>
          <div sx={{ minHeight: '400px' }}>
            <p>We&apos;re sorry. We seem to have lost a few marbles…</p>
            <p>Perhaps you may find what you&apos;re looking for with a <Link to='/search?images[0]=true'>quick search.</Link></p>
          </div>
        </NDBrandSection>
      </I18nextProvider>
    </Layout>

  )
}

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default NotFoundPage
