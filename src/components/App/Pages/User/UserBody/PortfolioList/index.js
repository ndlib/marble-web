/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Button, Heading } from 'theme-ui'
import { connect } from 'react-redux'
import typy from 'typy'
import CardGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard/CardGroup'
import DisplayCard from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard'
import NewPortfolioButton from './NewPortfolioButton'
import NoPortfolios from './NoPortfolios'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'
import { DISPLAY_GRID } from '@ndlib/gatsby-theme-marble/src/store/actions/displayActions'
import { NDBrandBreadcrumbs } from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'
import { FaTrash } from 'react-icons/fa'

const PortfolioList = ({
  loginReducer,
  portfolioUser,
  isPorfolioOwner,
  location,
}) => {
  const { removeUserPortfolio } = useUserContext()
  const portfolios = typy(portfolioUser, 'portfolioCollections.items').safeArray

  const beGone = (portfolio) => {
    const areYouSure = window.confirm('Are you sure you want to delete this protfolio?')
      ? (
        removeUserPortfolio(portfolio)
      )
      : null
    return areYouSure
  }

  if (portfolios.length > 0) {
    return (
      <>
        <NDBrandBreadcrumbs
          currentPageTitle={portfolioUser.fullName + "'s Portfolios"}
          breadcrumbs={[]}
        />
        <Heading as='h1' variant='pageTitle'>{portfolioUser.fullName}'s Portfolios</Heading>
        <CardGroup
          defaultDisplay={DISPLAY_GRID}
          toggleGroup='compilations-page'
          extraControls={<>
            <NewPortfolioButton />
          </>}
        >
          {
            typy(portfolios).safeArray
              .sort((a, b) => {
                return b.updated - a.updated
              })
              .map((c, index) => {
                return (
                  <DisplayCard
                    key={index}
                    title={c.title}
                    target={`/user/${c.portfolioUserId}/${c.portfolioCollectionId}`}
                    image={c.imageUri || ''}
                    leftBadge={isPorfolioOwner ? <VisibilityLabel visibility={c.privacy} /> : null}

                  >{c.description}
                  </DisplayCard>
                )
              })
          }
        </CardGroup>
      </>
    )
  }
  return <NoPortfolios isPorfolioOwner={isPorfolioOwner} button={(
    <NewPortfolioButton />
  )} />
}

PortfolioList.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(
  mapStateToProps,
)(PortfolioList)
