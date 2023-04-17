import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Slices from "../components/slices"

const Page = ({ data }) => {
  if (data.prismicPage === null || data.prismicPage.data === null) {
    return null
  }
  const pageData = data.prismicPage.data
  return (
    <Layout page={pageData}>
      <Slices slices={pageData.body} />
    </Layout>
  )
}

export const query = graphql`
  query Page($uid: String!) {
    prismicPage(uid: { eq: $uid }) {
      id
      uid
      data {
        bg_colour {
          ...colour
        }
        body {
          ...blockTitleTextSlice
          ...teamSlice
          ...textSlice
          ...titleCTAEmbedSlice
          ...geometricSlice
          ...articleList
          ...blockTitleCTATextSlice
          ...columnTextSlice
          ...mapSlice
          ...textBackgroundImage
          # ...InstaFeedSlice
        }
        ...header
        ...footer
        page_title
      }
    }
  }
`

export default Page
