import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"


const BlockTitleTextSlice = ({ data }) => {
    return (
        <section className="px-8 py-20" style={{ backgroundColor: data.primary.background_colour.colour}}>
            <div className="px-8 md:px-32 lg:px-48 py-4 lg:py-8 left-0 absolute" style={{ backgroundColor: data.primary.block_colour.colour}}>
              <h2 className="font-serifAlt text-4xl lg:text-5xl" style={{ color: data.primary.background_colour.colour}}>{data.primary.title}</h2>
            </div>
            <div className={`mt-48 text-black ${data.primary.is_body_text_serif && 'font-serif'} text-justify md:text-left`} style={{ color: data.primary.body_text_colour.colour}}>
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
    body_text_colour {
      ...colour
    }
    is_body_text_serif
  }
}`



export default BlockTitleTextSlice
