/** @jsx jsx */
import { useState } from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { savePortfolioCollectionQuery } from '../../../../../../../../../utils/portfolioQueries'

import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'

const SetPortfolioImage = ({ item, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const [patching, setPatching] = useState(false)

  if (!item.imageUri) {
    return null
  }
  if (portfolio.imageUri === item.imageUri) {
    return (
      <div sx={sx.wrapper}>
        <em>This item is the cover image for this portfolio.</em>
      </div>
    )
  }
  return (
    <div sx={sx.wrapper}>
      <Button
        onClick={() => {
          setPatching(true)
          portfolio.imageUri = item.imageUri
          getData({
            loginReducer: loginReducer,
            contentType: 'data.savePortfolioCollection',
            id: portfolio.portfolioCollectionId,
            body: savePortfolioCollectionQuery(portfolio),
            successFunc: (result) => {
              console.log('res=', result)
              updatePortfolio(result)
              setPatching(false)
            },
            errorFunc: (e) => {
              console.error(e)
            },
          })
        }}
        disabled={patching}
      >Set as Portfolio Cover Image
      </Button>
    </div>
  )
}

SetPortfolioImage.propTypes = {
  item: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(SetPortfolioImage)
