import React from 'react'
import PropTypes from 'prop-types'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from '../components/Layout'
import StatsPage from '../components/Pages/StatsPage'

const Stats = ({ location }) => {
  return (
    <Layout location={location}>
      <I18nextProvider i18n={i18next}>
        <StatsPage location={location} />
      </I18nextProvider>
    </Layout>
  )
}

Stats.propTypes = {
  location: PropTypes.object.isRequired,
}
export default Stats
