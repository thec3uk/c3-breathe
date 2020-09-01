import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { RichText } from "prismic-reactjs"
import BackgroundImage from "gatsby-background-image"
import Link from "../link"

const ListItem = ({ link, imageSharp, title, background_colour }) => {
  return (
    <Link
      to={link}
      className="border-2 border-black w-full lg:w-3/12 flex flex-col justify-end shadow-lg mb-16"
    >
      <BackgroundImage
        Tag="div"
        className="bg-cover h-88 bg-center flex flex-col justify-end"
        fluid={imageSharp.childImageSharp.fluid}
        backgroundColor={background_colour.colour}
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
}

const MailChimpList = ({ fields, background_colour }) => {
  const staticQuery = graphql`
    query Mailchimplist {
      allMailchimpCampaign(
        filter: {
          status: { eq: "sent" }
          recipients: { list_id: { eq: "9b6ed04842" } }
        }
        limit: 3
      ) {
        edges {
          node {
            campaignId
            send_time(formatString: "MMMM")
            settings {
              subject_line
            }
          }
        }
      }
    }
  `
  return (
    <StaticQuery
      query={`${staticQuery}`}
      render={data => {
        console.log("MC: ", data, fields)
        const mcFields = data.allMailchimpCampaign.edges.map(({ node }) => {
          return {
            title: node.send_time,
            articles_to_link: `/newsletter/${node.campaignId}`,
          }
        })
        console.log(mcFields)
        return (
          <>
            {fields.map(({ imageSharp }, idx) => {
              return (
                <ListItem
                  key={idx}
                  link={mcFields[idx].articles_to_link}
                  title={mcFields[idx].title}
                  imageSharp={imageSharp}
                  background_colour={background_colour}
                />
              )
            })}
          </>
        )
      }}
    />
  )
}

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
  console.log(data)
  return (
    <section
      className="px-16 md:px-40 py-20 flex flex-col -mx-0 sm:-mx-8 md:-mx-24"
      style={{ backgroundColor: data.primary.background_colour.colour }}
    >
      <h2 className="text-left md:text-right font-serif uppercase text-5xl lg;text-6xl mb-12 text-black">
        {RichText.asText(data.primary.title_of_section)}
      </h2>
      <div className="flex lg:flex-row flex-col justify-between flex-wrap">
        {data.label === "internal_links" && (
          <InternalList
            fields={data.fields}
            background_colour={data.primary.background_colour}
          />
        )}
        {data.label === "mailchimp" && (
          <MailChimpList
            fields={data.fields}
            mailchimp={data}
            background_colour={data.primary.background_colour}
          />
        )}
      </div>
    </section>
  )
}

export const query = graphql`
  fragment articleList on PRISMIC_PageBodyList_of_articles {
    type
    label
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
