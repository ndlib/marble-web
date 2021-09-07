/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx, Button } from 'theme-ui'
import { removeCollectionItem, getPortfolioQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import { FaTrash } from 'react-icons/fa'

const DeleteItemButton = ({ item, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const [patching, setPatching] = useState(false)
  const callBack = () => {
    console.log('big old cb', portfolio.portfolioCollectionId)
    getPortfolioQuery({
      loginReducer: loginReducer,
      isOwner: true,
      portfolioId: portfolio.portfolioCollectionId,
    })
      .then((data) => {
        updatePortfolio(data)
        setPatching(false)
      })
      .catch((e) => {
        console.error(e)
      })
  }
  return (
    <Button
      disabled={patching}
      onClick={(e) => {
        deleteItem(e, loginReducer, item, setPatching, callBack)
      }}
      variant='inverse'
    >
      <FaTrash sx={{ color: 'red' }} />
    </Button>
  )
}

export const mapStateToProps = (state) => {
  return { ...state }
}

DeleteItemButton.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
)(DeleteItemButton)

export const deleteItem = (event, loginReducer, item, patchingFunc, callBack) => {
  patchingFunc(true)
  if (window.confirm(`This action cannot be undone.`)) {
    removeCollectionItem({
      loginReducer: loginReducer,
      item: item,
    })
      .then(() => {
        callBack()
        patchingFunc(false)
      })
      .catch((e) => {
        console.error(e)
        patchingFunc(false)
      })
  } else {
    patchingFunc(false)
  }
}
