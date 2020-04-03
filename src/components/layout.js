import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children, page }) => {
  const query = graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `
  // const data = useStaticQuery(query)
  return (
    <StaticQuery
      query={`${query}`}
      render={data => (
        <>
          <Header
            siteTitle={data.site.siteMetadata.title}
            image={page.header_imageSharp.childImageSharp.fluid}
            pageTitle={page.header_title}
            pageSubtitle={page.header_sub_title}
            headerCtaTitle={page.header_cta}
            headerCtaUrl={page.header_cta_link}
            headerFontColour={page.header_font_colour.colour}
            currentUid={page._meta.uid}
            bgColour={page.bg_colour.colour}
          />
          <div
            data-wio-id={page._meta.id}
            className="px-0 sm:px-12 md:px-24 lg:px-24"
            style={{
              backgroundColor: page.bg_colour.colour,
            }}
          >
            <main>{children}</main>
            <Footer
              siteTitle={data.site.siteMetadata.title}
              has_newsletter_slice={page.has_newsletter_slice}
              has_contact_slice={page.has_contact_slice}
              contact_slice_size={page.contact_slice_size}
            />
          </div>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
