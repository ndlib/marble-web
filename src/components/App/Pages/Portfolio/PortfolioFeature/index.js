/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box, Divider, Heading } from 'theme-ui'
import PortfolioItems from '../PortfolioBody/PortfolioItems'
import ManifestImageGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/ManifestImageGroup'
import PortfolioContext, { initialContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

const PortfolioFeature = ({ location, featuredJson }) => {
  // This is a hack for proof of concept
  // TODO refactor ManifestImageGroup
  const [context] = useState({
    ...initialContext,
    portfolio: featuredJson,
  })
  const marbleItem = {
    childrenMarbleFile: [{
      fileType: 'image',
      iiif: {
        default: featuredJson.items[0].image.replace('!250,250', 'full'),
      },
    }],
    iiifUri: featuredJson.items[0].manifest,
    title: featuredJson.title,
  }
  const description = featuredJson.description
  return (

    <NDBrandSection variant='fullBleed'>
      <NDBrandBreadcrumbs
        currentPageTitle={featuredJson.title}
        breadcrumbs={[{ url: '/featured', title: 'Featured' }]}
      />
      <Heading as='h1' variant='pageTitle'>{featuredJson.title}</Heading>
      <Flex sx={{
        flexWrap: 'wrap',
        width: '90vw',
        maxWidth: '90vw',
      }}>
        <Box sx={{
          width: ['100%', '100%', '100%', '30vw'],
          maxWidth: '65rem',
          pr: '1vw',
        }}
        >
          <Html html={description} />
        </Box>
        <Box sx={{
          width: ['100%', '100%', '100%', '60vw'],
          pt: ['1rem', '1rem', '1rem', 0],
        }}
        >
          <ManifestImageGroup
            location={location}
            marbleItem={marbleItem}
            allMarbleFile={{}}
          />
        </Box>
      </Flex>
      <Divider sx={{
        borderTop: '2px solid',
        borderColor: '#337684',
        marginBottom: ['2rem', '3rem', '3rem'],
        marginTop: ['2rem', '3rem', '3rem'],
        maxWidth: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      />
      <Flex>
        <Box sx={{
          width: '1000vw',
        }}
        >
          <h2>Collection Highlights</h2>
          <PortfolioContext.Provider value={context}>
            <PortfolioItems
              isOwner={false}
            />
          </PortfolioContext.Provider>
        </Box>
      </Flex>
    </NDBrandSection>
  )
}

PortfolioFeature.propTypes = {
  featuredJson: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default PortfolioFeature
