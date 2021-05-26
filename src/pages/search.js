/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Box } from 'theme-ui'
import Layout from '../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import SearchBase from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchBase'
import SearchFilterBox from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchFilterBox'
import SearchResults from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchResults'
import SearchRefinementListFilter from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchRefinementListFilter'
import { TagFilterConfig } from 'searchkit'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

const SearchPage = ({ location }) => {
  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
      />
      <SearchBase>

        <NDBrandSectionLeftNav location={location}>
          <NDBrandSection location={location} variant='sidebar'>
            <TagFilterConfig field='creator.keyword' title='Creator' id='creator' />
            <TagFilterConfig field='collection.keyword' title='Collection' id='collection' />

            <SearchRefinementListFilter
              field='centuryTag.keyword'
              label='Time Period'
              operator='OR'
              sort='a-z'
            />
            <SearchRefinementListFilter
              field='repository.keyword'
              label='Campus Location'
              operator='OR'
            />
            <SearchRefinementListFilter
              field='formatTag.keyword'
              label='Format'
              operator='OR'
            />
            <SearchRefinementListFilter
              field='themeTag.keyword'
              label='Keywords'
              operator='OR'
              sort='default'
              size='10'
            />
            <SearchRefinementListFilter
              field='language.keyword'
              label='Language'
              operator='OR'
              sort='default'
              size='4'
            />
          </NDBrandSection>
          <NDBrandSection location={location} variant='fullBleedWithSidebar'>

            <NDBrandBreadcrumbs
              currentPageTitle='Search'
              breadcrumbs={[]}
            />
            <SearchFilterBox />

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
