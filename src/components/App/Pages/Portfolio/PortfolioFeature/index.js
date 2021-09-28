/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box, Divider, Heading } from 'theme-ui'
import PortfolioItems from '../PortfolioBody/PortfolioItems'
import Image from '@ndlib/gatsby-theme-marble/src/components/Shared/Image'
import PortfolioContext from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import Html from '@ndlib/gatsby-theme-marble/src/components/Shared/Html'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'
import NDBrandSectionLeftNav from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section/LeftNav'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import typy from 'typy'

const PortfolioFeature = ({ location, featuredJson, menusJson }) => {
  const [context] = useState({
    portfolio: featuredJson,
  })
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

        <Image
          src={featuredJson.imageUri.replace('!300,300', ',500')}
          title={featuredJson.title}
          imageStyle={{ display: 'block', maxHeight: '500px', margin: '3rem auto 0' }}
          alt=''
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
  menusJson: PropTypes.shape({
    label: PropTypes.string,
  }),
}

export default PortfolioFeature
