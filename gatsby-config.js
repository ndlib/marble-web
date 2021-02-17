const configuration = require('./content/configuration')
const s3BucketName = process.env.S3_DEST_BUCKET || ''
const contentPath = 'content'

module.exports = {
  siteMetadata: configuration.siteMetadata,
  plugins: [
    'gatsby-transformer-marbleitem',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'standard',
        path: 'content/json/standard',
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'menu',
        path: `${contentPath}/json/menus`,
      },
    },
    // {
    //   resolve: 'gatsby-source-appsync-marble-standard',
    //   options: {
    //     url: 'XXXXXX',
    //     key: 'XXXXXX',
    //   },
    // },
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
              { userAgent: '*', disallow: ['/search', '/user', '/item/*/mirador'] },
            ] : [
              { userAgent: '*', disallow: ['/'] },
            ],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: configuration.manifest,
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
  ],
}
