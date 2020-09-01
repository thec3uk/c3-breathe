import React from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"

import "../components/layout.css"

const Newsletter = ({ data, pageContext }) => {
  if (data.mailchimpCampaign === null) {
    return null
  }
  return (
    <div className="h-screen w-screen flex flex-col">
      <Helmet title={data.mailchimpCampaign.settings.subject_line} />
      <div className="flex flex-row sticky text-center bg-breathe-blue-1 py-4 shadow justify-between items-center px-8 md:px-16">
        {pageContext.previousCampaign ? (
          <Link
            className="font-sans uppercase text-3xl"
            to={`/newsletter/${pageContext.previousCampaign}`}
          >
            &larr;
          </Link>
        ) : (
          <Link className="font-sans text-left" to={`/#2`}>
            Back{` `}
            <br className="md:hidden" />
            Home
          </Link>
        )}
        <h1 className="text-6xl font-accent">
          Breathe Collective:{" "}
          <span className="font-accent">
            {data.mailchimpCampaign.send_time}
          </span>
        </h1>
        {pageContext.nextCampaign ? (
          <Link
            className="font-sans uppercase text-3xl"
            to={`/newsletter/${pageContext.nextCampaign}`}
          >
            &rarr;
          </Link>
        ) : (
          <Link className="font-sans text-right" to={`/#2`}>
            Back{` `}
            <br className="md:hidden" />
            Home
          </Link>
        )}
      </div>

      <iframe
        className="w-screen h-100 flex-grow bg-breathe-blue-1"
        title={data.mailchimpCampaign.settings.subject_line}
        srcDoc={data.mailchimpCampaign.html}
      ></iframe>
    </div>
  )
}

export const query = graphql`
  query MailChimpNewsletter($campaignId: String!) {
    mailchimpCampaign(campaignId: { eq: $campaignId }) {
      html
      settings {
        subject_line
      }
      send_time(formatString: "MMMM")
      campaignId
    }
  }
`

export default Newsletter
