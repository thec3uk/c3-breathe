import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import BackgroundImage from "gatsby-background-image"
import Link from "../link"

const ListOfArticlesSlice = ({ data }) => {
  return (
    <section
      className="px-16 md:px-40 py-20 flex flex-col -mx-0 sm:-mx-8 md:-mx-24"
      style={{ backgroundColor: data.primary.background_colour.colour }}
    >
      <h2 className="text-left md:text-right font-serif uppercase text-5xl lg;text-6xl mb-12 text-black">
        {RichText.asText(data.primary.title_of_section)}
      </h2>
      <div className="flex lg:flex-row flex-col justify-between flex-wrap">
        {data.fields.map(({ articles_to_link, title, imageSharp }, idx) => {
          return (
            <Link to={articles_to_link} key={idx} className="border-2 border-black w-full lg:w-3/12 flex flex-col justify-end shadow-lg mb-16">
              <BackgroundImage
                Tag="div"
                className="bg-cover h-88 bg-center flex flex-col justify-end"
                fluid={imageSharp.childImageSharp.fluid}
                backgroundColor={data.primary.background_colour.colour}
              >
                <div
                  className="py-4 bg-black text-center"
                  style={{
                    filter: `opacity(50%)`,
                    backdropFilter: `blur(4px)`,
                  }}
                >
                  <h4 className="uppercase font-serif text-white sm:px-0 md:px-8">
                    {title}
                  </h4>
                </div>
              </BackgroundImage>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export const query = graphql`
  fragment articleList on PRISMIC_PageBodyList_of_articles {
    type
    fields {
      title
      articles_to_link {
        ...link
      }
      image
      imageSharp {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    primary {
      title_of_section
      background_colour {
        ...colour
      }
    }
  }
`

export default ListOfArticlesSlice
