import React from "react"
import { graphql } from "gatsby"

import { PrismicRichText } from "@prismicio/react"
import BackgroundImage from "gatsby-background-image"
import Link from "../link"
import { isEmpty } from "lodash"

const TextWithBackgroundImage = ({ data }) => {
  return (
    <BackgroundImage
      Tag="section"
      className="px-8 py-20 mx-0 text-black bg-top bg-cover md:px-16 md:-mx-24"
      fluid={data.primary.background_image.fluid}
    >
      <div className="grid grid-cols-2 gap-8 px-8 py-8 bg-white opacity-75 lg:px-16">
        <div className="col-span-2 opacity-100 lg:col-span-1">
          <h2 className="font-accent">{data.primary.title}</h2>
          <div className="font-serif">
            <PrismicRichText field={data.primary.body1.richText} />
          </div>
        </div>
        {!isEmpty(data.fields) && (
          <div className="col-span-2 opacity-100 lg:col-span-1">
            {data.fields.map((item, idx) => (
              <Link key={idx} to={item.logo_link}>
                <img
                  className={idx % 2 === 0 ? `md:pl-20` : `md:pr-20`}
                  src={item.logo.url}
                  alt="Logo of a Charity"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </BackgroundImage>
  )
}

export const query = graphql`
  fragment textBackgroundImage on PrismicPageDataBodyTextWithBackgroundImage {
    slice_type
    primary {
      title
      body1 {
        richText
        html
      }

      background_image {
        fluid(maxWidth: 1920) {
          ...GatsbyPrismicImageFluid
        }
      }
    }
    items {
      logo_link {
        ...link
      }
      logo {
        fluid(maxWidth: 1920) {
          ...GatsbyPrismicImageFluid
        }
      }
    }
  }
`

export default TextWithBackgroundImage
