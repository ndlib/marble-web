/** @jsx jsx */
import { useState } from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'

const SetPortfolioImage = ({ item }) => {
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
          updatePortfolio(portfolio)
            .then(() => {
              setPatching(false)
            })
            .catch((e) => {
              console.error(e)
            })
        }}
        variant='light'
        disabled={patching}
      >Set as Portfolio Cover Image
      </Button>
    </div>
  )
}

SetPortfolioImage.propTypes = {
  item: PropTypes.object.isRequired,
}

export default SetPortfolioImage
