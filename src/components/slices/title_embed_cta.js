import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Link from '../link'


const TitleEmbedCTASlice = ({ data }) => {
    return (
        <section className="px-8 lg:px-16 pt-20 text-black">
          <div className="grid md:gap-4 grid-cols-10" style={{
            gridTemplateRows: `2fr 1fr`
          }}>
            <div className="col-span-10 md:col-span-4 row-span-2  text-4xl">
                {RichText.render(data.primary.content)}
            </div>
            <div className="col-span-10 md:col-span-6">
              <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: data.primary.embed.html }} />
            </div>
            <div className="col-span-10 md:col-start-5 md:col-end-11 flex justify-center mt-8 text-center">
              <Link className="border-2 border-black shadow-md py-2 px-8 lg:px-20 self-start font-serifAlt text-2xl" style={{backgroundColor: data.primary.cta_button_colour.colour, color: data.primary.cta_font_colour.colour }} to={data.primary.cta_link}>{data.primary.cta_title}</Link>
            </div>
          </div>
        </section>
    )

}


export const query = graphql`fragment titleCTAEmbedSlice on PRISMIC_PageBodyTitle_with_embed_and_cta {
  type
  primary {
    embed
    content
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
}`



export default TitleEmbedCTASlice
