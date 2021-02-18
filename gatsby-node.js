exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const marbleResult = await graphql(`
    {
      allMarbleItem {
        nodes {
          id
          slug
        }
      }
    }
  `)

  const marbleItems = marbleResult.data && marbleResult.data.allMarbleItem ? marbleResult.data.allMarbleItem.nodes : []
  marbleItems.forEach(node => {
    if (node.id) {
      createPage({
        path: node.slug,
        component: require.resolve('./src/templates/marble-item.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          id: node.id,
          iiifUri: node.iiifUri,
        },
      })
    }
  })
}
