/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Box } from 'theme-ui'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'

import UserBasePathContent from './UserBasePathContent'

const UserBasePath = ({ location }) => {
  return (
    <>
      <Seo
        data={{}}
        location={location}
        title={`Login`}
        noIndex
      />
      <NDBrandSectionLeftNav location={location}>
        <Box />
        <NDBrandSection variant='defaultWithSidebar' location={location}>
          <UserBasePathContent />
        </NDBrandSection>
      </NDBrandSectionLeftNav location={location}>
    </>
  )
}
UserBasePath.propTypes = {
  location: PropTypes.object.isRequired,
}

export default UserBasePath
