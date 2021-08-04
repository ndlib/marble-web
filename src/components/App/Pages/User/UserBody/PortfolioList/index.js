/** @jsx jsx */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Button } from 'theme-ui'
import { connect } from 'react-redux'
import typy from 'typy'
import CardGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/CardGroup'
import Card from '@ndlib/gatsby-theme-marble/src/components/Shared/Card'
import NewPortfolioButton from './NewPortfolioButton'
import NoPortfolios from './NoPortfolios'
import VisibilityLabel from '@ndlib/gatsby-theme-marble/src/components/Shared/VisibilityLabel'
import { DISPLAY_GRID } from '@ndlib/gatsby-theme-marble/src/store/actions/displayActions'
import { ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import { getData } from '@ndlib/gatsby-theme-marble/src/utils/api'

const PortfolioList = ({
  user,
  loginReducer,
  location,
}) => {
  const [portfolios, setPortfolios] = useState(typy(user, 'portfolioCollections.items').safeArray)
  const beGone = (portfolio) => {
    const areYouSure = window.confirm('Are you sure you want to delete this protfolio?')
      ? (
        getData({
          loginReducer: loginReducer,
          contentType: 'data.removePortfolioCollection',
          body: `mutation {
            removePortfolioCollection(portfolioCollectionId: "${portfolio.portfolioCollectionId}") {
            recordsDeleted
            }
          }`,
          successFunc: () => {
            setPortfolios(portfolios.filter(p => {
              return p.portfolioCollectionId !== portfolio.portfolioCollectionId
            }))
          },
          errorFunc: (e) => {
            console.error(e)
          },
        })
      )
      : null
    return areYouSure
  }
  const isOwner = ownsPage(loginReducer, location)

  if (portfolios.length > 0) {
    return (
      <>
        <CardGroup
          defaultDisplay={DISPLAY_GRID}
          toggleGroup='compilations-page'
          extraControls={isOwner
            ? (
              <span sx={{
                float: 'left',
                verticalAlign: 'top',
              }}
              >
                <NewPortfolioButton
                  addFunc={setPortfolios}
                  portfolios={portfolios}
                />
              </span>
            )
            : null
          }
        >
          {
            typy(portfolios).safeArray
              .sort((a, b) => {
                return b.dateModifiedInDynamo - a.dateModifiedInDynamo
              })
              .map((c, index) => {
                return (
                  <div key={index} sx={{ position: 'relative' }}>
                    {
                      isOwner
                        ? (
                          <Button
                            variant='light'
                            onClick={() => beGone(c)}
                          >Delete
                          </Button>
                        )
                        : null
                    }
                    <Card
                      label={c.title}
                      target={`/user/${user.portfolioUserId}/${c.portfolioCollectionId}`}
                      image={c.imageUri !== 'null' ? c.imageUri : ''}
                    >{c.description}
                    </Card>
                    {
                      isOwner
                        ? (
                          <div>
                            <VisibilityLabel visibility={c.privacy} />
                          </div>
                        )
                        : null
                    }
                  </div>
                )
              })
          }
        </CardGroup>
      </>
    )
  }
  return <NoPortfolios isOwner={isOwner} button={(
    <NewPortfolioButton
      addFunc={setPortfolios}
      portfolios={portfolios}
    />
  )} />
}

PortfolioList.propTypes = {
  user: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(
  mapStateToProps,
)(PortfolioList)

export const viewable = (portfolio, loggedIn, isOwner) => {
  if (isOwner) {
    return true
  } else if (loggedIn && portfolio.privacy !== 'private') {
    return true
  } else if (portfolio.privacy === 'public') {
    return true
  }
  return false
}
