/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import SortableList from 'react-sortable-dnd-list'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import SortableItem from './SortableItem'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import { getData } from '@ndlib/gatsby-theme-marble/src/utils/api'
import sx from './sx'

const EditList = ({ items, closeFunc, loginReducer }) => {
  const { portfolio, updatePortfolio } = usePortfolioContext()
  const [sortedItems, setItems] = useState(items)
  const [saving, setSaving] = useState(false)
  if (saving) {
    return (
      <Loading />
    )
  }
  return (
    <div sx={sx.wrapper}>
      <div sx={sx.controls}>
        <Button
          onClick={() => closeFunc()}
          variant='light'
        >Cancel
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            setSaving(true)
            Promise.all(sortedItems.map((item, index) => fetch(
              `${loginReducer.userContentPath}item/${item.uuid}`,
              {
                method: 'PATCH',
                headers: {
                  Authorization: typy(loginReducer, 'token.idToken').safeString,
                  'Access-Control-Request-Method': 'PATCH',
                  'Access-Control-Request-Headers': 'Authorization',
                },
                mode: 'cors',
                body: JSON.stringify({
                  uuid: item.uuid,
                  displayOrder: index,
                }),
              },
            )))
              .then(() => {
                getData({
                  loginReducer: loginReducer,
                  contentType: 'collection',
                  id: portfolio.uuid,
                  successFunc: (data) => {
                    updatePortfolio(data)
                    closeFunc()
                  },
                  errorFunc: (error) => {
                    console.error(error)
                    closeFunc()
                  },
                })
              })
              .catch(error => console.error(error))
          }}
        >Save
        </Button>
      </div>
      <SortableList
        className='list'
        itemComponent={SortableItem}
        value={sortedItems}
        onChange={result => {
          setItems(result)
        }}
      />
    </div>
  )
}

EditList.propTypes = {
  items: PropTypes.array,
  closeFunc: PropTypes.func.isRequired,
  loginReducer: PropTypes.object,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(EditList)
