import React from "react"
import { graphql } from 'gatsby';

import Layout from '../components/layout'
import Slices from '../components/slices'

const Page = ({ data }) => {
    const page = data.prismic.page;
    return (
        <Layout bgColour={page.bg_colour.colour} page={page}>
            <Slices slices={page.body} />
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
      }
      ...header
      ...footer
      page_title
      template
    }
  }
}`

export default Page;
