import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Link from '../link'


const BlockTitleCTATextSlice = ({ data }) => {
    return (
        <section className="mx-0 md:mx-8 lg:mx-32 px-8 lg:px-16 py-20" style={{ backgroundColor: data.primary.background_colour.colour}}>
            <div className="px-8 md:px-48 lg:px-72 py-12 left-0 absolute" style={{ backgroundColor: data.primary.block_colour.colour}}>
              <h2 className="font-serifAlt text-5xl" style={{ color: data.primary.background_colour.colour}}>{data.primary.title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-64" style={{
              gridTemplateRows: `3fr 1fr`,
            }}>
              <div className="text-left col-start-1 col-end-3 lg:col-end-2 row-start-1 text-black">
                {RichText.render(data.primary.content)}
              </div>
              <div className="col-start-1 col-end-3 lg:col-start-2 row-start-2">
                <div className="md:text-center text-center py-2 px-4 md:px-10 shadow bg-black">
                  <Link className="font-serif uppercase text-2xl md:text-3xl text-white" to={data.primary.cta_link}>{data.primary.cta_title}</Link>
                </div>
              </div>
            </div>

        </section>
    )

}


export const query = graphql`fragment blockTitleCTATextSlice on PRISMIC_PageBodyBlock_title_with_text_and_cta {
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
    cta_link {
      ...link
    }
    cta_title
  }
}`



export default BlockTitleCTATextSlice
