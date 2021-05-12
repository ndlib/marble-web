/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from '@ndlib/gatsby-theme-marble/src/components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import NDBrandHeroFullBleed from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Hero/FullBleed'
import IndexPage from 'components/Pages/IndexPage'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from 'components/Shared/Link'

const Home = ({ data, location }) => {
  const { file } = data
  const image = getImage(file)

  return (
    <Layout
      location={location}
    >
      <Seo
        data={data}
        location={location}
      />
      <NDBrandHeroFullBleed location={location}
        variant='homepage'
        title='Manuscript and print sources for the study of Inquisition history'
        lede="The materials featured on this website are from the University of Notre Dame's Harley Inquisition Collection"
        image={(<GatsbyImage image={image} alt=''loading='eager' />)}
        button={(<Button variant='primary' to='/' sx={{ display: 'block' }}><Link to='/search'>Browse Collection</Link></Button>)}
      />
      <I18nextProvider i18n={i18next}>
        <IndexPage location={location} />
      </I18nextProvider>

    </Layout>
  )
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default Home

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    file(relativePath: { eq: "Absolution.Header.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        gatsbyImageData(
          width: 1600
          height: 700
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )      }
    }

  }
`
