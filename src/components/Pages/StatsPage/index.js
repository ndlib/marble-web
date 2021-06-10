/** @jsx jsx */
import { Heading, jsx, Flex, Box, Button } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import { useState } from 'react'
import typy from 'typy'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import ItemListModal from '../../Shared/ItemListModal'

export const query = graphql`
  query {
    allMarbleItem {
      totalCount
      nodes {
        marbleId
        slug
        title
        description
        collection
        copyrightRestricted
        partiallyDigitized
        childrenMarbleFile {
          fileType
          iiif {
            default
            thumbnail
          }
          id
          local {
            publicURL
          }
        }
        metadata {
          value
          label
        }
      }
    }
  }
`

const StatsPage = () => {
  const [modalProps, setModalProps] = useState({ marbleItems: [], headerLabel: '' })
  const { allMarbleItem } = useStaticQuery(query)
  const itemCount = allMarbleItem.totalCount
  const items = allMarbleItem.nodes

  const locationGroups = {}
  items.forEach(item => {
    const locationPair = typy(item, 'metadata').safeArray.find(meta => meta.label === 'Campus Location')
    const locationName = typy(locationPair, 'value[0]').safeString || '_UNKNOWN_'
    if (!Object.keys(locationGroups).includes(locationName)) {
      locationGroups[locationName] = []
    }
    locationGroups[locationName].push(item)
  })

  const itemsMissingDescription = items.filter(item => typy(item.description).isFalsy)
  const itemsMissingImages = items.filter(item => {
    const fileArray = typy(item, 'childrenMarbleFile').safeArray
    if (!fileArray.length) {
      return true
    }
    const hasImageInChildren = fileArray.some(marbleFile => marbleFile.fileType === 'image' && (
      typy(marbleFile, 'iiif.default').safeString || typy(marbleFile, 'iiif.thumbnail').safeString ||
      typy(marbleFile, 'local.publicURL').safeString
    ))
    return !hasImageInChildren
  })

  const openModal = (marbleItems, headerLabel) => {
    setModalProps({
      marbleItems,
      headerLabel,
    })
  }

  const onModalClosed = () => {
    setModalProps({
      marbleItems: [],
      headerLabel: '',
    })
  }

  const pageTitle = 'Statistics'
  return (
    <NDBrandSection variant='fullBleed' sx={{ '& div.sectionContent': { maxWidth: 'inherit', minWidth: '90vw' } }}>
      <NDBrandBreadcrumbs
        currentPageTitle={pageTitle}
        breadcrumbs={[]}
      />
      <Heading as='h1' variant='pageTitle'>{pageTitle}</Heading>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: '100%', px: '1rem', py: '1rem' }}>
          <ul>
            <li>
              <Button
                variant='text'
                onClick={() => openModal(items, 'All items')}
              >
                <strong>Total items: {itemCount}</strong>
              </Button>
            </li>
            <ul>
              {Object.keys(locationGroups).sort().map(key => (
                <li key={key}>
                  <Button
                    variant='text'
                    onClick={() => openModal(locationGroups[key], `Items from: ${key}`)}
                  >
                    {key}: {locationGroups[key].length}
                  </Button>
                </li>
              ))}
            </ul>
            <li>
              <Button
                variant='text'
                onClick={() => openModal(itemsMissingDescription, 'Items missing description')}
              >
                Items missing description: {itemsMissingDescription.length}
              </Button>
            </li>
            <li>
              <Button
                variant='text'
                onClick={() => openModal(itemsMissingImages, 'Items missing images')}
              >
                Items missing images: {itemsMissingImages.length}
              </Button>
            </li>
          </ul>
        </Box>
      </Flex>
      {typy(modalProps, 'marbleItems').safeArray.length > 0 && (
        <ItemListModal
          {...modalProps}
          onClose={onModalClosed}
        />
      )}
    </NDBrandSection>
  )
}

export default StatsPage
