import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from 'components/Layout'
import Seo from 'components/Shared/Seo'
import gPage from 'components/Pages/PrivacyPolicyPage'

const PrivacyPolicy = ({ location }) => {
  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title='Digital Exhibits'
      />
      <I18nextProvider i18n={i18next}>
        <PrivacyPolicyPage />
      </I18nextProvider>
    </Layout>
  )
}

PrivacyPolicy.propTypes = {
  location: PropTypes.object.isRequired,
}
export default PrivacyPolicy