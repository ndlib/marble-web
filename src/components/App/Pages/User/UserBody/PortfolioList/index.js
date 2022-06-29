/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Heading } from 'theme-ui'
import { connect } from 'react-redux'
import typy from 'typy'
import ReactMarkdown from 'react-markdown'
import CardGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard/CardGroup'
import DisplayCard from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard'
import NewPortfolioButton from './NewPortfolioButton'
import NoPortfolios from './NoPortfolios'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'
import { DISPLAY_GRID } from '@ndlib/gatsby-theme-marble/src/store/actions/displayActions'
import { NDBrandBreadcrumbs } from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
// import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

const PortfolioList = ({
  // loginReducer,
  portfolioUser,
  isPortfolioOwner,
  // location,
}) => {
  // const { removeUserPortfolio } = useUserContext()
  const portfolios = typy(portfolioUser, 'portfolioCollections.items').safeArray
  console.log(portfolios)

  // const beGone = (portfolio) => {
  //   const areYouSure = window.confirm('Are you sure you want to delete this protfolio?')
  //     ? (
  //       removeUserPortfolio(portfolio)
  //     )
  //     : null
  //   return areYouSure
  // }

  if (portfolios.length > 0) {
    return (
      <>
        <NDBrandBreadcrumbs
          currentPageTitle={portfolioUser.fullName + "'s Portfolios"}
          breadcrumbs={[]}
        />
        <Heading as='h1' variant='pageTitle'>{`${portfolioUser.fullName}'s`} Portfolios</Heading>

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
                const fixEndLinesRegExp = /\\\n/gm
                return (
                  <DisplayCard
                    key={index}
                    title={c.title}
                    target={`/user/${c.portfolioUserId}/${c.portfolioCollectionId}`}
                    image={c.imageUri || ''}
                    leftBadge={isPortfolioOwner ? <VisibilityLabel visibility={c.privacy} /> : null}
                  >
                    <ReactMarkdown
                      sx={{
                        whiteSpace: 'break-space',
                        '& p': {
                          margin: '0',
                        },
                        '& h1, & h2, & h3': {
                          fontFamily: 'body',
                          fontSize: '1rem',
                          fontWeight: 'normal',
                          margin: '0',
                          color: 'black',
                        },
                      }}
                      allowedElements={['h1', 'h2', 'h3', 'p']}
                    >
                      {c.description.replace(fixEndLinesRegExp, '\n')}
                    </ReactMarkdown>
                  </DisplayCard>
                )
              })
          }
        </CardGroup>
      </>
    )
  }
  return <NoPortfolios isPortfolioOwner={isPortfolioOwner} button={(
    <NewPortfolioButton />
  )} />
}

PortfolioList.propTypes = {
  // loginReducer: PropTypes.object.isRequired,
  portfolioUser: PropTypes.shape({ fullName: PropTypes.string }),
  isPortfolioOwner: PropTypes.bool,
  // location: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(
  mapStateToProps,
)(PortfolioList)
