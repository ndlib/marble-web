/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx, Flex, Box, Heading, Divider } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import Gravatar from '@ndlib/gatsby-theme-marble/src/components/Shared/Gravatar'
import PromptLogin from './PromptLogin'
import EditUserButton from './EditUserButton'
import { isLoggedIn, ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import NewPortfolioButton from '../UserBody/PortfolioList/NewPortfolioButton'
import sx from './sx'
import typy from 'typy'

export const UserLayout = ({ children, location, loginReducer }) => {
  const data = useStaticQuery(graphql`
    {
      menusJson(id: {eq: "myaccount"}) {
        id
        label
        items {
          id
          label
          link
          icon
          selectedPatterns
        }
      }
    }
  `)

  const menusJson = typy(data, 'menusJson').safeObject
  const menu = typy(menusJson, 'items').safeArray
  if (!loginReducer.user) {
    return <Loading />
  }
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, location)
  const user = loginReducer.user
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
          <Heading as='h1' sx={{ margin: 0, fontSize: '6' }}>{user.fullName}</Heading>
          <Flex sx={{ display: 'flex', alignItems: 'top' }}>
            <Box sx={{ width: '75px' }}>
              <Gravatar email={user.email} size={75} />
            </Box>
            <Box sx={{ px: '1rem' }}>
              <div>
                {
                  /* Follow or Edit button */
                  isOwner ? <EditUserButton userName={user.portfolioUserId} /> : <PromptLogin showButton={!loggedIn} />
                }
              </div>
            </Box>
          </Flex>
          <div id='bio' sx={sx.bio}>{user.bio}</div>

          <Menu location={location} variant='navLeft' items={menu} label='Help' />
          {
            /* Follow or Edit button */
            isOwner ? <NewPortfolioButton /> : null
          }
        </NDBrandSection>
        <NDBrandSection variant='fullBleedWithSidebar'>
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
