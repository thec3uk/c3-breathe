import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'

const ContactSmallSlice = ({ inverse }) => {
    const data = useStaticQuery(graphql`
      query SocialInfo {
        prismic {
          allContact_informations {
            edges {
              node {
                facebook_profile
                instagram_profile
              }
            }
          }
        }
      }
    `)
    const contactData = data.prismic.allContact_informations.edges[0].node
    var classname = "text-black hover:text-breathe-blue-1"
    if (inverse) {
        classname = "text-white hover:text-black"
    }
    return (
        <div className="text-center mb-16">
            <a href={`https://www.facebook.com/${contactData.facebook_profile}`} className={classname}>
                <FontAwesomeIcon icon={faFacebookF} fixedWidth size="2x" className="mr-12"/>
            </a>
            <a href={`https://www.instagram.com/${contactData.instagram_profile}`} className={classname}>
                <FontAwesomeIcon icon={faInstagram} fixedWidth size="2x" />
            </a>
        </div>
    )
}

ContactSmallSlice.defaultProps = {
    inverse: false
}


export default ContactSmallSlice
