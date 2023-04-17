import React from "react"
import { graphql } from "gatsby"
import { PrismicRichText } from "@prismicio/react"

const BlockTitleTextSlice = ({ data }) => {
  console.log(data.primary)
  return (
    <section
      className="px-8 py-20"
      style={{
        backgroundColor: data.primary.background_colour.document.data.colour,
      }}
    >
      <div
        className="absolute left-0 px-8 py-4 md:px-32 lg:px-48 lg:py-8"
        style={{
          backgroundColor: data.primary.block_colour.document.data.colour,
        }}
      >
        <h2
          className="text-4xl font-serifAlt lg:text-5xl"
          style={{ color: data.primary.background_colour.document.data.colour }}
        >
          {data.primary.title}
        </h2>
      </div>
      <div
        className={`mt-48 lg:px-16 text-black ${
          data.primary.is_body_text_serif && "font-serif"
        } text-justify md:text-left`}
        style={{ color: data.primary.body_text_colour.document.data.colour }}
      >
        <PrismicRichText field={data.primary.content.richText} />
      </div>
    </section>
  )
}

export const query = graphql`
  fragment blockTitleTextSlice on PrismicPageDataBodyBlockTitleWithText {
    slice_type
    primary {
      background_colour {
        ...colour
      }
      content {
        richText
        html
      }
      title
      block_colour {
        ...colour
      }
      body_text_colour {
        ...colour
      }
      is_body_text_serif
    }
  }
`

export default BlockTitleTextSlice
