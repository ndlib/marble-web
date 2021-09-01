/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, useThemeUI, Flex, Box, Heading, Button } from 'theme-ui'
import typy from 'typy'
import CardGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard/CardGroup'
import BrowseBar from '@ndlib/gatsby-theme-marble/src/components/Shared/BrowseBar'
import MarbleItemCard from '@ndlib/gatsby-theme-marble/src/components/Shared/DisplayCard/MarbleItemCard'
import { useTranslation } from 'react-i18next'
import findMetadata from 'utils/findMetadata'
import SearchVerification from './SearchVerification'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { FaPhotoVideo, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa'
import sx from './sx'

const IndexPage = ({ location }) => {
  const { t } = useTranslation()
  // jazz festival         "CJF_EAD",

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
  const theme = useThemeUI()
  const browseIconStyle = {
    color: theme.theme.colors.secondary,
    fontSize: '4rem',
  }
  return (
    <React.Fragment>
      <NDBrandSection variant='default' location={location} sx={{ justifyContent: 'center', mx: ['5vw', '5vw', '5vw', '5vw', 'auto'] }}>
        <Heading as='h1' sx={sx.pageTitle} variant='pageTitle'>Explore distinctive cultural heritage materials from the Hesburgh Libraries and the Snite Museum of Art.</Heading>
        <main>
          <Html html={t('common:hompageDescriptive')} />
        </main>
      </NDBrandSection>
      <NDBrandSection location={location} variant='fullBleedDark'>
        <Heading as='h2' variant='styles.h2' sx={{ color: 'white', fontSize: 7, pb: '1.5rem' }}>
          {t('common:search.browseBy')}
        </Heading>

        <Flex sx={{ flexWrap: 'wrap', width: '100%' }}>
          <Box sx={{ width: ['100%', '100%', '33.3%'], px: '1rem', py: '.5rem' }}>
            <BrowseBar
              label='Date'
              target='/browse?scrollto=date'
              image={<FaCalendarAlt style={browseIconStyle} />}
            />
          </Box>
          <Box sx={{ width: ['100%', '100%', '33.3%'], px: '1rem', py: '.5rem' }}>
            <BrowseBar
              label='Work Type'
              target='/browse?scrollto=format'
              image={<FaPhotoVideo style={browseIconStyle} />}
            />
          </Box>
          <Box sx={{ width: ['100%', '100%', '33%'], px: '1rem', py: '.5rem' }}>
            <BrowseBar
              label='Campus Location'
              target='/browse?scrollto=location'
              image={<FaMapMarkerAlt style={browseIconStyle} />}
            />
          </Box>
        </Flex>
        <Flex sx={{ width: '100%', pt: '2rem', pb: '.5rem' }}>
          <Button variant='primary'><Link to='/search?q='>Browse All Items <FaChevronRight style={{ color: theme.theme.colors.secondary }} /></Link></Button>
        </Flex>
      </NDBrandSection>
      <NDBrandSection
        location={location}
        variant='fullBleed'
        sx={{ px: 0 }}
      >
        <Heading as='h2' sx={{ fontSize: 7 }}>Featured Items</Heading>

        <CardGroup
          label={t('common:search.recentAdditions')}
          toggleGroup='homepage'
          defaultDisplay='grid'
        >
          {
            nodes.map(item => {
              return (
                <MarbleItemCard
                  key={item}
                  title={item.title}
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
      <SearchVerification />
    </React.Fragment>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}
export default IndexPage
