const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const marbleResult = await graphql(`
    {
      allMarbleItem {
        nodes {
          id
          slug
          sourceType
          sourceSystem
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

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: {frontmatter: {date: ASC}}, limit: 1000) {
          nodes {
            id
            frontmatter {
              template
              slug
              menu
            }
          }
        }
      }
    `,
  )

  if (result.errors) {
    reporter.panicOnBuild(
      'There was an error loading your blog posts',
      result.errors,
    )
    return
  }

  const pages = result.data.allMarkdownRemark.nodes
  // Create pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (pages.length > 0) {
    pages.forEach((page, index) => {
      const previousPostId = index === 0 ? null : pages[index - 1].id
      const nextPostId = index === pages.length - 1 ? null : pages[index + 1].id
      // Define a template for blog post
      const pageTemplate = path.resolve(`./src/templates/${page.frontmatter.template}`)
      createPage({
        path: page.frontmatter.slug,
        component: pageTemplate,
        context: {
          id: page.id,
          slug: page.frontmatter.slug,
          menu: page.frontmatter.menu,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}
