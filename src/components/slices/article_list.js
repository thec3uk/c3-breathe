import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { PrismicText } from "@prismicio/react"
import BackgroundImage from "gatsby-background-image"
import Link from "../link"

const ListItem = ({ link, image, title, background_colour }) => {
  return (
    <Link
      to={link}
      className="flex flex-col justify-end w-full mb-16 border-2 border-black shadow-lg lg:w-3/12"
    >
      <BackgroundImage
        Tag="div"
        className="flex flex-col justify-end bg-center bg-cover h-88"
        fluid={image.fluid}
        backgroundColor={background_colour.document.data.colour}
      >
        <div
          className="py-4 text-center bg-black"
          style={{
            filter: `opacity(50%)`,
            backdropFilter: `blur(4px)`,
          }}
        >
          <h4 className="font-serif text-white uppercase sm:px-0 md:px-8">
            {title}
          </h4>
        </div>
      </BackgroundImage>
    </Link>
  )
}

// const MailChimpList = ({ fields, background_colour }) => {
//   const staticQuery = graphql`
//     query Mailchimplist {
//       allMailchimpCampaign(
//         filter: {
//           status: { eq: "sent" }
//           recipients: { list_id: { eq: "9b6ed04842" } }
//         }
//         limit: 3
//       ) {
//         edges {
//           node {
//             campaignId
//             send_time(formatString: "MMMM")
//             settings {
//               subject_line
//             }
//           }
//         }
//       }
//     }
//  const data = useStaticQuery(staticQuery)
//   return (
//     <StaticQuery
//       query={`${staticQuery}`}
//       render={(data) => {
//         const mcFields = data.allMailchimpCampaign.edges.map(({ node }) => {
//           return {
//             title: node.send_time,
//             articles_to_link: `/newsletter/${node.campaignId}`,
//           }
//         })
//         return (
//           <>
//             {fields.map(({ imageSharp }, idx) => {
//               return (
//                 <ListItem
//                   key={idx}
//                   link={mcFields[idx].articles_to_link}
//                   title={mcFields[idx].title}
//                   imageSharp={imageSharp}
//                   background_colour={background_colour}
//                 />
//               )
//             })}
//           </>
//         )
//       }}
//     />
//   )
// }

const InternalList = ({ fields, background_colour }) => {
  return (
    <>
      {fields.map(({ articles_to_link, title, imageSharp }, idx) => {
        return (
          <ListItem
            key={idx}
            link={articles_to_link}
            title={title}
            imageSharp={imageSharp}
            background_colour={background_colour}
          />
        )
      })}
    </>
  )
}

const ListOfArticlesSlice = ({ data }) => {
  return (
    <section
      className="flex flex-col px-16 py-20 -mx-0 md:px-40 sm:-mx-8 md:-mx-24"
      style={{
        backgroundColor: data.primary.background_colour.document.data.colour,
      }}
    >
      <h2 className="text-left md:text-right font-serif uppercase text-5xl lg;text-6xl mb-12 text-black">
        <PrismicText field={data.primary.title_of_section} />
      </h2>
      <div className="flex flex-col flex-wrap justify-between lg:flex-row">
        {data.slice_label === "internal_links" && (
          <InternalList
            fields={data.fields}
            background_colour={data.primary.background_colour}
          />
        )}
        {/* {data.slice_label === "mailchimp" && (
          <MailChimpList
            fields={data.fields}
            mailchimp={data}
            background_colour={data.primary.background_colour}
          />
        )} */}
      </div>
    </section>
  )
}

export const query = graphql`
  fragment articleList on PrismicPageDataBodyListOfArticles {
    slice_type
    slice_label
    items {
      title
      articles_to_link {
        ...link
      }
      image {
        fluid(maxWidth: 1920) {
          ...GatsbyPrismicImageFluid
        }
      }
    }
    primary {
      title_of_section {
        text
      }
      background_colour {
        ...colour
      }
    }
  }
`

export default ListOfArticlesSlice
