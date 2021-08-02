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
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import ReturnToSearch from '@ndlib/gatsby-theme-marble/src/components/Shared/ReturnToSearch'
import UserAnnotation from '@ndlib/gatsby-theme-marble/src/components/Shared/UserAnnotation'
import { useTranslation } from 'react-i18next'
import typy from 'typy'

export const MarbleItemPage = ({ data, location }) => {
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
          {
            marbleItem.display === 'collection' ? (
              <CollectionLayout
                location={location}
                marbleItem={marbleItem}
              />
            ) : (
              <ItemLayout
                location={location}
                marbleItem={marbleItem}
                allMarbleFile={allMarbleFile}
              />
            )
          }
          <RelatedItemsFromSearch marbleItem={marbleItem} />
          <UserAnnotation location={location} />

          {
            debug ? (
              <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : null
          }
        </main>
      </NDBrandSection>
    </Layout>

  )
}
MarbleItemPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default MarbleItemPage

const getBreadcrumbs = (item, breadcrumbs = []) => {
  if (item.marbleParent) {
    getBreadcrumbs(item.marbleParent, breadcrumbs)
    breadcrumbs.push({
      url: item.marbleParent.slug,
      title: item.marbleParent.title,
    })
  }
  return breadcrumbs
}

export const query = graphql`
  query($slug: String!) {
    marbleItem( slug: { eq: $slug } ) {
      id
      slug
      marbleId
      display
      title
      description
      iiifUri
      partiallyDigitized
      metadata {
        label
        urlField
        value
        type
      }
      marbleParent {
        title
        slug
        childrenMarbleItem {
          title
          slug
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
      filter: {marbleParent: {slug: {eq: $slug}}, fileType: {eq: "image"}},
      sort: {fields: sequence, order: ASC},
      limit: 6
    ) {
      nodes {
        fileType
        sequence
        iiif {
          service
          default
          thumbnail
        }
        local {
          publicURL
          childImageSharp {
            fixed(width: 125, height: 125) {
              src
            }
          }
        }
      }
    }
  }
`
