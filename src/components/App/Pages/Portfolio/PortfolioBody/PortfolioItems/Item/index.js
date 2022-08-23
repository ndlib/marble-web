/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'
import typy from 'typy'
import DisplayCard from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard'
import MarbleItemCardChildren from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard/MarbleItemCard/MarbleItemCardChildren'
import EditItemForm from './EditItemForm'
import ItemControls from './ItemControls'
import sx from './sx'

// eslint-disable-next-line complexity
const Item = ({ item, userId, isOwner, annotated = false }) => {
  const [editing, setEditing] = useState(false)
  const finalTarget = targetWithAnnotation(item, userId)
  const { internalItem } = item
  let card = (
    <DisplayCard
      title={typy(internalItem, 'title').safeString || item.title}
      target={finalTarget}
      image={item.imageUri}
      controls={<ItemControls
        item={item}
        isOwner={isOwner}
        setEditFunc={() => setEditing(true)}
      />}
    >
      <MarbleItemCardChildren
        date={typy(internalItem, 'createdDate').safeString}
        creator={typy(internalItem, 'creators[0].display').safeString}
        collectionName={[]}
        parentProps={{}}
      />
      { item.annotation64 && !annotated && (
        <p sx={{ whiteSpace: 'break-space' }}>{item.annotation64}</p>
      ) }
    </DisplayCard>
  )

  if (editing) {
    card = (
      <EditItemForm
        uuid={item.uuid}
        item={item}
        closeFunc={() => setEditing(false)}
      />
    )
  }
  if (annotated) {
    return (
      <div sx={sx.item}>
        <Flex sx={{ flexWrap: 'wrap' }}>
          <Box sx={{
            width: ['100%', '60%', '60%'],
            px: '1rem',
            py: '1rem',
            whiteSpace: 'break-space',
          }}>
            {item.annotation64}
          </Box>
          <Box sx={{
            width: ['100%', '40%'],
            py: '1rem',
          }}>
            {card}
          </Box>
        </Flex>
      </div>
    )
  }
  return card
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  userId: PropTypes.string,
  isOwner: PropTypes.bool,
  annotated: PropTypes.bool,
}
export default Item

export const targetWithAnnotation = (item, userId) => {
  if (item && item.annotation64 && !typy(item, 'link').safeString.startsWith('http')) {
    return `/item/${item.portfolioItemId}?${userId ? userId + '=' + item.portfolioCollectionId : ''}`
  }
  return `/item/${item.portfolioItemId}`
}
