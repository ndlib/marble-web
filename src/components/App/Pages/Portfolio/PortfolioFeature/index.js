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
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import typy from 'typy'

const PortfolioFeature = ({ location, featuredJson, menusJson }) => {
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
  const menu = typy(menusJson, 'items').safeArray
  return (
    <NDBrandSectionLeftNav>
      <NDBrandSection variant='sidebar'>
        <Menu location={location} variant='navLeft' items={menu} label={menusJson.label} />
      </NDBrandSection>
      <NDBrandSection variant='defaultWithSidebar'>
        <NDBrandBreadcrumbs
          currentPageTitle={featuredJson.title}
          breadcrumbs={[{ url: '/featured', title: 'Featured Portfolios' }]}
        />
        <Heading as='h1' variant='pageTitle'>{featuredJson.title}</Heading>
        <Html html={description} />

        <ManifestImageGroup
          location={location}
          marbleItem={marbleItem}
          allMarbleFile={{}}
        />

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
    </NDBrandSectionLeftNav>
  )
}

PortfolioFeature.propTypes = {
  featuredJson: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default PortfolioFeature
