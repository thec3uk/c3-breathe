/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children, bgColour, page }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
        image={page.header_image}
        pageTitle={page.header_title}
        pageSubtitle={page.header_sub_title}
        headerCtaTitle={page.header_cta}
        headerCtaUrl={page.header_cta_link}
        headerFontColour={page.header_font_colour.colour}
        currentUid={page._meta.uid}
      />
      <div
        className="px-24"
        style={{
          backgroundColor: bgColour,
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
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
