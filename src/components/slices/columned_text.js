import React from "react"
import { graphql } from "gatsby"
import { PrismicRichText } from "@prismicio/react"
import Link from "../link"

const ColumnTextSlice = ({ data }) => {
  const columnCount = data.items.length
  const colClasses = {
    1: "md:col-start-1",
    2: "md:col-start-2",
    3: "md:col-start-3",
    4: "md:col-start-4",
    5: "md:col-start-5",
    6: "md:col-start-6",
  }
  return (
    <section
      className={`px-16 ${!data.primary.reduce_top_padding && "pt-20"} ${
        !data.primary.reduce_bottom_padding && "pb-20"
      } text-black`}
    >
      {data.primary.title && (
        <h2 className="py-8 pb-16 text-5xl text-center text-black font-serifAlt">
          {data.primary.title}
        </h2>
      )}
      <div
        className={`grid gap-8 lg:gap-32 grid-cols-1 auto-cols-fr md:grid-cols-${columnCount}`}
      >
        {data.items.map(({ column }, idx) => (
          <div className={`col-start-1 ${colClasses[idx + 1]}`} key={idx}>
            {column && <PrismicRichText field={column.richText} />}
          </div>
        ))}
      </div>
      {data.primary.cta_link && (
        <div className="flex justify-center my-16">
          <Link
            to={data.primary.cta_link}
            className="px-4 py-2 uppercase shadow"
            style={{
              color: data.primary.cta_font_colour.document?.data.colour,
              backgroundColor:
                data.primary.cta_button_colour.document?.data.colour,
            }}
          >
            {data.primary.cta_text}
          </Link>
        </div>
      )}
    </section>
  )
}

export const query = graphql`
  fragment columnTextSlice on PrismicPageDataBodyMultiColumnText {
    slice_type
    items {
      column {
        html
        richText
      }
    }
    primary {
      title
      cta_text
      cta_link {
        ...link
      }
      cta_font_colour {
        ...colour
      }
      cta_button_colour {
        ...colour
      }
      reduce_top_padding
      reduce_bottom_padding
    }
  }
`

export default ColumnTextSlice
