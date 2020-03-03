import React, { Fragment } from "react"
import { graphql } from "gatsby"
import Link from "../link"

const GeometricCTASlice = ({ data }) => {
  return (
    <section
      className="-mx-24 h-screen bg-cover flex flex-col justify-center"
      style={{
        backgroundImage: `url(${data.primary.background_image.url})`,
      }}
    >
      <div className="grid grid-cols-5 grid-rows-2 mt-24 text-black">
        <div
          className={`w-72 h-72 bg-breathe-blue-1 z-30 col-start-4 row-start-1 -ml-20 ${data
            .primary.translucent_squares && "opacity-50"}`}
        ></div>
        <div
          className={`w-72 h-72 bg-white z-10 col-start-2 row-start-2 ml-16 -mt-48 ${data
            .primary.translucent_squares && "opacity-50"}`}
        ></div>
        <div
          className={`w-72 h-72 bg-salmon-1 mx-auto z-20 col-start-3 row-start-2 -mt-24`}
        ></div>
        <div className="text-center col-start-2 col-end-5 row-start-1 z-40 flex justify-end flex-col">
          <h2 className="font-serifAlt whitespace-no-wrap ">
            {data.primary.title}
          </h2>
        </div>
        <div className="text-center col-start-3 row-start-2 z-40 mt-12 uppercase text-sm">
          {data.fields.map((item, idx) => {
            return (
              <Fragment key={idx}>
                {idx !== 0 && `|`}
                {item.cta_type === "link" ? (
                  <Link
                    className="mx-1 hover:text-white"
                    to={`/${item.cta_location._meta.uid}`}
                  >
                    {item.cta_text}
                  </Link>
                ) : item.cta_type === "button" ? (
                  <Link
                    className="mx-1 hover:text-black hover:bg-white bg-black text-white px-10 py-3 shadow"
                    to={`/${item.cta_location._meta.uid}`}
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
    </section>
  )
}

export const query = graphql`
  fragment geometricSlice on PRISMIC_PageBodyGeometric_cta {
    type
    fields {
      cta_text
      cta_type
      cta_location {
        ...link
      }
    }
    primary {
      title
      background_image
      translucent_squares
    }
  }
`

export default GeometricCTASlice
