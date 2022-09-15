/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Box, Heading } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import EditUserButton from './EditUserButton'
import UserLogoutButton from './UserLogoutButton'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
// import NewPortfolioButton from '../UserBody/PortfolioList/NewPortfolioButton'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import NoUser from './NoUser'
import sx from './sx'
import typy from 'typy'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const UserLayout = ({ children, location, showSideMenu }) => {
  const { portfolioUser, portfolioUserLoading } = useUserContext()
  const data = useStaticQuery(graphql`
    {
      menusJson(menuId: {eq: "myaccount"}) {
        menuId
        label
        items {
          menuId
          label
          link
          icon
          selectedPatterns
        }
      }
    }
  `)

  if (portfolioUserLoading) {
    return (
      <NDBrandSectionLeftNav location={location}>
        <NDBrandSection variant='sidebar'>&nbsp;</NDBrandSection>
        <NDBrandSection variant='fullBleedWithSidebar'>
          <Loading />
        </NDBrandSection>
      </NDBrandSectionLeftNav>
    )
  } else if (portfolioUser.userNotFound) {
    return (
      <NDBrandSectionLeftNav location={location}>
        <NDBrandSection variant='sidebar'>&nbsp;</NDBrandSection>
        <NDBrandSection variant='fullBleedWithSidebar'>
          <NoUser userName={portfolioUser.portfolioUserId} />
        </NDBrandSection>
      </NDBrandSectionLeftNav>
    )
  }

  const menusJson = typy(data, 'menusJson').safeObject
  const menu = typy(menusJson, 'items').safeArray
  return (
    <>
      <Seo
        data={{}}
        location={location}
        title={portfolioUser.portfolioUserId}
        noIndex
      />
      <NDBrandSectionLeftNav location={location}>
        <NDBrandSection variant='sidebar'>
          <Heading as='h1' sx={{ margin: 0, fontSize: '6' }}>{portfolioUser.fullName}</Heading>
          <Box sx={{ py: '1rem' }}>
            <EditUserButton />
            &nbsp;
            <UserLogoutButton />
          </Box>
          <div id='bio' sx={sx.bio}>{portfolioUser.bio64}</div>

          <Menu location={location} variant='navLeft' items={menu} label='Help' />
        </NDBrandSection>
        <NDBrandSection variant='fullBleedWithSidebar'>
          {children}
        </NDBrandSection>
      </NDBrandSectionLeftNav>
    </>

  )
}

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
}

UserLayout.defaultProps = {
  showSideMenu: true,
}

export default UserLayout
