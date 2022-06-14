/** @jsx jsx */
import { useState } from 'react'
import { jsx, BaseStyles, Button, Box } from 'theme-ui'
import ReactMarkdown from 'react-markdown'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import EditButton from '../EditButton'
import EditDescription from './EditDescription'
import sx from './sx'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

// eslint-disable-next-line complexity
const PortfolioDescription = () => {
  const { isPortfolioOwner } = useUserContext()
  const { portfolio } = usePortfolioContext()
  const [editing, setEditing] = useState(false)
  const { description } = portfolio
  const isOwner = isPortfolioOwner()

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

  // Look for spaces between parentheses and replace them with %20
  const regExp = /\s+(?=[^\(\)]*\))/gm
  const cleanDescription = description ? description.replace(regExp, '%20') : ''

  return (
    <BaseStyles>
      <Box as='div' sx={sx.wrapper}>
        <div sx={isOwner ? sx.innerWrapperOwner : sx.innerWrapper}>
          <ReactMarkdown>{cleanDescription}</ReactMarkdown>
        </div>
        <div sx={isOwner ? sx.buttonWrapperOwner : sx.buttonWrapper}>
          <EditButton
            isOwner={isOwner}
            setEditFunc={() => setEditing(true)}
          />
        </div>
      </Box>
    </BaseStyles>
  )
}

export default PortfolioDescription
