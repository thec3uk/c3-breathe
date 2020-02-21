import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"


const TextSlice = ({ data }) => {
    return (
        <section className={`px-16 py-20 text-black ${data.primary.full_width && '-mx-24'}`} style={{ backgroundColor: data.primary.background_colour.colour}}>
            <div className="text-center py-8 pb-16 font-serifAlt text-5xl">
                {RichText.render(data.primary.textTitle)}
            </div>
            <div className={`${data.primary.full_width && 'mx-24'}`}>
                {RichText.render(data.primary.content)}
            </div>
        </section>
    )

}


export const query = graphql`fragment textSlice on PRISMIC_PageBodyText {
  type
  primary {
    background_colour {
      ...colour
    }
    textTitle:title
    content
    full_width
  }
}`



export default TextSlice
