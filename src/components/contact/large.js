import React from "react"
import { StaticQuery, graphql } from "gatsby"

import ContactSmallSlice from "./small"

const ContactLargeSlice = () => {
  const query = graphql`
    query ContactInfo {
      allPrismicContactInformation {
        edges {
          node {
            data {
              email
              telephone
            }
          }
        }
      }
    }
  `
  // const data = useStaticQuery(query)
  return (
    <StaticQuery
      query={`${query}`}
      render={(data) => {
        const contactData = data.allPrismicContactInformation.edges[0].node.data
        return (
          <section className="px-16 py-16 mx-0 text-black lg:py-32 md:-mx-24 lg:-mx-24 bg-breathe-blue-2">
            <h3 className="py-8 font-serif text-5xl text-center text-white uppercase">
              Contact
            </h3>
            <div className="pb-8 mx-24 -mx-16 text-center">
              <p className="font-serif">
                <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                <br />
                <a href={`tel:${contactData.telephone}`}>
                  {contactData.telephone}
                </a>
              </p>
              <ContactSmallSlice inverse={true} />
            </div>
          </section>
        )
      }}
    />
  )
}

export default ContactLargeSlice
