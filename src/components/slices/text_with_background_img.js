import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import BackgroundImage from 'gatsby-background-image'
import Link from '../link'


const TextWithBackgroundImage = ({ data }) => {
  return (
      <BackgroundImage
       Tag="section"
       className="px-8 md:px-16 py-20 mx-0 md:-mx-24 text-black bg-cover bg-top"
       fluid={data.primary.background_imageSharp.childImageSharp.fluid}
      >
        <div className="opacity-75 bg-white py-8 px-8 lg:px-16 grid gap-8 grid-cols-2">
          <div className="opacity-100 col-span-2 lg:col-span-1">
            <h2 className="font-accent">{data.primary.title}</h2>
            <div className="font-serif">{RichText.render(data.primary.body1)}</div>
          </div>
          <div className="opacity-100 col-span-2 lg:col-span-1">
            {data.fields.map((item, idx) => (
              <Link key={idx} to={item.logo_link} >
                <img className={idx % 2 === 0 ? `md:pl-20`: `md:pr-20`} src={item.logo.url} alt="Logo of a Charity" />
              </Link>
            ))}
          </div>
        </div>
      </BackgroundImage>
  )
}


export const query = graphql`fragment textBackgroundImage on PRISMIC_PageBodyText_with_background_image {
  type
  primary {
    title
    body1
    background_image
    background_imageSharp {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  fields {
    logo_link {
      ...link
    }
    logo
  }
}`

export default TextWithBackgroundImage;
