/** @jsx jsx */
import { jsx } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import PortfolioFeature from '../../components/App/Pages/Portfolio/PortfolioFeature'

export const FeaturedPage = ({ data, location }) => {
  const { featuredJson } = data
  return (
    <Layout
      title={featuredJson.title}
      location={location}
    >
      <Seo
        data={data}
        location={location}
        title={featuredJson.title}
        description={featuredJson.description}
      />
      <PortfolioFeature
        location={location}
        featuredJson={featuredJson}
      />
    </Layout>

  )
}
FeaturedPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default FeaturedPage

export const query = graphql`
  query($slug: String!) {
    featuredJson( slug: { eq: $slug } ) {
      id
      title
      description
      uuid
      image
      items {
        updated
        annotation
        image
        created
        uuid
        displayOrder
        link
        manifest
        title
      }
    }
  }
`
