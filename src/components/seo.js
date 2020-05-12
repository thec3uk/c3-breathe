import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const query = graphql`query SEO {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    sitePlugin(pluginOptions: {previews: {eq: true}}) {
      pluginOptions {
        repositoryName
      }
    }
  }
`
  // const { site } = useStaticQuery(query)

  return (
    <StaticQuery
      query={`${query}`}
      render={({ site, sitePlugin  }) => {
        const metaDescription = description || site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ].concat(meta)}
          >
            <script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${sitePlugin.pluginOptions.repositoryName}&new=true`}></script>
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
