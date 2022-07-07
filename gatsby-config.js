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

const siteUrl = process.env.BUILD_ENVIRONMENT === 'production' ? 'https://marble.nd.edu' : 'https://marble-test.library.nd.edu'
const siteName = 'Marble: Museums, Archives, Rare Books & Libraries Exploration'
const s3BucketName = process.env.S3_DEST_BUCKET || 'ci-bucket'
const allowRobots = process.env.BUILD_ENVIRONMENT === 'production' || false
const sourceGraphQlUrl = process.env.GRAPHQL_API_URL
const graphQlKey = process.env.GRAPHQL_API_KEY
const useFixtures = !!process.env.GITHUB_ACTIONS || false
const iiifViewerUrl = process.env.IIIF_VIEWER_URL || 'https://viewer-iiif.library.nd.edu/marble/?manifest='

// OpenSearch
const opensearchEndpoint = process.env.OPENSEARCH_ENDPOINT || ''
const opensearchMasterUsername = process.env.OPENSEARCH_MASTER_USERNAME
const opensearchMasterPassword = process.env.OPENSEARCH_MASTER_PASSWORD
const opensearchReadOnlyUsername = process.env.OPENSEARCH_READONLY_USERNAME || 'readOnly'
const opensearchReadOnlyPassword = process.env.OPENSEARCH_READONLY_PASSWORD || 'readOnly1!'

const opensearchAuth = encodeURIComponent(opensearchMasterUsername) + ':' + encodeURIComponent(opensearchMasterPassword)
const readAuth = encodeURIComponent(opensearchReadOnlyUsername) + ':' + encodeURIComponent(opensearchReadOnlyPassword)
const opensearchIndexingUrl = opensearchEndpoint.replace('https://', 'https://' + opensearchAuth + '@') + ':443'

const searchIndex = process.env.SEARCH_INDEX || 'marble'

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
        // itemList: [{ itemId: 'BPP1001_EAD' }],
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
        url: opensearchIndexingUrl,
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
        searchUrl: opensearchEndpoint,
        searchIndex: searchIndex,
        readAuth: readAuth,
      },
    },
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
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'AppSync',
        fieldName: 'appSync',
        url: process.env.PUBLIC_GRAPHQL_API_URL || 'https://t8mhrjrn63.execute-api.us-east-1.amazonaws.com/prod/query/getPortfolioCollection',
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: siteUrl + '/sitemap/sitemap-index.xml',
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
