/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const linkResolver = doc => {
  const toTypeString = typeof doc === "string"
  var to = undefined
  if (!toTypeString) {
    const linkTypes = {
      "Link.document": doc => `/${doc._meta.uid}`,
      "Link.web": doc => doc.url,
      // File and Image to be added when we get to them
    }
    to = linkTypes[doc._linkType]
    if (to === undefined) {
      console.error("Error: unable to parse the Link", doc)
      return "/"
    }
    return to(doc)
  }
  return doc
}


exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      query Redirects {
        prismic {
          allRedirects {
            edges {
              node {
                title
                url {
                  ...link
                }
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
      fragment link on PRISMIC__Linkable {
        _linkType
        ... on PRISMIC__Document {
          _meta {
            uid
            id
          }
        }
        ... on PRISMIC__FileLink {
          url
          name
          size
          _linkType
        }
        ... on PRISMIC__ImageLink {
          url
          name
          size
          height
          width
          _linkType
        }
        ... on PRISMIC__ExternalLink {
          url
          _linkType
        }
      }
    `).then(result => {
      {
        result.data &&
          result.data.prismic.allRedirects.edges.forEach(({ node }) => {
            const url = linkResolver(node.url)
            createRedirect({
              fromPath: "/" + node._meta.uid,
              isPermanent: true,
              toPath: url,
              redirectInBrowser: true,
            })
            createRedirect({
              fromPath: "/" + node._meta.uid.toUpperCase(),
              isPermanent: true,
              toPath: url,
              redirectInBrowser: true,
            })
          })
        resolve()
      }
    })
  })
}

// temporary work around for the build on netlify
var fs = require('fs');
var dir = "./.cache/caches/gatsby-source-prismic-graphql"

exports.onPreBootstrap = () => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@zoomus\/websdk/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
