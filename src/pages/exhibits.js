import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from 'components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import ExhibitsPage from 'components/Pages/ExhibitsPage'
import NDBrandHeroNoHeader from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Hero/NoHeader'

const Exhibits = ({ location }) => {
  return (
    <Layout
      location={location}
      pageHeader={<NDBrandHeroNoHeader location={location} />}
    >
      <Seo
        data={{}}
        location={location}
        title='Digital Exhibits'
      />
      <I18nextProvider i18n={i18next}>
        <ExhibitsPage />
      </I18nextProvider>
    </Layout>
  )
}

Exhibits.propTypes = {
  location: PropTypes.object.isRequired,
}
export default Exhibits
