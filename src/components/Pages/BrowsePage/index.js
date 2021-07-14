/** @jsx jsx */
import React from 'react'
import { jsx, Flex, Box, Heading } from 'theme-ui'
import MiniCard from '@ndlib/gatsby-theme-marble/src/components/Shared/MiniCard'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

const Browse = ({ location }) => {
  const dates = [
    {
      label: '1300-1399',
      target: '/search?timeperiod[0]=1300-1399',
    },
    {
      label: '1400-1499',
      target: '/search?timeperiod[0]=1400-1499',
    },
    {
      label: '1500-1599',
      target: '/search?timeperiod[0]=1500-1599',
    },
    {
      label: '1600-1699',
      target: '/search?timeperiod[0]=1600-1699',
    },
    {
      label: '1700-1799',
      target: '/search?timeperiod[0]=1700-1799',
    },
    {
      label: '1800-1899',
      target: '/search?timeperiod[0]=1800-1899',
    },
    {
      label: '1900-1999',
      target: '/search?timeperiod[0]=1900-1999',
    },
    {
      label: '2000-present',
      target: '/search?timeperiod[0]=2000-present',
    },
    {
      label: 'undated',
      target: '/search?timeperiod[0]=undated',
    },
  ]
  const formats = [
    {
      label: 'Paintings',
      target: '/search?format[0]=paintings',
    },
    {
      label: 'Maps',
      target: '/search?format[0]=Map',
    },
    {
      label: 'Photographs',
      target: '/search?format[0]=photographs',
    },
    {
      label: 'Prints and posters',
      target: '/search?format[0]=prints&format[1]=Two-dimensional%20nonprojected%20graphic&format[2]=Projected%20medium',
    },
    {
      label: 'Drawings',
      target: '/search?format[0]=drawings',
    },
    {
      label: 'Sculpture',
      target: '/search?format[0]=sculpture',
    },
    {
      label: 'Ceremonial objects and regalia',
      target: '/search?format[0]=ceremonial%20objects%20and%20regalia',

    },
    {
      label: 'Decorative arts, craft, and design',
      target: '/search?format[0]=ceramics&format[1]=glass&format[2]=metalwork',
    },
    {
      label: 'Musical scores and recordings',
      target: '/search?format[0]=Musical%20sound%20recording&format[1]=Notated%20music',
    },
    {
      label: 'Texts',
      target: '/search?format[0]=Language material',
    },
    {
      label: 'Textiles',
      target: '/search?format[0]=textiles',
    },
    {
      label: 'Tools, implements, and weights',
      target: '/search?format[0]=tools%2C%20implements%2C%20and%20weights',
    },
    {
      label: 'Costume and accessories',
      target: '/search?format[0]=costume%20and%20accessories',
    },
    {
      label: 'Arms and armor',
      target: '/search?format[0]=arms%20and%20armor',
    },
    {
      label: 'Building components and ornaments',
      target: '/search?format[0]=building%20components&format[1]=house%20ornaments',
    },
    {
      label: 'Dolls, toys, and games',
      target: '/search?format[0]=dolls%2C%20toys%2C%20and%20games',
    },
  ]
  const locations = [
    {
      label: 'Rare Books & Special Collections',
      target: '/search?campuslocation[0]=Rare%20Books%20%26%20Special%20Collections',
    },
    {
      label: 'Snite Museum of Art',
      target: '/search?campuslocation[0]=Snite%20Museum%20of%20Art',
    },
    {
      label: 'University Archives',
      target: '/search?campuslocation[0]=University%20Archives',
    },
    {
      label: 'General Collection, Hesburgh Libraries',
      target: '/search?campuslocation[0]=General%20Collection%2C%20Hesburgh%20Libraries',
    },
  ]
  return (
    <>
      <NDBrandSection variant='fullBleed'>
        <NDBrandBreadcrumbs
          currentPageTitle='About'
          breadcrumbs={[]}
        />
        <Heading as='h1' variant='pageTitle'>Browse</Heading>
        <Flex sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ width: ['100%', '20%'], px: '1rem', py: '1rem' }}>
            <div id='date'>
              <Heading as='h1'>Browse By Date</Heading>
            </div>
          </Box>
          <Box sx={{ width: ['100%', '80%'], px: '1rem', py: '1rem' }}>
            <Flex sx={{ flexWrap: 'wrap' }}>
              {
                dates.map(date => {
                  return (
                    <Box key={date.label} sx={{ width: ['100%', '50%', '50%', '33.33%'], px: '1rem', pb: '2rem' }}>
                      <MiniCard
                        label={date.label}
                        target={date.target}
                      />
                    </Box>
                  )
                })
              }
            </Flex>
          </Box>
        </Flex>
        <Flex sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ width: ['100%', '20%'], px: '1rem', py: '1rem' }}>
            <div id='format'>
              <Heading as='h1'>Browse By Work Type</Heading>
            </div>
          </Box>
          <Box sx={{ width: ['100%', '80%'], px: '1rem', py: '1rem' }}>
            <Flex sx={{ flexWrap: 'wrap' }}>
              {
                formats.map(format => {
                  return (
                    <Box key={format.label} sx={{ width: ['100%', '50%', '50%', '33.33%'], px: '1rem', pb: '2rem' }}>
                      <MiniCard
                        label={format.label}
                        target={format.target}
                      />
                    </Box>
                  )
                })
              }
            </Flex>
          </Box>
        </Flex>
        <Flex sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ width: ['100%', '20%'], px: '1rem', py: '1rem' }}>
            <div id='location'>
              <Heading as='h1'>Browse By Location</Heading>
            </div>
          </Box>
          <Box sx={{ width: ['100%', '80%'], px: '1rem', py: '1rem' }}>
            <Flex sx={{ flexWrap: 'wrap' }}>
              {
                locations.map(location => {
                  return (
                    <Box key={location.label} sx={{ width: ['100%', '50%', '50%', '33.33%'], px: '1rem', pb: '2rem' }}>
                      <MiniCard
                        label={location.label}
                        target={location.target}
                      />
                    </Box>
                  )
                })
              }
            </Flex>
          </Box>
        </Flex>
      </NDBrandSection>
    </>
  )
}

export default Browse
