import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'theme-ui'
import typy from 'typy'

const Stat = ({ items, label, openModal, showGroups, aggregateSx, groupSx }) => {
  const groupByLocation = (itemArray) => {
    const groups = {}
    itemArray.forEach(item => {
      const locationPair = typy(item, 'metadata').safeArray.find(meta => meta.label === 'Campus Location')
      const locationName = typy(locationPair, 'value[0]').safeString || '_UNKNOWN_'
      if (!Object.keys(groups).includes(locationName)) {
        groups[locationName] = []
      }
      groups[locationName].push(item)
    })
    return groups
  }
  const groupedItems = groupByLocation(items)

  return (
    <React.Fragment>
      <li>
        <Button
          variant='text'
          onClick={() => openModal(items, label)}
          sx={aggregateSx}
        >
          {label}: {items.length}
        </Button>
      </li>
      {showGroups && (
        <ul>
          {Object.keys(groupedItems).sort().map(key => (
            <li key={key}>
              <Button
                variant='text'
                onClick={() => openModal(groupedItems[key], `${label} from: ${key}`)}
                sx={groupSx}
              >
                {key}: {groupedItems[key].length}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  )
}

Stat.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  showGroups: PropTypes.bool,
  aggregateSx: PropTypes.object,
  groupSx: PropTypes.object,
}

Stat.defaultProps = {
  showGroups: true,
  aggregateSx: {},
  groupSx: {},
}

export default Stat
