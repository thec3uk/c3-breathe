/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const { registerLinkResolver } = require("gatsby-source-prismic-graphql")
const { linkResolver } = require("./src/utils/linkResolver")
const $ = require("jquery")

registerLinkResolver(linkResolver)

export const onInitialClientRender = () => {
  $(document).ready(function() {
    console.log("jQuery is loaded all ok")
  })
}
