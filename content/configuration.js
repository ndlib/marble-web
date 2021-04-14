// configure environment variables
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
console.log('Using environment config:' + activeEnv)
console.log(process.env)

const eV = '.env.' + activeEnv
require('dotenv').config({
  path: eV,
})

const googleMapKey = process.env.GOOGLE_MAP_KEY || ''
const userContentPath = process.env.USER_CONTENT_PATH || ''
const authClientURL = process.env.AUTH_CLIENT_URL || ''
const authClientClientId = process.env.AUTH_CLIENT_ID || ''
const authClientIssuer = process.env.AUTH_CLIENT_ISSUER || ''
const searchUrl = process.env.SEARCH_URL || ''
const searchIndex = process.env.SEARCH_INDEX || ''
const s3BucketName = process.env.S3_DEST_BUCKET || ''
const allowRobots = process.env.ALLOW_ROBOTS || 'false'
const iiifViewerUrl = process.env.IIIF_VIEWER_URL || ''
const sourceGraphQlUrl = process.env.GRAPHQL_API_URL || ''
const graphQlKey = process.env.GRAPHQL_API_KEY || ''
const useFixtures = process.env.USE_FIXTURES || 'false'

console.table([
  { variable: 'SEARCH_INDEX:', value: searchIndex },
  { variable: 'SEARCH_URL:', value: searchUrl },
  { variable: 'GOOGLE_MAP_KEY:', value: googleMapKey },
  { variable: 'USER_CONTENT_PATH:', value: userContentPath },
  { variable: 'IIIF_VIEWER_URL:', value: iiifViewerUrl },
  { variable: 'AUTH_CLIENT_URL:', value: authClientURL },
  { variable: 'AUTH_CLIENT_ID:', value: authClientClientId },
  { variable: 'AUTH_CLIENT_ISSUER:', value: authClientIssuer },
  { variable: 'S3_DEST_BUCKET:', value: s3BucketName },
  { variable: 'ALLOW_ROBOTS', value: allowRobots },
  { variable: 'USE_FIXTURES', value: useFixtures },
  { variable: 'GRAPHQL_API_URL', value: sourceGraphQlUrl ? 'XXXXXX' : '' },
  { variable: 'GRAPHQL_API_KEY', value: graphQlKey ? 'XXXXXX' : '' },
])

module.exports = {
  // siteMetadata
  siteMetadata: {
    title: 'Digital Collections',
    author: 'ndlib',
    description: 'Notre Dame Digital Collections',
    siteUrl: 'https://marble.nd.edu',
    // apis and embedded urls
    // universalViewerBaseURL: 'https://viewer-iiif.library.nd.edu/universalviewer/index.html',

    // paths
    useLogin: true,
    authClient: {
      url: authClientURL,
      clientId: authClientClientId,
      issuer: authClientIssuer,
    },
    userContentPath: userContentPath,
    pruneMetadataWithNoImages: true,
    allowRobots: allowRobots,
    useFixtures: useFixtures === 'true',
    sourceGraphQlUrl: sourceGraphQlUrl,
    graphQlKey: graphQlKey,
    //
    languages: {
      default: 'en',
      allowed: ['en'],
    },
  },
}
