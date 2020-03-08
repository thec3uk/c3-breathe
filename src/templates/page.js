import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Slices from "../components/slices"

import { Link, Colour } from "../utils/fragments"
import { query as articleList } from "../components/slices/article_list"
import { query as BlockTitleText } from "../components/slices/block_title_text"
import { query as ColumnedText } from "../components/slices/columned_text"
import { query as GeometicCTA } from "../components/slices/geometric_cta"
import { query as Map } from "../components/slices/map"
import { query as Team } from "../components/slices/team"
import { query as TextBgImg } from "../components/slices/text_with_background_img"
import { query as TextWithCTA } from "../components/slices/text_with_cta"
import { query as Text } from "../components/slices/text"
import { query as titleCTAEmbed } from "../components/slices/title_embed_cta"
import { query as Header } from "../components/header"
import { query as Footer } from "../components/footer"

const Page = ({ data }) => {
  if (data.prismic === null || data.prismic.page === null) {
    return null
  }
  const pageData = data.prismic.page
  return (
    <Layout
      page={pageData}
    >
      <Slices slices={pageData.body} />
    </Layout>
  )
}

export const query = graphql`
  query Page($uid: String!) {
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
          ...InstaFeedSlice
        }
        ...header
        ...footer
        ...link
        page_title
      }
    }
  }
`

export default Page

Page.fragments = [
  Link,
  Colour,
  articleList,
  BlockTitleText,
  ColumnedText,
  GeometicCTA,
  Map,
  Team,
  TextBgImg,
  TextWithCTA,
  Text,
  titleCTAEmbed,
  Header,
  Footer,
]
