import React from "react"
import { graphql } from 'gatsby';

import Layout from '../components/layout'
import Slices from '../components/slices'

const Page = ({ data }) => {
    const pageData = data.prismic.page;
    if (pageData === null) {
        return null
    }
    return (
        <Layout data-wio-id={pageData._meta.id} bgColour={pageData.bg_colour.colour} page={pageData}>
            <Slices slices={pageData.body} />
        </Layout>
    )

}

export const query = graphql`query Page($uid: String!) {
  prismic {
    page(lang: "en-gb", uid: $uid) {
      _meta {
        id
        uid
      }
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
      }
      ...header
      ...footer
      ...link
      page_title
      template
    }
  }
}`

export default Page;
