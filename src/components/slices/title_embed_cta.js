import React from "react"
import { graphql } from "gatsby"
import { PrismicRichText } from "@prismicio/react"
import Link from "../link"

const TitleEmbedCTASlice = ({ data }) => {
  console.log(data.primary)
  return (
    <section className="px-8 pt-20 text-black lg:px-16">
      <div
        className="grid grid-cols-10 md:gap-4"
        style={{
          gridTemplateRows: `2fr 1fr`,
        }}
      >
        <div className="col-span-10 row-span-2 text-4xl md:col-span-4">
          <PrismicRichText field={data.primary.content.richText} />
        </div>
        <div className="col-span-10 md:col-span-6">
          <div
            className="flex justify-center"
            dangerouslySetInnerHTML={{ __html: data.primary.embed.html }}
          />
        </div>
        <div className="flex justify-center col-span-10 mt-8 text-center md:col-start-5 md:col-end-11">
          <Link
            className="self-start px-8 py-2 text-2xl border-2 border-black shadow-md lg:px-20 font-serifAlt"
            style={{
              backgroundColor:
                data.primary.cta_button_colour.document.data.colour,
              color: data.primary.cta_font_colour.document.data.colour,
            }}
            to={data.primary.cta_link}
          >
            {data.primary.cta_title}
          </Link>
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment titleCTAEmbedSlice on PrismicPageDataBodyTitleWithEmbedAndCta {
    slice_type
    primary {
      # embed {
      #   html
      # }
      content {
        richText
        html
      }
      cta_link {
        ...link
      }
      cta_title
      cta_button_colour {
        ...colour
      }
      cta_font_colour {
        ...colour
      }
    }
  }
`

export default TitleEmbedCTASlice
