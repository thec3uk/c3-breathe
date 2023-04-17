import React from "react"

import { graphql } from "gatsby"
import Seo from "../components/seo"
import Link from "../components/link"
import "../components/layout.css"
import Footer from "../components/footer"

const SubscribePage = ({ data }) => {
  return (
    <div className="flex flex-col justify-center w-full h-screen bg-breathe-blue-1">
      <Seo title="Subscribe to our Newsletter" />
      <nav className="fixed top-0 flex flex-row items-center justify-start min-w-full px-8 py-6 space-x-4 animated z-100 bg-breathe-blue-1">
        <div className="font-sans text-lg text-white uppercase">
          <Link to="/">Breathe</Link>
        </div>
        <h1 className="font-sans text-lg text-black uppercase">
          Subscribe to our Newsletter
        </h1>
      </nav>

      <div className="flex flex-col px-0 space-y-4 sm:px-12 md:px-24 lg:px-24">
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
