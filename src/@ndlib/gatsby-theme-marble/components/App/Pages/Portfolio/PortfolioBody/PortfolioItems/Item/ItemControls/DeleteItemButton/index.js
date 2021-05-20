/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx } from 'theme-ui'
import { deleteData, getData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import MaterialButton from 'components/Shared/MaterialButton'

const DeleteItemButton = ({ item, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const [patching, setPatching] = useState(false)
  const callBack = () => {
    getData({
      loginReducer: loginReducer,
      contentType: 'collection',
      id: portfolio.uuid,
      successFunc: (data) => {
        updatePortfolio(data)
      },
      errorFunc: (e) => {
        console.error(e)
      },
    })
  }
  return (
    <MaterialButton
      disabled={patching}
      onClick={(e) => {
        deleteItem(e, loginReducer, item.uuid, setPatching, callBack)
      }}
    >
      Delete
    </MaterialButton>
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

export const deleteItem = (event, loginReducer, uuid, patchingFunc, callBack) => {
  patchingFunc(true)
  if (window.confirm(`This action cannot be undone.`)) {
    deleteData({
      loginReducer: loginReducer,
      contentType: 'item',
      id: uuid,
      successFunc: callBack,
      errorFunc: (e) => {
        console.error(e)
        patchingFunc(false)
      },
    })
  } else {
    patchingFunc(false)
  }
}
