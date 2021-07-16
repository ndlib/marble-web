/** @jsx jsx */
import { useState } from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import NoItems from './NoItems'
import AnnotatedView from './AnnotatedView'
import GridListView from './GridListView'
import EditList from './EditList'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'

// eslint-disable-next-line complexity
const PortfolioItems = ({ isOwner }) => {
  const { portfolio } = usePortfolioContext()
  const [editing, setEditing] = useState(false)
  const { portfolioItems, layout, userId } = portfolio
  if (typy(portfolioItems, 'items').safeArray.length === 0) {
    return (
      <NoItems />
    )
  }
  const sortedItems = portfolioItems.items.sort((i1, i2) => {
    return i1.sequence - i2.sequence
  })

  let list
  if (isOwner && editing) {
    list = (
      <EditList
        items={sortedItems}
        closeFunc={setEditing}
      />
    )
  } else if (layout === 'annotated') {
    list = (
      <AnnotatedView
        items={sortedItems}
        isOwner={isOwner}
        userId={userId}
      />
    )
  } else {
    list = (
      <GridListView
        items={sortedItems}
        isOwner={isOwner}
        userId={userId}
      />
    )
  }

  return (
    <div>
      <div sx={sx.reorderButton}>
        {
          isOwner && !editing
            ? (
              <Button
                wide
                onClick={() => {
                  setEditing(!editing)
                }}
              >Reorder Items
              </Button>
            )
            : null
        }
      </div>
      {list}
    </div>
  )
}

PortfolioItems.propTypes = {
  isOwner: PropTypes.bool,
}
export default PortfolioItems
