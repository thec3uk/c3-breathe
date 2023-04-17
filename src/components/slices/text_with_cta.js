import React from "react"
import { graphql } from "gatsby"
import { PrismicRichText } from "@prismicio/react"
import Link from "../link"

const BlockTitleCTATextSlice = ({ data }) => {
  return (
    <section
      className="px-8 py-20 mx-0 md:mx-8 lg:mx-32 lg:px-16"
      style={{
        backgroundColor: data.primary.background_colour.document.data.colour,
      }}
    >
      <div
        className="absolute left-0 px-8 py-12 md:px-48 lg:px-72"
        style={{
          backgroundColor: data.primary.block_colour.document.data.colour,
        }}
      >
        <h2
          className="text-5xl font-serifAlt"
          style={{ color: data.primary.background_colour.document.data.colour }}
        >
          {data.primary.title}
        </h2>
      </div>
      <div
        className="grid grid-cols-2 gap-2 mt-64"
        style={{
          gridTemplateRows: `3fr 1fr`,
        }}
      >
        <div className="col-start-1 col-end-3 row-start-1 text-left text-black lg:col-end-2">
          <PrismicRichText field={data.primary.content.richText} />
        </div>
        <div className="col-start-1 col-end-3 row-start-2 lg:col-start-2">
          <div className="px-4 py-2 text-center bg-black shadow md:text-center md:px-10">
            <Link
              className="font-serif text-2xl text-white uppercase md:text-3xl"
              to={data.primary.cta_link}
            >
              {data.primary.cta_title}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment blockTitleCTATextSlice on PrismicPageDataBodyBlockTitleWithTextAndCta {
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
      cta_link {
        ...link
      }
      cta_title
    }
  }
`

export default BlockTitleCTATextSlice
