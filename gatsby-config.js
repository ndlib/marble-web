const path = require('path')
const elasticQuery = require('./content/elastic/query')
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
const opensearchMasterPassword = process.env.OPENSEARCH_MASTER_PASSWORD
const opensearchReadOnlyUsername = process.env.OPENSEARCH_READONLY_USERNAME || 'readOnly'
const opensearchReadOnlyPassword = process.env.OPENSEARCH_READONLY_PASSWORD || 'readOnly1!'

const readAuth = encodeURIComponent(opensearchReadOnlyUsername) + ':' + encodeURIComponent(opensearchReadOnlyPassword)

const searchIndex = process.env.OPENSEARCH_INDEX || process.env.SEARCH_INDEX || 'marble'

module.exports = {
  trailingSlash: 'never',
  flags: {},
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
        // itemList: [{ itemId: '002204685' }, { itemId: '004789783' }, { itemId: '005095911' }, { itemId: '1978.025.001' }, { itemId: '2008.026.008'}, { itemId: '2000.031' }, { itemId: '2010.030' }, { itemId: 'BPP1001_EAD' }, { itemId: 'MSNEa8006_EAD' }], // front page items
        // itemList: [{ itemId: 'MSPFEFER_EAD' }], // wrestling collection
        mergeItems: [
          {
            parentId: 'CJF_EAD',
            childId: 'aspace_0d7c59e17cb4e513ffd55cabdd751059',
          },
        ],
      },
    },
    {
      resolve: '@ndlib/aws-opensearch',
      options: {
        opensearch_hostname: opensearchEndpoint,
        opensearch_password: opensearchMasterPassword,
        opensearch_port: 443,
        opensearch_protocol: 'https',
        index_name: searchIndex,
        content_grouping: 'bulk',
        query: elasticQuery,
        unique_id:'id',
        selector: elasticSelector,
        mappings: elasticMappings,
      },
    },
    {
      resolve: '@ndlib/gatsby-theme-marble',
      options: {
        iiifViewerUrl: iiifViewerUrl,
        searchUrl: opensearchEndpoint.includes('https://') ? opensearchEndpoint : 'https://' + opensearchEndpoint,
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
        // Footnotes mode (default: true)
        footnotes: true,
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
        url: 'https://t8mhrjrn63.execute-api.us-east-1.amazonaws.com/prod/query/getPortfolioCollection',
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
