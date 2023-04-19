require("dotenv").config()

const prismicRepositoryName = "breathe"

const linkResolver = require("./src/utils/linkResolver").linkResolver

module.exports = {
  siteMetadata: {
    title: `Breathe`,
    description: `The Breathe Collective`,
    author: `@breatheuk`,
    domain: "breathe.thec3.uk",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-umami`,
      options: {
        websiteId: "9b356e74-b50b-4e4c-ab05-6f00fdaaef94",
        srcUrl: "https://analytics.thec3.uk/umami.js",
        includeInDevelopment: false,
        autoTrack: true,
        respectDoNotTrack: true,
      },
    },
    {
      resolve: "gatsby-source-mailchimp",
      options: {
        key: process.env.MAILCHIMP_API_KEY,
        rootURL: "https://us19.api.mailchimp.com/3.0",
        count: 0,
        campaignFields: [
          "campaigns.type",
          "campaigns.status",
          "campaigns.send_time",
          "campaigns.settings.subject_line",
          "campaigns.settings.preview_text",
          "campaigns.settings.title",
          "campaigns.recipients.list_id",
          "campaigns.recipients.list_name",
        ],
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `4474519383`,
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
        instagram_id: "17841404541509314",
        paginate: 1,
        maxPosts: 12,
        hashtags: true,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
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
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: prismicRepositoryName,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        linkResolver: linkResolver,
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
