import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons"

const ContactSmallSlice = ({ inverse }) => {
  const query = graphql`
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
  `
  // const data = useStaticQuery(query)

  var classname = "text-black hover:text-breathe-blue-1"
  if (inverse) {
    classname = "text-white hover:text-black"
  }
  return (
    <StaticQuery
      query={`${query}`}
      render={data => {
        const contactData = data.prismic.allContact_informations.edges[0].node
        return (
          <div className="text-center my-8">
            <a
              href={`https://www.facebook.com/${contactData.facebook_profile}`}
              className={classname}
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                fixedWidth
                size="2x"
                className="h-8 mr-12 inline-block"
              />
            </a>
            <a
              href={`https://www.instagram.com/${contactData.instagram_profile}`}
              className={classname}
            >
              <FontAwesomeIcon
                icon={faInstagram}
                fixedWidth
                size="2x"
                className="h-8 inline-block"
              />
            </a>
          </div>
        )
      }}
    />
  )
}

ContactSmallSlice.defaultProps = {
  inverse: false,
}

export default ContactSmallSlice
