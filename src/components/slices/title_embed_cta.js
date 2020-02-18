import React from "react"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"


const TitleEmbedCTASlice = ({ data }) => {
    return (
        <section className="px-16 pt-20 text-black">
          <div className="grid grid-cols-10 grid-rows-2" style={{
            gridTemplateRows: `2fr 1fr`
          }}>
            <div className="col-span-4 row-span-2 text-4xl">
                {RichText.render(data.primary.content)}
            </div>
            <div className="col-span-6">
              <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: data.primary.embed.html }} />

            </div>
            <div className="col-start-5 col-end-11 flex justify-center mt-8">
              <Link className="border-2 border-black shadow-md py-2 px-20 self-start font-serifAlt text-2xl" style={{backgroundColor: data.primary.cta_button_colour.colour, color: data.primary.cta_font_colour.colour }} to={data.primary.cta_link}>{data.primary.cta_title}</Link>
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
      _linkType
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
