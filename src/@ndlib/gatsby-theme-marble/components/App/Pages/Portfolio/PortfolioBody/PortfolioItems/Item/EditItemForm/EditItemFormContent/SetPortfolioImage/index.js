/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'
import { patchData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'

const SetPortfolioImage = ({ item, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const [patching, setPatching] = useState(false)
  if (!item.image) {
    return null
  }
  if (portfolio.image === item.image) {
    return (
      <div sx={sx.wrapper}>
        <em>This item is the cover image for this portfolio.</em>
      </div>
    )
  }
  return (
    <div sx={sx.wrapper}>
      <MaterialButton
        onClick={() => {
          setPatching(true)
          const body = { image: item.image }
          patchData({
            loginReducer: loginReducer,
            contentType: 'collection',
            id: portfolio.uuid,
            body: body,
            successFunc: (result) => {
              updatePortfolio(result)
              setPatching(false)
            },
            errorFunc: (e) => {
              console.error(e)
            },
          })
        }}
        disabled={patching}
        wide
      >Set as Portfolio Cover Image
      </MaterialButton>
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
