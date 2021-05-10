/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box, Divider } from 'theme-ui'
import PortfolioItems from '../PortfolioBody/PortfolioItems'
import ManifestImageGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/ManifestImageGroup'
import PortfolioContext, { initialContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'

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
    <div>
      <Flex>
        <Box sx={{
          width: '30vw',
          marginRight: '32px',
        }}
        >
          <div
            sx={{
              wordBreak: 'break-word',
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Box>
        <Box sx={{
          width: '55vw',
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
    </div>
  )
}

PortfolioFeature.propTypes = {
  featuredJson: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default PortfolioFeature
