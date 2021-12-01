/** @jsx jsx */
import { jsx, Heading } from 'theme-ui'
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
import CardGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard/CardGroup'
import DisplayCard from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import typy from 'typy'
import { DISPLAY_LIST } from '@ndlib/gatsby-theme-marble/src/store/actions/displayActions'

const FeaturedList = ({ data, location }) => {
  const { allFeaturedJson, menusJson } = data
  const menu = typy(menusJson, 'items').safeArray
  const { nodes } = allFeaturedJson
  const browseLinks = nodes.map(item => {
    return (<DisplayCard
      key={item.marbleId}
      title={item.title}
      image={item.imageUri}
      target={'/featured/' + item.slug}
    ><Html html={item.description} /></DisplayCard>)
  })
  return (
    <Layout
      location={location}
    >
      <Seo
        data={data}
        location={location}
        title='Featured Portfolios'
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
          <main>
            <Heading as='h1' variant='pageTitle'>Featured Portfolios</Heading>
            <p>
              These portfolios have been created by members of the University of Notre Dame community and nominated by members of the Hesburgh Libraries and the Snite Museum of Art to be featured for inspiration and scholarly exploration.
            </p>
            <Link to='/portfolios-about'>Learn more about creating portfolios</Link>

            <CardGroup
              defaultDisplay={DISPLAY_LIST}
              toggleGroup='browse-page'
              gridWidthRule={['100%', '100%', '100%', '100%', '50%']}
            >
              {browseLinks}
            </CardGroup>
          </main>
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
        imageUri
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
