/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, Flex, Box, Heading } from 'theme-ui'
import typy from 'typy'
import CardGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/CardGroup'
import BrowseBar from '@ndlib/gatsby-theme-marble/src/components/Shared/BrowseBar'
import ManifestCard from '@ndlib/gatsby-theme-marble/src/components/Shared/ManifestCard'
import { useTranslation } from 'react-i18next'
import findMetadata from 'utils/findMetadata'
import dateImage from 'assets/images/date.jpg'
import formatImage from 'assets/images/format.jpg'
import campuslocationImage from 'assets/images/campus_location.jpg'
import allImage from 'assets/images/all_items.jpg'
import GoogleVerification from './GoogleVerification'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'

const IndexPage = ({ location }) => {
  const { t } = useTranslation()
  const { allMarbleItem } = useStaticQuery(
    graphql`
      query {
        allMarbleItem(filter: {marbleId: {in: [
        "1978.025.001",
        "BPP1001_EAD",
        "2000.031",
        "MSNEa8006_EAD",
        "002204685",
        "2008.026.008",
        "CJF_EAD",
        "2010.030",
        "005095911",
        "004789783"
      ]}}) {
          nodes {
            title
            marbleId
            slug
            display
            childrenMarbleFile {
              iiif {
                thumbnail
              }
              fileType
            }
            metadata {
              label
              type
              value
            }
          }
        }
      }
    `,
  )
  const { nodes } = allMarbleItem
  return (
    <React.Fragment>
      <NDBrandSection location={location}>
        <Html html={t('common:hompageDescriptive')} />
      </NDBrandSection>
      <NDBrandSection location={location} variant='fullBleedLight'
        sx={{ '& div.sectionContent': { maxWidth: 'inherit', minWidth: '90vw' } }}
      >
        <Heading as='h2' variant='sectionTitle'>
          {t('common:search.browseBy')}
        </Heading>

        <Flex sx={{ flexWrap: 'wrap', width: '100%' }}>
          <Box sx={{ width: ['100%', '50%', '50%', '25%'], px: '1rem', py: '.5rem' }}>
            <BrowseBar
              label='Date'
              target='/browse?scrollto=date'
              image={dateImage}
            />
          </Box>
          <Box sx={{ width: ['100%', '50%', '50%', '25%'], px: '1rem', py: '.5rem' }}>
            <BrowseBar
              label='Work Type'
              target='/browse?scrollto=format'
              image={formatImage}
            />
          </Box>
          <Box sx={{ width: ['100%', '50%', '50%', '25%'], px: '1rem', py: '.5rem' }}>
            <BrowseBar
              label='Campus Location'
              target='/browse?scrollto=location'
              image={campuslocationImage}
            />
          </Box>
          <Box sx={{ width: ['100%', '50%', '50%', '25%'], px: '1rem', py: '.5rem' }}>
            <BrowseBar
              label='All Items'
              target='/search?q='
              image={allImage}
            />
          </Box>
        </Flex>

      </NDBrandSection>
      <NDBrandSection location={location} variant='fullBleed' sx={{ '& div.sectionContent': { maxWidth: 'inherit' } }} >
        <Heading as='h2' variant='sectionTitle'>
              Featured Items
        </Heading>

        <CardGroup
          label={t('common:search.recentAdditions')}
          toggleGroup='homepage'
          defaultDisplay='grid'
        >
          {
            nodes.map(item => {
              return (
                <ManifestCard
                  key={item}
                  label={item.title}
                  target={item.slug}
                  image={typy(item, 'childrenMarbleFile[0].iiif.thumbnail').safeString}
                  type={item.display}
                  creator={findMetadata(item, ['creator'])}
                  date={findMetadata(item, ['date', 'dates'])}
                />
              )
            })

          }
        </CardGroup>
      </NDBrandSection>
      <GoogleVerification />
    </React.Fragment>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default IndexPage
