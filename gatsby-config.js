
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Breathe`,
    description: `The Breathe Collective`,
    author: `@breatheuk`,
  },
  plugins: [
      {
          resolve: `gatsby-source-instagram`,
          options: {
            username: `thec3_breathe`,
          },
        },
      {
        resolve: `gatsby-plugin-netlify`,
        options: {
          headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
          allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
          mergeSecurityHeaders: true, // boolean to turn off the default security headers
          mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
          mergeCachingHeaders: true, // boolean to turn off the default caching headers
          transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
          // transformHeaders: (headers, path) => { if (path !== '/pineapple') {return headers} return null}, // optional transform for manipulating headers under each path (e.g.sorting), etc.
          generateMatchPathRewrites: false, // boolean to turn off automatic creation of redirect rules for client only paths
        },
      },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          process.env.NODE_ENV !== "production"
            ? "https://thec3.us19.list-manage.com/subscribe/post?u=baac982817e7fb161022a1253&amp;id=7443c2e349"
            : "https://thec3.us19.list-manage.com/subscribe/post?u=baac982817e7fb161022a1253&amp;id=9b6ed04842",
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "breathe", // (required)
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        path: "/preview", // (optional, default: /preview)
        previews: true, // (optional, default: false)
        pages: [
            {
              type: "Online_event", // TypeName from prismic
              match: "/event/:uid", // Pages will be generated under this pattern (optional)
              filter: data => data.node._meta.type === 'online_event',
              path: "/event", // Placeholder page for unpublished documents
              component: require.resolve("./src/templates/event.js"),
            },
            {
              type: "Online_event", // TypeName from prismic
              match: "/event/:uid/checkout", // Pages will be generated under this pattern (optional)
              filter: data => data.node._meta.type === 'online_event',
              path: "/event/checkout", // Placeholder page for unpublished documents
              component: require.resolve("./src/templates/event-checkout.js"),
            },
          {
            type: "Page", // TypeName from prismic
            match: "/:uid", // Pages will be generated under this pattern (optional)
            // filter: data => data.node._meta.uid !== 'homepage',
            filter: data => data.node._meta.type === 'page' && !data.node._meta.uid.includes('homepage'),
            path: "/page", // Placeholder page for unpublished documents
            component: require.resolve("./src/templates/page.js"),
          },
          {
            type: "Page", // TypeName from prismic
            match: "/", // Pages will be generated under this pattern (optional)
            filter: data => data.node._meta.type === 'page' && data.node._meta.uid.includes('homepage'),
            path: "/page", // Placeholder page for unpublished documents
            component: require.resolve("./src/templates/page.js"),
          }
          // {
          //   type: "Redirect", // TypeName from prismic
          //   match: "/:uid", // Pages will be generated under this pattern (optional)
          //   // filter: data => {console.log(data); return true},
          //   path: "/redirect", // Placeholder page for unpublished documents
          //   component: require.resolve("./src/templates/redirect.js"),
          // }
        ],
        sharpKeys: [
          /image|photo|picture/, // (default)
          'portrait',
          'logo',
        ],
      },
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
        background_color: `#9ED0E1`,
        theme_color: `#9ED0E1`,
        display: `minimal-ui`,
        icon: `static/images/breathe-square.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
