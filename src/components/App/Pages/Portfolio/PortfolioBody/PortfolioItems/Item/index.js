/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'
import typy from 'typy'
import Card from '@ndlib/gatsby-theme-marble/src/components/Shared/Card'
import EditItemForm from './EditItemForm'
import ItemControls from './ItemControls'
import sx from './sx'

const Item = ({ item, userId, isOwner, annotated = false }) => {
  const [editing, setEditing] = useState(false)
  const finalTarget = targetWithAnnotation(item, userId)

  let card = (
    <div sx={sx.cardWrapper}>
      <Card
        label={item.title}
        target={finalTarget}
        image={item.image}
      >
        {
          item.annotation && !annotated ? (
            <p>{item.annotation}</p>
          ) : null
        }
      </Card>
      <ItemControls
        item={item}
        isOwner={isOwner}
        setEditFunc={() => setEditing(true)}
      />
    </div>
  )

  if (editing) {
    card = (
      <EditItemForm
        uuid={item.uuid}
        closeFunc={() => setEditing(false)}
      />
    )
  }
  if (annotated) {
    return (
      <div sx={sx.item}>
        <Flex sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ width: ['100%', '60%', '60%'], px: '1rem', py: '1rem' }}>
            {item.annotation}
          </Box>
          <Box sx={{ width: ['100%', '40%'], py: '1rem' }}>
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
  userId: PropTypes.string.isRequired,
  isOwner: PropTypes.bool,
  annotated: PropTypes.bool,
}
export default Item

export const targetWithAnnotation = (item, userId) => {
  if (item && item.annotation && !typy(item, 'link').safeString.startsWith('http')) {
    return `${item.link}?${userId}${item.uuid}`
  }
  return item.link
}
