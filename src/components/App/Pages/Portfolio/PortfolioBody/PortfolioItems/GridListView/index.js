import React from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import CardGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard/CardGroup'
import { DISPLAY_GRID } from '@ndlib/gatsby-theme-marble/src/store/actions/displayActions'

const GridListView = ({ items, userId, isOwner, extraControls }) => {
  return (
    <CardGroup defaultDisplay={DISPLAY_GRID} toggleGroup='portfolio-grid-list' extraControls={extraControls}>
      {
        items.map(item => {
          return (
            <Item
              item={item}
              key={item.portfolioItemId}
              userId={userId}
              isOwner={isOwner}
            />
          )
        })
      }
    </CardGroup>
  )
}

GridListView.propTypes = {
  isOwner: PropTypes.bool,
  items: PropTypes.array,
  userId: PropTypes.string,
}
export default GridListView
