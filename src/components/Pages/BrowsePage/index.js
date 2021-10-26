/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Flex, Box, Heading } from 'theme-ui'
import MiniCard from '@ndlib/gatsby-theme-marble/src/components/Shared/MiniCard'
import NDBrandSection from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Section'
import NDBrandBreadcrumbs from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Breadcrumbs'

const Browse = () => {
  const dates = [
    {
      label: 'Pre-1400',
      target: '/search?timeperiod[0]=Pre-1400&images[0]=true',
    },
    {
      label: '1400-1499',
      target: '/search?timeperiod[0]=1400-1499&images[0]=true',
    },
    {
      label: '1500-1599',
      target: '/search?timeperiod[0]=1500-1599&images[0]=true',
    },
    {
      label: '1600-1699',
      target: '/search?timeperiod[0]=1600-1699&images[0]=true',
    },
    {
      label: '1700-1799',
      target: '/search?timeperiod[0]=1700-1799&images[0]=true',
    },
    {
      label: '1800-1899',
      target: '/search?timeperiod[0]=1800-1899&images[0]=true',
    },
    {
      label: '1900-1999',
      target: '/search?timeperiod[0]=1900-1999&images[0]=true',
    },
    {
      label: '2000-present',
      target: '/search?timeperiod[0]=2000-present&images[0]=true',
    },
    {
      label: 'undated',
      target: '/search?timeperiod[0]=undated&images[0]=true',
    },
  ]
  const formats = [
    {
      label: 'Paintings',
      target: '/search?format[0]=paintings&images[0]=true',
    },
    {
      label: 'Maps',
      target: '/search?format[0]=Map&images[0]=true',
    },
    {
      label: 'Photographs',
      target: '/search?format[0]=photographs&images[0]=true',
    },
    {
      label: 'Prints and posters',
      target: '/search?format[0]=prints&format[1]=Graphic&images[0]=true',
    },
    {
      label: 'Drawings',
      target: '/search?format[0]=drawings&images[0]=true',
    },
    {
      label: 'Sculpture',
      target: '/search?format[0]=sculpture&images[0]=true',
    },
    {
      label: 'Ceremonial objects and regalia',
      target: '/search?format[0]=ceremonial%20objects%20and%20regalia&images[0]=true',

    },
    {
      label: 'Decorative arts, craft, and design',
      target: '/search?format[0]=ceramics&format[1]=glass&format[2]=metalwork&images[0]=true',
    },
    {
      label: 'Musical scores and recordings',
      target: '/search?format[0]=Musical%20sound%20recording&format[1]=Notated%20music&format[2]=Sound&format[3]=Score&images[0]=true',
    },
    {
      label: 'Texts',
      target: '/search?format[0]=Serial&format[1]=Book&format[2]=manuscripts&format[3]=Newspaper&format[4]=Document&format[5]=Language%20material&format[6]=Fiction&images[0]=true',
    },
    {
      label: 'Textiles',
      target: '/search?format[0]=textiles&images[0]=true',
    },
    {
      label: 'Tools, implements, and weights',
      target: '/search?format[0]=tools%2C%20implements%2C%20and%20weights&images[0]=true',
    },
    {
      label: 'Costume and accessories',
      target: '/search?format[0]=costume%20and%20accessories&images[0]=true',
    },
    {
      label: 'Arms and armor',
      target: '/search?format[0]=arms%20and%20armor&images[0]=true',
    },
    {
      label: 'Building components and ornaments',
      target: '/search?format[0]=building%20components&format[1]=house%20ornaments&images[0]=true',
    },
    {
      label: 'Dolls, toys, and games',
      target: '/search?format[0]=dolls%2C%20toys%2C%20and%20games&images[0]=true',
    },
  ]
  const locations = [
    {
      label: 'Rare Books & Special Collections',
      target: '/search?campuslocation[0]=Rare%20Books%20%26%20Special%20Collections&images[0]=true',
    },
    {
      label: 'Snite Museum of Art',
      target: '/search?campuslocation[0]=Snite%20Museum%20of%20Art&images[0]=true',
    },
    {
      label: 'University Archives',
      target: '/search?campuslocation[0]=University%20Archives&images[0]=true',
    },
    {
      label: 'General Collection, Hesburgh Libraries',
      target: '/search?campuslocation[0]=General%20Collection%2C%20Hesburgh%20Libraries&images[0]=true',
    },
  ]
  return (
    <>
      <NDBrandSection variant='fullBleed'>
        <NDBrandBreadcrumbs
          currentPageTitle='Browse'
          breadcrumbs={[]}
        />
        <main>
          <Heading as='h1' variant='pageTitle'>Browse</Heading>
          <Flex sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ width: ['100%', '20%'], px: '1rem', py: '1rem' }}>
              <div id='date'>
                <Heading as='h2'>Browse By Date</Heading>
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
                <Heading as='h2'>Browse By Work Type</Heading>
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
                <Heading as='h2'>Browse By Location</Heading>
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
        </main>
      </NDBrandSection>
    </>
  )
}

export default Browse
