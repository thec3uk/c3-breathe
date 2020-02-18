module.exports = {
  siteMetadata: {
    title: `Breathe`,
    description: `The Breathe Collective`,
    author: `@breatheuk`,
  },
  plugins: [
      `gatsby-plugin-postcss`,
      {
      resolve: 'gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'breathe', // (required)
        accessToken: 'MC5YandpX3hNQUFDTUFpMjR2.bk_vv73vv73vv73vv73vv71iYQzvv73vv73vv73vv73vv73vv71iUzzvv73vv73vv70P77-9Pe-_vUfvv70577-977-977-9', // (optional)
        path: '/preview', // (optional, default: /preview)
        previews: true, // (optional, default: false)
        pages: [{ // (optional)
          type: 'Page',         // TypeName from prismic
          match: '/:uid',  // Pages will be generated under this pattern (optional)
          path: '/page',        // Placeholder page for unpublished documents
          component: require.resolve('./src/templates/page.js'),
        }],
        // sharpKeys: [
        //   /image|photo|picture/, // (default)
        //   'profilepic',
        // ],
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Breathe Collective`,
        short_name: `Breathe`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/breathe-square.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
