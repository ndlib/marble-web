/** @jsx jsx */
import { useState } from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import EditButton from '../EditButton'
import EditDescription from './EditDescription'
import sx from './sx'

const PortfolioDescription = ({ isOwner }) => {
  const { portfolio } = usePortfolioContext()
  const [editing, setEditing] = useState(false)
  const { description } = portfolio

  if (editing) {
    return (<EditDescription closeFunc={() => setEditing(false)} />)
  }
  if (description === '' || description === null) {
    if (isOwner) {
      return (
        <Button
          variant='inverse'
          onClick={() => {
            setEditing(true)
          }}
        >Add a description</Button>
      )
    }
    return null
  }
  return (
    <div sx={sx.wrapper}>
      <div sx={sx.innerWrapper(isOwner)}>
        {description}
      </div>
      <div sx={sx.buttonWrapper(isOwner)}>
        <EditButton
          isOwner={isOwner}
          setEditFunc={() => setEditing(true)}
        />
      </div>
    </div>
  )
}

PortfolioDescription.propTypes = {
  isOwner: PropTypes.bool,
}

export default PortfolioDescription
