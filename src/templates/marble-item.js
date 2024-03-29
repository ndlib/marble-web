/** @jsx jsx */
import { jsx, Heading } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import queryString from 'query-string'
import Layout from '../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import CollectionLayout from '@ndlib/gatsby-theme-marble/src/components/Shared/MarbleItem/CollectionLayout'
import ItemLayout from '@ndlib/gatsby-theme-marble/src/components/Shared/MarbleItem/ItemLayout'
import RelatedItemsFromSearch from '@ndlib/gatsby-theme-marble/src/components/Shared/MarbleItem/RelatedItemsFromSearch'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs, { getBreadcrumbs } from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import ReturnToSearch from '@ndlib/gatsby-theme-marble/src/components/Shared/ReturnToSearch'
import AlertLayer from '../components/App/Layers/AlertLayer'
import AlertMessages from '@ndlib/gatsby-theme-marble/src/components/Shared/AlertMessages'
import UserAnnotation from '../components/Shared/UserAnnotation'
import typy from 'typy'

const MarbleItemPage = ({ data, location }) => {
  const { marbleItem, allMarbleFile } = data

  let breadcrumbs = null
  if (typy(location, 'state.referal.type').safeString === 'search') {
    breadcrumbs = (<ReturnToSearch location={location} />)
  } else {
    breadcrumbs = (<NDBrandBreadcrumbs
      breadcrumbs={getBreadcrumbs(marbleItem)}
      currentPageTitle={marbleItem.title}
    />)
  }
  // use ?debug=true to render graphQL data at end of page
  const { debug } = queryString.parse(location.search)
  return (
    <AlertLayer>
      <Layout
        location={location}
      >
        <Seo
          data={data}
          location={location}
        />
        <NDBrandSection variant='fullBleed'>
          {breadcrumbs}
          <main>
            <Heading as='h1' variant='pageTitle'>{marbleItem.title}</Heading>
            <UserAnnotation location={location} itemId={marbleItem.marbleId} />
            {marbleItem.display === 'collection'
              ? (
                <CollectionLayout
                  location={location}
                  marbleItem={marbleItem}
                />
              )
              : (
                <ItemLayout
                  location={location}
                  marbleItem={marbleItem}
                  allMarbleFile={allMarbleFile}
                />
              )
            }
            <RelatedItemsFromSearch marbleItem={marbleItem} />
            {debug
              ? <pre>{JSON.stringify(data, null, 2)}</pre>
              : null
            }
          </main>
        </NDBrandSection>
        <AlertMessages />
      </Layout>
    </AlertLayer>
  )
}
MarbleItemPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default MarbleItemPage

export const query = graphql`
  query($slug: String!) {
    marbleItem( slug: { eq: $slug } ) {
      id
      slug
      marbleId
      display
      title
      description
      additionalDescription
      iiifUri
      partiallyDigitized
      metadata {
        label
        urlField
        value
        type
      }
      defaultImage {
        default
        service
        thumbnail
      }
      marbleParent {
        title
        slug
        childrenMarbleItem {
          title
          slug
          defaultImage {
            default
            service
            thumbnail
          }
          childrenMarbleFile {
            fileType
            iiif {
              thumbnail
            }
          }
        }
        marbleParent {
          title
          slug
        }
      }
      childrenMarbleItem {
        title
        slug
        defaultImage {
          default
          service
          thumbnail
        }
        childrenMarbleFile {
          file
          fileType
          iiif {
            thumbnail
            service
            default
          }
        }
        description
        iiifUri
        marbleId
      }
      childrenMarbleFile {
        id
        name
        title
        file
        fileType
        iiif {
          thumbnail
          service
          default
        }
      }
      copyrightRestricted
      citation
    }
    allMarbleFile(
      filter: {marbleParent: {slug: {eq: $slug}}, fileType: {eq: "image"}}
      sort: {sequence: ASC}
      limit: 5
    ) {
      nodes {
        fileType
        sequence
        iiif {
          service
          default
          thumbnail
        }
      }
    }
  }
`
