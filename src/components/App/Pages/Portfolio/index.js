import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import PortfolioBody from './PortfolioBody'
import PortfolioUnavailable from './PortfolioUnavailable'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import { getData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'

export const Portfolio = ({ portfolioId, location, loginReducer }) => {
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()
    if (loginReducer.status === 'STATUS_NOT_LOGGED_IN' || loginReducer.status === 'STATUS_LOGGED_IN') {
      getData({
        loginReducer: loginReducer,
        contentType: 'data.getPortfolioCollection',
        body: `query {
          getPortfolioCollection(portfolioCollectionId: "${portfolioId}") {
            dateAddedToDynamo
            dateModifiedInDynamo
            description
            featuredCollection
            highlightedCollection
            imageUri
            layout
            portfolioCollectionId
            portfolioUserId
            privacy
            title
            portfolioItems {
              items {
                annotation
                dateAddedToDynamo
                dateModifiedInDynamo
                description
                imageUri
                internalItemId
                itemType
                portfolioCollectionId
                portfolioItemId
                portfolioUserId
                sequence
                title
                uri
              }
            }
          }
        }
        `,
        successFunc: (data) => {
          const { privacy, portfolioUserId } = data
          const isOwner = ownsPage(loginReducer, portfolioUserId)
          if (privacy === 'private' && !isOwner) {
            setContent(<PortfolioUnavailable />)
          } else {
            setContent(<PortfolioBody
              location={location}
              portfolio={data}
              isOwner={isOwner}
            />)
          }
        },
        errorFunc: () => {
          setContent(<PortfolioUnavailable />)
        },
      })
    }
    return () => {
      abortController.abort()
    }
  }, [portfolioId, loginReducer, location])

  return (
    <NDBrandSection variant='fullBleed'>
      {content}
    </NDBrandSection>
  )
}

Portfolio.propTypes = {
  portfolioId: PropTypes.string,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(Portfolio)

export const shouldShow = (portfolio, isOwner) => {
  const visibility = typy(portfolio, 'visibility').safeString
  return visibility === 'public' || visibility === 'shared' || isOwner
}
