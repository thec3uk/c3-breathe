import React from "react"
import { graphql } from "gatsby"
import { PrismicRichText } from "@prismicio/react"

const TextSlice = ({ data }) => {
  return (
    <section
      className={`px-8 lg:px-16 ${
        !data.primary.reduce_top_padding && "pt-20"
      } ${!data.primary.reduce_bottom_padding && "pb-20"} text-black ${
        data.primary.full_width && "md:-mx-24"
      }`}
      style={{
        backgroundColor: data.primary.background_colour.document.data.colour,
      }}
    >
      {data.primary.textTitle && (
        <div className="py-8 pb-16 text-5xl text-left md:text-center font-serifAlt">
          <PrismicRichText field={data.primary.textTitle.richText} />
        </div>
      )}
      <div
        className={`${
          data.primary.full_width && "mx-2 md:mx-24"
        } text-justify md:text-left prose prose-stone max-w-4xl prose-strong:font-semibold`}
      >
        {data.slice_label && data.slice_label === "raw_html" ? (
          <div
            className="not-prose"
            dangerouslySetInnerHTML={{ __html: data.primary.content.text }}
          ></div>
        ) : (
          <PrismicRichText field={data.primary.content.richText} />
        )}
      </div>
    </section>
  )
}

export const query = graphql`
  fragment textSlice on PrismicPageDataBodyText {
    slice_type
    slice_label
    primary {
      background_colour {
        ...colour
      }
      textTitle: title {
        html
        richText
        text
      }
      content {
        html
        richText
        text
      }
      full_width
      reduce_top_padding
      reduce_bottom_padding
    }
  }
`

export default TextSlice
