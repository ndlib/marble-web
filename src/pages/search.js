/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { jsx, Button, Heading } from 'theme-ui'
import Layout from '../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import SearchBase from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchBase'
import SearchFilterBox from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchFilterBox'
import SearchResults from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchResults'
import MarbleSearchFacets from '../components/Shared/MarbleSearchFacets'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import { TagFilterConfig } from 'searchkit'
import { FaFilter, FaTimes } from 'react-icons/fa'
import SearchSortingSelector from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchSortingSelector'
const SearchPage = ({ location }) => {
  const [facetsOpen, setFacetsOpen] = useState(false)

  const keyPressHandler = (event) => {
    if (event.code === 'Escape') {
      setFacetsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler)
    return () => {
      document.removeEventListener('keydown', keyPressHandler)
    }
  })

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
            <main>
              <Heading as='h1' variant='pageTitle'>Search Results</Heading>
              <div
                className='overlay'
                sx={{
                  visibility: facetsOpen ? 'visible' : 'hidden',
                  position: 'fixed',
                  left: '14rem',
                  top: 0,
                  height: '100%',
                  width: '100%',
                  zIndex: 10,
                }}
                role='button'
                title='close filters'
                onClick={() => setFacetsOpen(!facetsOpen)}
                onKeyPress={keyPressHandler}
                tabIndex={0}
                aria-label='close filters'
              />
              <nav id='drawer' sx={{
                visibility: facetsOpen ? 'visible' : 'hidden',
                m: 0,
                p: '20px',
                position: 'fixed',
                top: '0',
                left: '0px',
                height: '100%',
                width: '14rem',
                background: 'white',
                bg: 'gray.2',
                borderLeft: '1px solid gray.4',
                boxShadow: '0 0 8px 0 rgb(0 0 0 / 25%)',
                overflowScrolling: 'touch',
                zIndex: 5,
              }}>
                <div sx={{
                  position: 'relative',
                  height: 'calc(100% - 5rem)',
                  mb: '6rem',
                  overflowX: 'hidden',
                  overflowY: 'scroll',
                  zIndex: 5,
                }}>
                  <MarbleSearchFacets />
                </div>
                <div sx={{
                  position: 'absolute',
                  zIndex: 10,
                  bottom: 0,
                  left: 0,
                  width: '14rem',
                  display: 'flex',
                  justifyContent: 'center',
                  borderTopColor: 'gray.4',
                  borderTopStyle: 'solid',
                  borderTopWidth: '1px',
                  py: '1rem',
                }}>
                  <Button
                    name='Filter'
                    sx={{
                      p: '0.5rem',
                      lineHeight: 0,
                    }}
                    title='Close Search Filter'
                    onClick={() => setFacetsOpen(!facetsOpen)}
                  ><FaTimes /></Button>
                </div>
              </nav>

              <SearchResults defaultDisplay='list' extraControls={(
                <>
                  <Button
                    sx={{
                      display: ['inline-block', 'inline-block', 'inline-block', 'none'],
                      p: '0.5rem',
                      mr: '1rem',
                      lineHeight: 0,
                    }}
                    name='Filter'
                    variant='light'
                    title='Expand Search Filter'
                    onClick={() => setFacetsOpen(!facetsOpen)}
                  ><FaFilter />
                  </Button>
                  <SearchSortingSelector />
                </>
              )} />
            </main>
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
