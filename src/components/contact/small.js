import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons"

const ContactSmallSlice = ({ inverse }) => {
  const query = graphql`
    query SocialInfo {
      allPrismicContactInformation {
        edges {
          node {
            data {
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
      render={(data) => {
        const contactData = data.allPrismicContactInformation.edges[0].node.data
        return (
          <div className="my-8 text-center">
            <a
              href={`https://www.facebook.com/${contactData.facebook_profile}`}
              className={classname}
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                fixedWidth
                size="2x"
                className="inline-block h-8 mr-12"
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
                className="inline-block h-8"
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
