import React, { Fragment } from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Link from "../link"

const GeometricCTASlice = ({ data }) => {
  return (
    <BackgroundImage
      Tag="section"
      className="flex flex-col justify-center h-screen mx-0 bg-cover md:-mx-24 lg:-mx-24"
      fluid={data.primary.background_image.fluid}
    >
      <div className="grid grid-cols-5 grid-rows-2 mt-24 overflow-x-hidden text-black">
        <div
          className={`w-56 lg:w-72 h-56 lg:h-72 bg-breathe-blue-1 z-30 col-start-4 row-start-1 -ml-16 md:-ml-8 lg:-ml-20 ${
            data.primary.translucent_squares && "opacity-50"
          }`}
        ></div>
        <div
          className={`w-56 lg:w-72 h-56 lg:h-72 bg-white z-10 col-start-2 row-start-2 -ml-20 md:ml-0 lg:ml-16 -mt-48 ${
            data.primary.translucent_squares && "opacity-50"
          }`}
        ></div>
        <div
          className={`w-56 lg:w-72 h-56 lg:h-72 bg-salmon-1 mx-auto z-20 col-start-3 row-start-2 -mt-24 -ml-16 md:-ml-8 lg:ml-0`}
        ></div>
        <div className="z-40 flex flex-col justify-end col-start-1 col-end-6 row-start-1 text-center lg:col-start-2 lg:col-end-5">
          <h2 className="text-4xl whitespace-no-wrap font-serifAlt lg:text-6xl">
            {data.primary.title}
          </h2>
        </div>
        <div className="z-40 col-start-2 col-end-5 row-start-2 mt-12 ml-3 text-sm text-center uppercase md:col-start-3 md:col-end-4">
          {data.items.map((item, idx) => {
            const cta_hash = item.cta_hash ? `#${item.cta_hash}` : ""
            return (
              <Fragment key={idx}>
                {idx !== 0 && `|`}
                {item.cta_type === "link" ? (
                  <Link
                    className="mx-1 hover:text-white"
                    to={`/${item.cta_location.uid}${cta_hash}`}
                  >
                    {item.cta_text}
                  </Link>
                ) : item.cta_type === "button" ? (
                  <Link
                    className="px-10 py-3 mx-1 text-white bg-black shadow hover:text-black hover:bg-white"
                    to={`/${item.cta_location.uid}${cta_hash}`}
                  >
                    {item.cta_text}
                  </Link>
                ) : (
                  <div />
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </BackgroundImage>
  )
}

export const query = graphql`
  fragment geometricSlice on PrismicPageDataBodyGeometricCta {
    slice_type
    items {
      cta_text
      cta_type
      cta_hash
      cta_location {
        ...link
      }
    }
    primary {
      title

      background_image {
        fluid(maxWidth: 1920) {
          ...GatsbyPrismicImageFluid
        }
      }
      translucent_squares
    }
  }
`

export default GeometricCTASlice
