/** @jsx jsx */
import { jsx, Heading, Text } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import CardGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/CardGroup'
import Card from '@ndlib/gatsby-theme-marble/src/components/Shared/Card'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import typy from 'typy'
import { DISPLAY_LIST } from '@ndlib/gatsby-theme-marble/src/store/actions/displayActions'

export const FeaturedList = ({ data, location }) => {
  const { allFeaturedJson, menusJson } = data
  const menu = typy(menusJson, 'items').safeArray
  const { nodes } = allFeaturedJson
  const browseLinks = nodes.map(item => {
    return (<Card
      key={item.marbleId}
      label={item.title}
      image={item.image}
      target={'/featured/' + item.slug}
    ><Html html={item.description} /></Card>)
  })
  return (
    <Layout
      location={location}
    >
      <Seo
        data={data}
        location={location}
        title='Featured Porfolios'
      />
      <NDBrandSectionLeftNav>
        <NDBrandSection variant='sidebar'>
          <Menu location={location} variant='navLeft' items={menu} label={menusJson.label} />
        </NDBrandSection>
        <NDBrandSection variant='defaultWithSidebar'>
          <NDBrandBreadcrumbs
            currentPageTitle='Featured Portfolios'
            breadcrumbs={[]}
          />
          <Heading as='h1' variant='pageTitle'>Featured Portfolios</Heading>
          <p>
            These portfolios have been created by members of the University of Notre Dame community and nominated by members of the Hesburgh Libraries and the Snite Museum of Art to be featured for inspiration and scholarly exploration.
          </p>
          <Link to='/portfolios-about'>Learn more about creating portfolios</Link>

          <CardGroup defaultDisplay={DISPLAY_LIST} toggleGroup='browse-page'>
            {browseLinks}
          </CardGroup>
        </NDBrandSection>
      </NDBrandSectionLeftNav>
    </Layout>

  )
}
FeaturedList.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default FeaturedList

export const query = graphql`
  query {
    allFeaturedJson {
      nodes {
        id
        image
        slug
        title
        description
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
