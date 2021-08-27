/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
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
import { isLoggedIn, ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import { deleteData } from '@ndlib/gatsby-theme-marble/src/utils/api'

const PortfolioList = ({
  user,
  loginReducer,
}) => {
  const [portfolios, setPortfolios] = useState(user.collections || [])
  const beGone = (portfolio) => {
    const areYouSure = window.confirm('Are you sure you want to delete this protfolio?')
      ? (
        deleteData({
          loginReducer: loginReducer,
          contentType: 'collection',
          id: portfolio.uuid,
          successFunc: () => {
            setPortfolios(portfolios.filter(p => {
              return p.uuid !== portfolio.uuid
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
  const loggedIn = isLoggedIn(loginReducer)
  const isOwner = ownsPage(loginReducer, user.uuid)
  if (portfolios.length > 0) {
    return (
      <>
        <CardGroup
          defaultDisplay={DISPLAY_GRID}
          toggleGroup='compilations-page'
          extraControls={isOwner
            ? (
              <span style={{
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
              .filter(c => {
                return viewable(c, loggedIn, isOwner)
              })
              .sort((a, b) => {
                return b.updated - a.updated
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
                      target={`/myportfolio/${c.uuid}`}
                      image={c.image || ''}
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
