/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import { jsx, Heading } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

export const AllPage = ({
  data,
  location,
}) => {
  const items = () => data.allMarbleItem.edges
    .sort((a, b) => {
      const cleanA = cleanString(a.node.title)
      const cleanB = cleanString(b.node.title)
      if (cleanA < cleanB) {
        return -1
      }
      if (cleanA > cleanB) {
        return 1
      }
      return 0
    })
    .map(edge => {
      return (
        <li key={edge.node.slug}>
          <Link
            to={`${edge.node.slug}`}
          >
            {edge.node.title}
          </Link>
          <span>&nbsp;</span>
        </li>
      )
    })

  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title='Sitemap'
      />
      {
      <React.Fragment>
        <NDBrandBreadcrumbs
        currentPageTitle='Sitemap'
        breadcrumbs={[]}
        />
        <main id='mainContent'>
          <Heading as='h1' variant='pageTitle'>Sitemap</Heading>
        </main>
      </React.Fragment>
      }
      <ul>{items()}</ul>
      {
        // Todo add other kinds of pages???
      }
    </Layout>
  )
}

AllPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
}

export default AllPage
export const query = graphql`
  query {
    allMarbleItem {
      edges {
        node {
          slug
          title
          display
        }
      }
    }
  }
`

const cleanString = (myString) => {
  const regex = /[[\]"'`()_\-.…,¡!:;*&$@~]/g
  return myString
    .toLowerCase()
    .replace(regex, ' ')
    .trim()
}
