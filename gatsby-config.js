const path = require('path')
const elasticQuery = require('./content/elastic/query')
const elasticSettings = require('./content/elastic/settings')
const elasticMappings = require('./content/elastic/mappings')
const elasticSelector = require('./content/elastic/selector')
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
console.log('Using environment config:' + activeEnv)

const eV = '.env.' + activeEnv
require('dotenv').config({
  path: eV,
})

const siteUrl = 'https://marble.nd.edu'
const siteName = 'Marble: Museums, Archives, Rare Books & Libraries Exploration'
const searchUrl = process.env.SEARCH_URL || ''
const searchIndex = process.env.SEARCH_INDEX || ''
const s3BucketName = process.env.S3_DEST_BUCKET || ''
const allowRobots = process.env.ALLOW_ROBOTS === 'true' || false
const sourceGraphQlUrl = process.env.GRAPHQL_API_URL || ''
const graphQlKey = process.env.GRAPHQL_API_KEY || ''
const useFixtures = process.env.USE_FIXTURES || !!process.env.GITHUB_ACTIONS || false
const iiifViewerUrl = process.env.IIIF_VIEWER_URL || null

module.exports = {
  flags: {
    DEV_SSR: true,
    PRESERVE_WEBPACK_CACHE: false,
  },
  siteMetadata: {
    title: siteName,
    subTitle: '',
    author: 'University of Notre Dame, Hesuburgh Libraries, and Snite Museum of Art',
    description: 'The Marble site is a collaboration between the Hesburgh Libraries and the Snite Museum of Art at the University of Notre Dame. In this unified discovery space, users have free, public access to a selection of digitized, distinctive cultural heritage materials.',
    siteUrl: siteUrl,
    languages: {
      default: 'en',
      allowed: ['en'],
    },
  },
  plugins: [
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'menu',
        path: 'content/json/menus',
      },
    },
    {
      resolve: '@ndlib/gatsby-source-appsync-marble',
      options: {
        url: sourceGraphQlUrl,
        key: graphQlKey,
        website: 'marble',
        iiifRoot: 'https://iiif-manifest.library.nd.edu',
        timePeriodCutoff: 1400,
        useFixtures: useFixtures,
        // updateFixtures: true,
        // debug: true,
        // logIds: true,
        mergeItems: [
          {
            parentId: 'CJF_EAD',
            childId: 'aspace_0d7c59e17cb4e513ffd55cabdd751059',
          },
        ],
      },
    },
    {
      resolve: '@ndlib/gatsby-plugin-marble-elasticsearch',
      options: {
        url: searchUrl,
        searchIndex: searchIndex,
        region: 'us-east-1',
        query: elasticQuery,
        selector: elasticSelector,
        settings: elasticSettings,
        mappings: elasticMappings,
      },
    },
    {
      resolve: '@ndlib/gatsby-theme-marble',
      options: {
        iiifViewerUrl: iiifViewerUrl,
        searchUrl: searchUrl,
        searchIndex: searchIndex,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-okta-auth',
    //   options: {
    //     domain: 'https://okta.nd.edu',
    //     issuer: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
    //     clientId: '0oa1f3ut0aKpdwap5357',
    //     redirectUri: 'http://localhost:8000/user',
    //     scopes: ['openid', 'email', 'profile', 'netid', 'directory'],
    //     pkce: false,
    //     responseType: ['id_token','token'],
    //     callbackPath: '/user',
    //   },
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, '/content/pages'),
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
      // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: siteUrl + '/sitemap.xml',
        env: {
          development: {
            policy: [
              { userAgent: '*', disallow: ['/'] },
            ],
          },
          production: {
            policy: allowRobots
              ? [
                { userAgent: '*', disallow: ['/search', '/user', '/stats'] },
              ]
              : [
                { userAgent: '*', disallow: ['/'] },
              ],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteName,
        short_name: 'Marble',
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
        name: 'featured',
        path: path.join(__dirname, 'content', 'json', 'featured'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'content', 'images'),
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve : 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, 'src/pages/app'),
      },
    },
  ],
}
