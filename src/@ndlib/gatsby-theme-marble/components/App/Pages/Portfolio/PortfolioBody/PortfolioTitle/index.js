/** @jsx jsx */
import { useState } from 'react'
import { jsx, Heading } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import TitleEdit from './TitleEdit'
import EditButton from '../EditButton'

const PortfolioTitle = ({ isOwner }) => {
  const { portfolio } = usePortfolioContext()
  const [editing, setEditing] = useState(false)

  if (editing) {
    return <TitleEdit closeFunc={() => setEditing(false)} />
  }

  return (
    <Heading as='h1' variant='pageTitle'>
      {portfolio.title}
      <EditButton
        isOwner={isOwner}
        setEditFunc={() => setEditing(true)}
      />
    </Heading>
  )
}

PortfolioTitle.propTypes = {
  isOwner: PropTypes.bool,
}

export default PortfolioTitle
