/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { I18nextProvider } from 'react-i18next'
import i18next from '@ndlib/gatsby-theme-marble/src/i18n'
import Layout from '../components/Layout'
import Seo from '@ndlib/gatsby-theme-marble/src/components/Shared/Seo'
import NDBrandHeroFullBleed from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Hero/FullBleed'
import IndexPage from '../components/Pages/IndexPage'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import NDBrandNavSearch from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Header/NavSearch'

const Home = ({ data, location }) => {
  const { file } = data
  const image = getImage(file)

  return (
    <Layout
      location={location}
      pageHeader={
        <NDBrandHeroFullBleed location={location}
          variant='fullBleed'
          title='Explore distinctive cultural heritage materials from the Hesburgh Libraries and the Snite Museum of Art.'
          image={(<GatsbyImage image={image} alt='Painting Absolution Underfire by Paul Henry Wood. The painting captures the dramatic moment before the fighting started when Rev. William J. Corby, C.S.C., then chaplain of the 88th New York Regiment, one of five regiments in the legendary Irish Brigade, stood upon a boulder and addressed the troops. Exposing himself to enemy fire, with cannonballs exploding nearby and bullets whistling overhead, Corby exhorted the soldiers to remember the noble cause and sacred nature of their duty.' width='100%' height='100%' objectFit='cover' loading='eager' />)}
          button={(<NDBrandNavSearch location={location} variant='hero.navSearch' searchPath='/search' />)}
          link='item/1976.057'
          attribution='Absolution under Fire'
        />
      }
    >
      <Seo
        data={data}
        location={location}
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
          width: 2200
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP, AVIF]
        )      }
    }

  }
`
