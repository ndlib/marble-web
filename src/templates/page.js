/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Heading } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

const Page = ({ data, location }) => {
  const { markdownRemark } = data

  return (
    <Layout
      title='Learn'
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title={markdownRemark.frontmatter.title}
      />
      <NDBrandSection variant='default'>
        <NDBrandBreadcrumbs
          currentPageTitle={markdownRemark.frontmatter.title}
          breadcrumbs={[]}
        />
        <main>
          <Heading as='h1' variant='pageTitle'>{markdownRemark.frontmatter.title}</Heading>
          <Html html={markdownRemark.html} />
        </main>
      </NDBrandSection>
    </Layout>

  )
}

Page.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}
export default Page

export const query = graphql`
  query($id: String!, $menu: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        slug
        menu
      }
    }
    menusJson(id: {eq: $menu}) {
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
