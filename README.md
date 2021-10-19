# marble
Git submodule for [Marble: Museums, Archives, Rare Books & Library Exploration](https://marble.nd.edu).

# Local Setup.
1. Assume an aws role that can access the keys at the path set in ./scripts/setup-development.sh
2. ./scripts/setup-development.sh marble
3. ./scripts/reset-local-files.sh marble
4. ./scripts/reset-local-search-index.sh marble

`yarn develop`

From then on until the graphql keys expire you can just call
yarn develop

## If the graphql keys expire.
1. Call ./scripts/setup-development.sh marble

Note:
This will reset all the keys to the ones in .env.development-example
