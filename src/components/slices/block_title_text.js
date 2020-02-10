import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"


const BlockTitleTextSlice = ({ data }) => {
    return (
        <section className="px-16 py-20" style={{ backgroundColor: data.primary.background_colour.colour}}>
            <div className="px-40 py-8 left-0 absolute" style={{ backgroundColor: data.primary.block_colour.colour}}>
              <h2 className="font-serifAlt text-5xl" style={{ color: data.primary.background_colour.colour}}>{data.primary.title}</h2>
            </div>
            <div className="mt-48">
              {RichText.render(data.primary.content)}
            </div>
        </section>
    )

}


export const query = graphql`fragment blockTitleTextSlice on PRISMIC_PageBodyBlock_title_with_text {
  type
  primary {
    background_colour {
      ...colour
    }
    content
    title
    block_colour {
      ...colour
    }
  }
}`



export default BlockTitleTextSlice
