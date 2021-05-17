/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from 'components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import BrowsePage from 'components/Pages/BrowsePage'
import NDBrandHeroNoHeader from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Hero/NoHeader'

const Browse = ({ location }) => {
  return (
    <Layout
      location={location}
      pageHeader={<NDBrandHeroNoHeader location={location} />}
    >
      <Seo
        data={{}}
        location={location}
        title='Browse'
      />
      <I18nextProvider i18n={i18next}>
        <BrowsePage location={location} />
      </I18nextProvider>
    </Layout>
  )
}

Browse.propTypes = {
  location: PropTypes.object.isRequired,
}
export default Browse
