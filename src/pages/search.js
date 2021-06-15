/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Button } from 'theme-ui'
import Layout from '../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import SearchBase from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchBase'
import SearchFilterBox from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchFilterBox'
import SearchResults from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchResults'
import MarbleSearchFacets from '../components/Shared/MarbleSearchFacets'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import ActionModal from '@ndlib/gatsby-theme-marble/src/components/Shared/ActionModal'
import { TagFilterConfig } from 'searchkit'

const SearchPage = ({ location }) => {
  const [facectsOpen, setFacectsOpen] = useState(false)

  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
      />
      <SearchBase>
        <TagFilterConfig field='creator.keyword' title='Creator' id='creator' />
        <TagFilterConfig field='collection.keyword' title='Collection' id='collection' />

        <div id='marble-facet-modal' />
        <div id='marble-facet-content' />

        <NDBrandSectionLeftNav location={location}>
          <NDBrandSection location={location} variant='sidebar'>

            <MarbleSearchFacets />

          </NDBrandSection>
          <NDBrandSection location={location} variant='fullBleedWithSidebar'>
            <NDBrandBreadcrumbs
              currentPageTitle='Search'
              breadcrumbs={[]}
            />
            <SearchFilterBox />
            <Button
              name='Filter'
              onClick={() => setFacectsOpen(!facectsOpen)}
            >Filter</Button>
            <div
              className='overlay'
              sx={{
                display: facectsOpen ? 'block' : 'none',
                position: 'fixed',
                left: '14rem',
                top: 0,
                height: '100%',
                width: '100%',
                zIndex: 10,
              }}
              role='button'
              title='close filters'
              onClick={() => setFacectsOpen(!facectsOpen)}
            />
            <nav id='drawer' sx={{
              display: facectsOpen ? 'block' : 'none',
              m: 0,
              p: '20px',
              position: 'fixed',
              top: '0',
              left: '0px',
              height: '100%',
              width: '14rem',
              background: 'white',
              overflowX: 'hidden',
              overflowY: 'scroll',
              bg: 'gray.2',
              borderLeft: '1px solid gray.4',
              boxShadow: '0 0 8px 0 rgb(0 0 0 / 25%)',
              overflowScrolling: 'touch',
              zIndex: 10,
            }}>
              <MarbleSearchFacets />
              <div>
                <Button
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                  }}
                  name='Filter'
                  onClick={() => setFacectsOpen(!facectsOpen)}
                >Close</Button>
              </div>
            </nav>

            <SearchResults defaultDisplay='list' />

          </NDBrandSection>
        </NDBrandSectionLeftNav>
      </SearchBase>
    </Layout>
  )
}

SearchPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default SearchPage
