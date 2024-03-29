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
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import typy from 'typy'
import ReactMarkdown from 'react-markdown'
import { decode } from 'js-base64'
import { DISPLAY_LIST } from '@ndlib/gatsby-theme-marble/src/store/actions/displayActions'

const FeaturedList = ({ data, location }) => {
  const { appSync, menusJson } = data
  const items = typy(appSync, 'listPublicFeaturedPortfolioCollections.items').safeArray.sort((a, b) => {
    // sort with most recently modified first
    return new Date(a.dateModifiedInDynamo).getTime() - new Date(b.dateModifiedInDynamo).getTime()
  })
  const menu = typy(menusJson, 'items').safeArray
  const browseLinks = items.map(item => {
    // Look for spaces between parentheses and replace them with %20
    const fixSpacesRegExp = /\s+(?=[^()]*\))/gm
    const fixEndLinesRegExp = /\\\n/gm
    return (
      <DisplayCard
        key={item.portfolioCollectionId}
        title={decodeURIComponent(item.title)}
        image={item.imageUri}
        target={'/user/' + item.portfolioUserId + '/' + item.portfolioCollectionId}
      >
        <ReactMarkdown
          sx={{
            whiteSpace: 'break-space',
            '& p': {
              margin: '0',
            },
            '& h1, & h2, & h3': {
              fontFamily: 'body',
              fontSize: '1rem',
              fontWeight: 'normal',
              margin: '0',
              color: 'black',
            },
          }}
          allowedElements={['h1', 'h2', 'h3', 'p']}
          unwrapDisallowed={true}
        >
          {decode(item.description64).replace(fixSpacesRegExp, '%20').replace(fixEndLinesRegExp, '\n')}
        </ReactMarkdown>
      </DisplayCard>)
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
    appSync {
      listPublicFeaturedPortfolioCollections {
        items {
          portfolioCollectionId
          portfolioUserId
          dateAddedToDynamo
          dateModifiedInDynamo
          description64
          imageUri
          title
        }
      }
    }
    menusJson(menuId: {eq: "portfolios"}) {
      menuId
      label
      items {
        menuId
        label
        link
        icon
        selectedPatterns
      }
    }
  }
`
