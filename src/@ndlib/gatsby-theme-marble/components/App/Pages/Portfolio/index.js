import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import PortfolioBody from './PortfolioBody'
import PortfolioFeature from './PortfolioFeature'
import PortfolioUnavailable from './PortfolioUnavailable'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import { getData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { ownsPage } from '@ndlib/gatsby-theme-marble/src/utils/auth'
import { useStaticQuery, graphql } from 'gatsby'

export const Portfolio = ({ portfolioId, location, loginReducer }) => {
  const query = useStaticQuery(
    graphql`
    query {
      allFeaturedJson {
        edges {
          node {
            id
            title
            description
            uuid
            image
            items {
              updated
              annotation
              image
              created
              uuid
              displayOrder
              link
              manifest
              title
            }
          }
        }
      }
    }
    `,
  )
  const featuredPortfolios = query.allFeaturedJson.edges[0].node.uuid
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()
    if (loginReducer.status === 'STATUS_NOT_LOGGED_IN' || loginReducer.status === 'STATUS_LOGGED_IN') {
      if( featuredPortfolios === portfolioId) {
        setContent(<PortfolioFeature 
          location={location}
          portfolio={query.allFeaturedJson.edges[0].node}
          allMarbleFile={query}
        />)
      } else {
        getData({
          loginReducer: loginReducer,
          contentType: 'collection',
          id: portfolioId,
          successFunc: (data) => {
            const { privacy, userId } = data
            const isOwner = ownsPage(loginReducer, userId)
            if (privacy === 'private' && !isOwner) {
              setContent(<PortfolioUnavailable />)
            } else {
              console.log(data)
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
    }
    return () => {
      abortController.abort()
    }
  }, [portfolioId, loginReducer, location])

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
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
