/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx, Flex, Box } from 'theme-ui'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import Gravatar from '@ndlib/gatsby-theme-marble/src/components/Shared/Gravatar'
import PromptLogin from './PromptLogin'
import EditUserButton from './EditUserButton'
import { isLoggedIn, ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import sx from './sx'

export const UserLayout = ({ user, children, location, loginReducer }) => {
  if (!user) {
    return <Loading />
  }
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, location)
  return (
    <>
      <Seo
        data={{}}
        location={location}
        title={user.portfolioUserId}
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
              <h2>{user.portfolioUserId}</h2>
            </Box>
          </Flex>
          <div id='bio' sx={sx.bio}>{user.bio}</div>
          <div>
            {
              /* Follow or Edit button */
              isOwner ? <EditUserButton userName={user.portfolioUserId} /> : <PromptLogin showButton={!loggedIn} />
            }
          </div>
        </NDBrandSection>
        <NDBrandSection variant='fullBleedWithSidebar' sx={{ paddingTop: '2rem' }}>
          {children}
        </NDBrandSection>
      </NDBrandSectionLeftNav>
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
