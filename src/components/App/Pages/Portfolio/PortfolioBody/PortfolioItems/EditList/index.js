/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SortableList from 'react-sortable-dnd-list'
import Loading from '@ndlib/gatsby-theme-marble/src/components/Shared/Loading'
import SortableItem from './SortableItem'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import { savePortfolioItemQuery, getPortfolioQuery } from '@ndlib/gatsby-theme-marble/src/utils/api'
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
            Promise.all(sortedItems.map((item, index) => {
              item.sequence = index
              return savePortfolioItemQuery({ item: item, loginReducer: loginReducer })
                .then((event) => {
                  closeFunc(event)
                })
                .catch((e) => {
                  console.error(e)
                })
            })
            )
              .then(() => {
                getPortfolioQuery({ loginReducer: loginReducer, isOwner: true, portfolioId: portfolio.portfolioCollectionId })
                  .then((data) => {
                    console.log('reorder', data)
                    updatePortfolio(data)
                    closeFunc()
                  })
                  .catch((error) => {
                    console.error(error)
                    closeFunc()
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
