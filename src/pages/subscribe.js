import React from "react"

import { graphql } from "gatsby"
import SEO from "../components/seo"
import Link from "../components/link"
import "../components/layout.css"
import Footer from "../components/footer"

const SubscribePage = ({ data }) => {
  return (
    <div className="flex flex-col justify-center w-full h-screen bg-breathe-blue-1">
      <SEO title="Subscribe to our Newsletter" />
      <nav className="py-6 px-8 fixed top-0 animated flex flex-row justify-start min-w-full z-100 items-center bg-breathe-blue-1 space-x-4">
        <div className="uppercase text-lg font-sans text-white">
          <Link to="/">Breathe</Link>
        </div>
        <h1 className="font-sans uppercase text-black text-lg">
          Subscribe to our Newsletter
        </h1>
      </nav>

      <div className="px-0 sm:px-12 md:px-24 lg:px-24 flex flex-col space-y-4">
        <Footer
          siteTitle={data.site.siteMetadata.title}
          has_newsletter_slice={true}
          has_contact_slice={false}
          contact_slice_size={"small"}
        />
      </div>
    </div>
  )
}

export default SubscribePage

export const query = graphql`
  query SiteTitleQuerySub {
    site {
      siteMetadata {
        title
      }
    }
  }
`
