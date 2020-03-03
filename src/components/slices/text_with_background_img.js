import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Link from '../link'


const TextWithBackgroundImage = ({ data }) => {
  return (
      <section className="px-16 py-20 -mx-24 text-black bg-cover bg-top" style={{backgroundImage: `url(${data.primary.background_image.url})` }}>
        <div className="opacity-75 bg-white py-8 px-16 grid gap-8 grid-cols-2">
          <div className="opacity-100">
            <h2 className="font-accent">{data.primary.title}</h2>
            <div className="font-serif">{RichText.render(data.primary.body1)}</div>
          </div>
          <div className="opacity-100">
            {data.fields.map((item, idx) => (
              <Link key={idx} to={item.logo_link} >
                <img className={idx % 2 === 0 ? `pl-20`: `pr-20`} src={item.logo.url} alt="Logo of a Charity" />
              </Link>
            ))}
          </div>
        </div>
      </section>
  )
}


export const query = graphql`fragment textBackgroundImage on PRISMIC_PageBodyText_with_background_image {
  type
  primary {
    title
    body1
    background_image
  }
  fields {
    logo_link {
      ...link
    }
    logo
  }
}`

export default TextWithBackgroundImage;
