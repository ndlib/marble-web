/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, Box, Flex } from 'theme-ui'
import typy from 'typy'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import sniteLogo from '../../../../assets/images/Snite.One.Line.W.svg'
import libraryLogo from '../../../../assets/images/hesburgh_mark_H2_white.svg'
import ClickableMarbleLogoMono from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Logos/ClickableMarbleLogoMono'
import sx from './sx'

export const menuQuery = graphql`
  query {
    menusJson(menuId: {eq: "footer"}) {
      menuId
      label
      items {
        menuId
        label
        link
      }
    }
  }
`

const footerSx = {
  bg: 'primary',
  bottom: 0,
  color: 'white',
  left: 0,
  minHeight: '64px',
  overflow: 'hidden',
  position: 'static',
}

export const Footer = ({ location, variant }) => {
  const { menusJson } = useStaticQuery(menuQuery)
  const menu = typy(menusJson, 'items').safeArray
  return (
    <footer sx={footerSx} variant={'footer.' + variant}>
      <Flex variant={`footer.${variant}`} sx={{
        flexWrap: 'wrap',
        width: '100%',
        minWidth: '90vw',
      }}>
        <Box sx={{ width: ['100%', '100%', '100%', '33%'], pl: '5vw', pr: ['5vw', '5vw', '5vw', '4rem'], py: '4rem' }}>
          <Link
            variant='footer'
            to='https://sniteartmuseum.nd.edu/'
            sx={sx.imageWrapper}
          >
            <img
              src={sniteLogo}
              sx={sx.image}
              alt='Snite Art Museum'
            />
          </Link>
          <div className='contact-info' sx={{ mt: '2rem' }}>
            <div className='address' property='address' typeof='PostalAddress'>
              <span property='streetAddress'>100 Moose Krause Circle</span><br />
              <span property='addressLocality'>Notre Dame</span>, <span property='addressRegion'>IN</span> <span property='postalCode'>46556</span> <span property='addressCountry'>USA</span>
            </div>
            <div className='footer-phone' property='telephone' content='+1 574-631-5466'>Phone <Link variant='footer' to='tel:+15746315466'>(574) 631–5466</Link></div>
            <div className='footer-email' property='email'><Link variant='footer' to='mailto:RMMACollections@nd.edu'>RMMACollections@nd.edu</Link></div>
          </div>
        </Box>
        <Box sx={{
          width: ['100%', '100%', '100%', '33%'],
          px: ['5vw', '5vw', '5vw', '4rem'],
          py: '4rem',
        }}>
          <Link
            variant='footer'
            to='https://library.nd.edu'
            sx={sx.imageWrapper}
          >
            <img
              src={libraryLogo}
              sx={sx.image}
              alt='Hesburgh Library'
            />
          </Link>
          <div className='contact-info' sx={{ mt: '2rem' }}>
            <div className='address' property='address' typeof='PostalAddress'>
              <span property='streetAddress'>284 Hesburgh Library</span><br />
              <span property='addressLocality'>Notre Dame</span>, <span property='addressRegion'>IN</span> <span property='postalCode'>46556</span> <span property='addressCountry'>USA</span>
            </div>
            <div className='footer-phone' property='telephone' content='+1 (574) 631-6258'>Phone <Link variant='footer' to='tel:+15746316258'>(574) 631-6258</Link></div>
            <div className='footer-email' property='email'><Link variant='footer' to='mailto:asklib@nd.edu'>asklib@nd.edu</Link></div>
          </div>
          <div sx={sx.copyright} className='copyright'><Link variant='footer' to='https://www.nd.edu/copyright/'>&copy; {new Date().getFullYear()}</Link> <Link variant='footer' to='https://www.nd.edu'>University of Notre Dame</Link></div>
        </Box>
        <Box sx={{
          width: ['100%', '100%', '100%', '34%'],
          justifyContent: 'left',
          pl: ['5vw', '5vw', '5vw', '4rem'],
          pr: '5vw',
          py: '4rem',
          bg:'primaryBright',
          '& img': {
            mb: '2rem',
          },
        }}>
          <div sx={{ display: 'flex', justifyContent: 'center' }}>
            <ClickableMarbleLogoMono url='/' />
          </div>
          <Menu variant='menuFooter' location={location} items={menu} />
        </Box>
      </Flex>
    </footer>
  )
}

Footer.propTypes = {
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}

Footer.defaultProps = {
  variant: 'default',
}

export default Footer
