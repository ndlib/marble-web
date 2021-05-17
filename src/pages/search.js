/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Box } from 'theme-ui'
import Layout from 'components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import SearchBase from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchBase'
import SearchFilterBox from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchFilterBox'
import SearchResults from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchResults'
import SearchRefinementListFilter from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchRefinementListFilter'
import { TagFilterConfig } from 'searchkit'
import NDBrandHeroNoHeader from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Hero/NoHeader'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/breadcrumbs'

const SearchPage = ({ location }) => {
  return (
    <Layout
      location={location}
      pageHeader={<NDBrandHeroNoHeader location={location} />}
    >
      <Seo
        data={{}}
        location={location}
      />
      <SearchBase>

        <NDBrandSectionLeftNav location={location}>
          <Box sx={{ mt: '5rem' }}>
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
          </Box>
          <NDBrandSection sx={{ pl: '2rem', minWidth: '60vw', '&.sectionContent': { minWidth: '60vw' } }}>

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
