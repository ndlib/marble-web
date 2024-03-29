/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { jsx, Button } from 'theme-ui'
import typy from 'typy'
import NoItems from './NoItems'
import EmptyAddItems from './EmptyAddItems'
import AnnotatedView from './AnnotatedView'
import GridListView from './GridListView'
import EditList from './EditList'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import sx from './sx'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

// eslint-disable-next-line complexity
const PortfolioItems = () => {
  const { isPortfolioOwner } = useUserContext()
  const { portfolio } = usePortfolioContext()
  const [editing, setEditing] = useState(false)
  const { portfolioItems, layout, portfolioUserId } = portfolio
  const { items } = portfolioItems

  const isOwner = isPortfolioOwner()

  if (typy(items).safeArray.length === 0) {
    return (
      isPortfolioOwner ? <EmptyAddItems /> : <NoItems />
    )
  }
  const sortedItems = items.sort((i1, i2) => {
    return i1.sequence - i2.sequence
  })

  const extraControls = isOwner && !editing
    ? (
      <Button
        wide
        onClick={() => {
          setEditing(!editing)
        }}
        variant='light'
      >Reorder Items
      </Button>
    )
    : null

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
      <>
        <div sx={sx.reorderButton}>
          { extraControls}
        </div>
        <AnnotatedView
          items={sortedItems}
          isOwner={isOwner}
          userId={portfolioUserId}
        />

      </>
    )
  } else {
    list = (
      <GridListView
        items={sortedItems}
        isOwner={isOwner}
        userId={portfolioUserId}
        extraControls={extraControls}
      />
    )
  }

  return (
    <div>
      {list}
    </div>
  )
}

PortfolioItems.propTypes = {
}
export default PortfolioItems
