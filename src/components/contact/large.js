import React from "react"
import { StaticQuery, graphql } from "gatsby"

import ContactSmallSlice from './small'

const ContactLargeSlice = () => {

    const query = graphql`
      query ContactInfo {
        prismic {
          allContact_informations {
            edges {
              node {
                email
                telephone
              }
            }
          }
        }
      }
    `
    // const data = useStaticQuery(query)
    return( <StaticQuery query={`${query}`} render={ data => {
        const contactData = data.prismic.allContact_informations.edges[0].node
        return (
        <section className="px-16 py-32 text-black -mx-24 bg-breathe-blue-2" >
            <h3 className="text-center py-8 font-serif text-white text-5xl uppercase">
                Contact
            </h3>
            <div className="mx-24 text-center pb-8 -mx-16">
                <p className="font-serif">
                <a href={`mailto:${contactData.email}`}>{contactData.email}</a><br/>
                <a href={`tel:${contactData.telephone}`}>{contactData.telephone}</a></p>
                <ContactSmallSlice inverse={true} />
            </div>
        </section>
    )}} />)
}



export default ContactLargeSlice
