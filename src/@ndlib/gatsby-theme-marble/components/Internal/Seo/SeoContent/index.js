import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import CanonicalLink from '@ndlib/gatsby-theme-marble/src/components/Internal/Seo/SeoContent/CanonicalLink'
// import SchemaLink from './SchemaLink'
import MetaTagGroup from '@ndlib/gatsby-theme-marble/src/components/Internal/Seo/SeoContent/MetaTagGroup'
import DataLayer from './DataLayer'
import { getOpenGraph, getTwitter } from '@ndlib/gatsby-theme-marble/src/components/Internal/Seo/SeoContent/data'

export const SeoContent = ({
  title,
  url,
  description,
  image,
  lang,
  pathname,
  author,
  siteTitle,
  siteUrl,
  noIndex,
}) => {
  const openGraph = getOpenGraph(url, title, description, image)
  const twitter = getTwitter(author, title, description, image)
  const titleFix = title.includes('Mirador Viewer') ? title : `${title} | ${siteTitle}`
  let indexable = null
  if (noIndex === true) {
    indexable = (
      <Helmet>
        <meta name='robots' content='noindex' />
      </Helmet>
    )
  }
  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{ lang }}
        title={title}
        titleTemplate={title === siteTitle ? `${siteTitle}` : `${titleFix}`}
        meta={[
          {
            name: `description`,
            content: description,
          },
        ]}
      />
      <CanonicalLink base={siteUrl} pathname={pathname} />
      <MetaTagGroup tags={openGraph} />
      <MetaTagGroup tags={twitter} />
      <DataLayer title={title} description={description} author={author} image={image} url={url} />
      {indexable}
    </React.Fragment>
  )
}

SeoContent.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
  pathname: PropTypes.string,
  author: PropTypes.string.isRequired,
  siteUrl: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  noIndex: PropTypes.bool,
  seeAlso: PropTypes.string,
}

SeoContent.defaultProps = {
  lang: 'none',
  noIndex: false,
}

export default SeoContent
