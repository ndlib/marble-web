/** @jsx jsx */
import { useState } from 'react'
import { jsx, Heading } from 'theme-ui'
import PropTypes from 'prop-types'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import TitleEdit from './TitleEdit'
import EditButton from '../EditButton'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

const PortfolioTitle = () => {
  const { isPorfolioOwner } = useUserContext()
  const { portfolio } = usePortfolioContext()
  const [editing, setEditing] = useState(false)

  if (editing) {
    return <TitleEdit closeFunc={() => setEditing(false)} />
  }

  return (
    <Heading as='h1' variant='pageTitle'>
      {portfolio.title}
      <EditButton
        isOwner={isPorfolioOwner()}
        setEditFunc={() => setEditing(true)}
      />
    </Heading>
  )
}

PortfolioTitle.propTypes = {
}

export default PortfolioTitle
