/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import SearchRefinementListFilter from '@ndlib/gatsby-theme-marble/src/components/Shared/SearchTools/SearchRefinementListFilter'

const MarbleSearchFacets = () => {
  return (
    <>
      <SearchRefinementListFilter
        field='centuryTag.keyword'
        label='Time Period'
        operator='OR'
        sort='century'
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
      <SearchRefinementListFilter
        field='hasImages'
        label='Images'
        labelOverrides={{
          true: 'Show items with images',
          false: 'Show items without images',
        }}
        operator='OR'
      />
    </>
  )
}

MarbleSearchFacets.propTypes = {
}

export default MarbleSearchFacets
