import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Flex, Box } from 'theme-ui'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Gravatar from '@ndlib/gatsby-theme-marble/src/components/Shared/Gravatar'
import PromptLogin from './PromptLogin'
import EditUserButton from './EditUserButton'
import { isLoggedIn, ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import sx from './sx'

export const UserLayout = ({ user, children, location, loginReducer }) => {
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, user.uuid)
  return (
    <>
      <Seo
        data={{}}
        location={location}
        title={user.userName}
        noIndex
      />
      <NDBrandSectionLeftNav location={location}>
        <NDBrandSection variant='sidebar'>
          <Flex sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ width: ['25%', '100%', '100%'] }}>
              <Gravatar email={user.email} />
            </Box>
            <Box sx={{ width: ['75%', '100%', '100%'], px: '1rem' }}>
              <h1>{user.fullName}</h1>
              <h2>{user.userName}</h2>
            </Box>
          </Flex>
          <div id='bio' sx={sx.bio}>{user.bio}</div>
          <div>
            {
              /* Follow or Edit button */
              isOwner ? <EditUserButton userName={user.userName} /> : <PromptLogin showButton={!loggedIn} />
            }
          </div>
        </NDBrandSection>
        <NDBrandSection variant='fullBleedWithSidebar'>
          {children}
        </NDBrandSection>
      </NDBrandSectionLeftNav location={location}>
    </>

  )
}

UserLayout.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(UserLayout)
