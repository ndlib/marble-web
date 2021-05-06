/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'
import PortfolioTitle from '../PortfolioBody/PortfolioTitle'
import PortfolioDescription from '../PortfolioBody/PortfolioDescription'
import PortfolioItems from '../PortfolioBody/PortfolioItems'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import PortfolioContext, { initialContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import ManifestImageGroup from '@ndlib/gatsby-theme-marble/src/components/Shared/ManifestImageGroup'

const PortfolioFeature = ({ portfolio, allMarbleFile, location, isOwner, features }) => {
  const updatePortfolio = (portfolio) => {
    setContext({ ...context, portfolio: portfolio })
  }
  const marbleItem = portfolio.items[0]
  const description = portfolio.description
  const formatRender = features ? (
      <div>
      <Flex>
          <Box sx={{
            width: '30vw',
            marginRight: '32px'
          }}>
            <div sx={{fontWeight:'bolder'}}>
              {features}
            </div>
          </Box>
          <Box sx={{
            width: '55vw',
            display: 'inline-block',
            right: '0'
          }}>
            <ManifestImageGroup
              location={location}
              marbleItem={marbleItem}
              allMarbleFile={allMarbleFile} 
            />
          </Box>
        </Flex> 
        <div className='clearfix' sx={{
              borderBottom: '6px solid',
              borderColor: 'primary',
              width: '85vw'
      }}/>
        <Flex>
          <Box sx={{
            width: '60vw'
          }}>
            <PortfolioItems
              isOwner={isOwner}
            />
          </Box>
          <Box sx={{
            width: '40vw'
          }}>
            <PortfolioDescription
              isOwner={isOwner}
            />
          </Box>
        </Flex> 
    </div>
  ) : (
    <div>
    <Flex>
        <Box sx={{
            width: '30vw',
            marginRight: '32px'
        }}>
          <div sx={{
            fontWeight:'bolder'
        }}>
            {description}
          </div>
        </Box>
        <Box sx={{
          width: '55vw',
        }}>
          <ManifestImageGroup
            location={location}
            marbleItem={marbleItem}
            allMarbleFile={allMarbleFile}
          />
        </Box>
      </Flex> 
      <div className='clearfix' sx={{
              borderBottom: '6px solid',
              borderColor: 'primary',
              width: '85vw'
      }}>
      </div>
      <Flex>
        <Box sx={{
          width: '1000vw'
        }}>
          <div sx={{
            fontWeight: 'bolder',
            fontSize: '120%',
            margin: '8px'
          }}>Collection Highlights</div>
          <PortfolioItems
            isOwner={isOwner}
          />
        </Box>
      </Flex> 
  </div>
  )
  
  const [context, setContext] = useState({
    ...initialContext,
    portfolio: portfolio,
    updatePortfolio: updatePortfolio,
  })
    return (
      <PortfolioContext.Provider value={context}>
        <Seo
          title={portfolio.title}
          location={location}
          data={{}}
          noIndex // = {portfolio.privacy !== 'public'}
        />
        <PortfolioTitle />
        <div sx={{
          height: '16px'
        }}/>
        {formatRender}
    </PortfolioContext.Provider>     
  )
}

PortfolioFeature.propTypes = {
  portfolio: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isOwner: PropTypes.bool,
}

export default PortfolioFeature
