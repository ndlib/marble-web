/** @jsx jsx */
import { jsx } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import PortfolioFeature from '../../components/App/Pages/Portfolio/PortfolioFeature'

const FeaturedPage = ({ data, location }) => {
  const { featuredJson, menusJson } = data
  return (
    <Layout
      title={featuredJson.title}
      location={location}
    >
      <Seo
        data={data}
        location={location}
        title={featuredJson.title}
        description={featuredJson.description64}
      />
      <PortfolioFeature
        location={location}
        featuredJson={featuredJson}
        menusJson={menusJson}
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
      portfolioCollectionId
      layout
      imageUri
      portfolioItems {
        items {
          updated
          annotation
          imageUri
          created
          portfolioItemId
          displayOrder
          link
          manifest
          title
        }
      }
    }
    menusJson(id: {eq: "portfolios"}) {
      id
      label
      items {
        id
        label
        link
        icon
        selectedPatterns
      }
    }
  }
`
