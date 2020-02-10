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

export const query = graphql`query {
  prismic {
    page(lang: "en-gb", uid: "about") {
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
      }
      ...header
      page_title
      template
    }
  }
}`

export default Page;
