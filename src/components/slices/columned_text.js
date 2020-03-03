import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Link from "../link"


const ColumnTextSlice = ({ data }) => {
    const columnCount = data.fields.length
    return (
        <section className={`px-16 ${!data.primary.reduce_top_padding && 'pt-20'} ${!data.primary.reduce_bottom_padding && 'pb-20'} text-black`}>
            {data.primary.title && <h2 className="text-center py-8 pb-16 font-serifAlt text-5xl text-black">
                {data.primary.title}
            </h2>}
            <div className={`grid gap-32 grid-cols-${columnCount}`}>
              {data.fields.map(({ column }, idx) => (
                <div className={`col-start-${idx + 1}`} key={idx}>{column && RichText.render(column)}</div>
              ))}
            </div>
            {data.primary.cta_link && <div className="flex justify-center my-16">
                <Link to={data.primary.cta_link} className="uppercase px-4 py-2 shadow" style={{
                  color: data.primary.cta_font_colour.colour,
                  backgroundColor: data.primary.cta_button_colour.colour
                }}>
                    {data.primary.cta_text}
                </Link>
            </div>}
        </section>
    )
}


export const query = graphql`fragment columnTextSlice on PRISMIC_PageBodyMulti_column_text {
  type
  fields {
    column
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
}`



export default ColumnTextSlice
