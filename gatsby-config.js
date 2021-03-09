const path = require('path')
const configuration = require('./content/configuration')
const s3BucketName = process.env.S3_DEST_BUCKET || ''

module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    'gatsby-transformer-json',
    'gatsby-transformer-marbleitem',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'menu',
        path: 'content/json/menus',
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'standard',
    //     path: 'content/json/standard',
    //   },
    // },
    {
      resolve: 'gatsby-source-appsync-marble-standard',
      options: {
        url: configuration.siteMetadata.sourceGraphQlUrl,
        key: configuration.siteMetadata.graphQlKey,
        website: 'marble',
      },
    },
    'gatsby-transformer-marbleitem',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'notHelpfulGraphQL',
        fieldName: 'notHelpfulGraphQL',
        url: configuration.siteMetadata.sourceGraphQlUrl,
        headers: {
          'x-api-key': configuration.siteMetadata.graphQlKey,
        },
      },
    },
    {
      resolve: '@ndlib/gatsby-theme-marble',
      options: {
        useLogin: configuration.siteMetadata.useLogin,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: configuration.siteMetadata.siteUrl,
        sitemap: configuration.siteMetadata.siteUrl + '/sitemap.xml',
        env: {
          development: {
            policy: [
              { userAgent: '*', disallow: ['/'] },
            ],
          },
          production: {
            policy: configuration.siteMetadata.allowRobots === 'true' ? [
              { userAgent: '*', disallow: ['/search', '/user'] },
            ] : [
              { userAgent: '*', disallow: ['/'] },
            ],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Digital Collections',
        short_name: 'Digital Collections',
        start_url: '/',
        background_color: '#0A233F',
        theme_color: '#0A233F',
        display: 'minimal-ui',
        icon: path.join(__dirname, 'content/images/manifestLogo.png'),
      },
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: s3BucketName,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-W3LR65V',
        defaultDataLayer: { platform: 'gatsby' },
        dataLayerName: 'schema',
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          'https://static.nd.edu',
          'https://image-iiif.library.nd.edu',
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'content', 'images'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
}
