/** @jsx jsx */
import { Heading, jsx, Flex, Box } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import { useState } from 'react'
import typy from 'typy'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import ItemListModal from '../../Shared/ItemListModal'
import Stat from './Stat'

export const query = graphql`
  query {
    allMarbleItem {
      totalCount
      nodes {
        marbleId
        slug
        title
        description
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
  const items = allMarbleItem.nodes

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
    <NDBrandSection variant='fullBleed' sx={{ '& div.sectionContent': { maxWidth: 'inherit', width: '100%' } }}>
      <NDBrandBreadcrumbs
        currentPageTitle={pageTitle}
        breadcrumbs={[]}
      />
      <main>
        <Heading as='h1' variant='pageTitle'>{pageTitle}</Heading>
        <Flex sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ width: '100%', px: '1rem', py: '1rem' }}>
            <ul>
              <Stat
                items={items}
                label='Total items'
                openModal={openModal}
                aggregateSx={{ fontWeight: 'bold' }}
              />
              <Stat
                items={itemsMissingDescription}
                label='Items missing description'
                openModal={openModal}
              />
              <Stat
                items={itemsMissingImages}
                label='Items missing images'
                openModal={openModal}
              />
            </ul>
          </Box>
        </Flex>
        {typy(modalProps, 'marbleItems').safeArray.length > 0 && (
          <ItemListModal
            {...modalProps}
            onClose={onModalClosed}
          />
        )}
      </main>
    </NDBrandSection>
  )
}

export default StatsPage
