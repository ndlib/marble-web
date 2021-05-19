/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Box, Heading } from 'theme-ui'
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
      <NDBrandSectionLeftNav>
        <Box />
        <NDBrandSection variant='defaultWithSidebar' location={location} sx={{ justifyContent: 'center' }}>
          <Heading variant='pageTitle' as='h1'>Finalize Account</Heading>
          <UserBasePathContent />
        </NDBrandSection>
      </NDBrandSectionLeftNav>
    </>
  )
}
UserBasePath.propTypes = {
  location: PropTypes.object.isRequired,
}

export default UserBasePath
