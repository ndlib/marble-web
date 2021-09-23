/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'

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
      <NDBrandSection variant='default' location={location}>
        <UserBasePathContent />
      </NDBrandSection>
    </>
  )
}
UserBasePath.propTypes = {
  location: PropTypes.object.isRequired,
}

export default UserBasePath
