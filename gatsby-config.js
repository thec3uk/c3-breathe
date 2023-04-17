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
        schemas: {
          academy_page: require(`./src/schemas/academy_page.json`),
          content_page: require(`./src/schemas/content_page.json`),
          homepage: require(`./src/schemas/homepage.json`),
          landing_page: require(`./src/schemas/landing_page.json`),
          notification_banner: require(`./src/schemas/notification_banner.json`),
          redirect: require(`./src/schemas/redirect.json`),
          site_config: require(`./src/schemas/site_config.json`),
          text_page: require(`./src/schemas/text_page.json`),
          colour: require(`./src/schemas/colour.json`),
          page: require(`./src/schemas/page.json`),
          online_event: require(`./src/schemas/online_event.json`),
          contact_information: require(`./src/schemas/contact_information.json`),
          channel: require("./src/schemas/channel.json"),
          message: require("./src/schemas/message.json"),
          resource: require("./src/schemas/resources.json"),
          series: require("./src/schemas/series.json"),
          speaker: require("./src/schemas/speaker.json"),
        },
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
