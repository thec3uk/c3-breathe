import React, { useState, useEffect } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { useStaticQuery, graphql } from "gatsby"
import { PrismicRichText } from "@prismicio/react"

const _postEmailToMailchimp = (email, attributes, setStatus, setMessage) => {
  addToMailchimp(email, attributes)
    .then((result) => {
      // Mailchimp always returns a 200 response
      // So we check the result for MC errors & failures
      setMessage(result.msg)
      setStatus(result.result !== "success" ? "error" : "success")
    })
    .catch((err) => {
      // Network failures, timeouts, etc
      setStatus("error")
      setMessage(err)
    })
}

const _handleSubmit = (e, email, setStatus, setMessage) => {
  e.preventDefault()
  e.stopPropagation()
  setStatus("sending")
  setMessage(null)
}

const NewsletterSlice = () => {
  const [status, setStatus] = useState("pending")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState(null)
  useEffect(() => {
    if (status === "sending" && message === null) {
      _postEmailToMailchimp(
        email,
        {
          SIGNUPURL: document.location.pathname,
          SOURCE: "website signup",
        },
        setStatus,
        setMessage
      )
    }
  }, [status, message, email])
  const query = graphql`
    query NewsletterInfo {
      allPrismicContactInformation {
        edges {
          node {
            data {
              newsletter_title
              newsletter_brief {
                html
                richText
              }
            }
          }
        }
      }
    }
  `
  const data = useStaticQuery(query)
  const newsletter = data.allPrismicContactInformation.edges[0].node.data

  return (
    <section className="flex flex-row justify-end px-0 py-12 text-black md:py-0 md:px-16 md:-mx-24 bg-salmon-1">
      <div className="absolute left-0 z-10 w-full h-auto px-8 py-12 mt-16 bg-white shadow-md lg:w-8/12 lg:-mx-16 md:mt-48 lg:mt-24 lg:mb-48 lg:px-48">
        <h3 className="mb-6 uppercase font-serifAlt">
          {newsletter.newsletter_title}
        </h3>
        <div className="lg:mr-32">
          <PrismicRichText field={newsletter.newsletter_brief.richText} />
        </div>
        <form className="mb-4" method="post">
          {status === "success" ? (
            <div>{message}</div>
          ) : (
            <div>
              <label
                className="block mb-2 font-serif text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="flex flex-col lg:flex-row">
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border border-black shadow-inner appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="katie@thec3.uk"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="px-6 py-2 mt-4 font-serif uppercase border border-black shadow lg:mt-0 lg:ml-4 hover:bg-salmon-3 hover:text-white"
                  onClick={(e) =>
                    _handleSubmit(e, email, setStatus, setMessage)
                  }
                >
                  Subscribe
                </button>
              </div>
              {status === "error" && (
                <div dangerouslySetInnerHTML={{ __html: message }} />
              )}
            </div>
          )}
        </form>
      </div>
      <div className="flex flex-row items-end justify-end bg-breathe-blue-1 lg:mr-12 lg:w-7/12">
        <img
          src="/images/a223-24-blue.jpg"
          alt="Women in a field"
          style={{
            height: "680px",
          }}
        />
      </div>
    </section>
  )
}

export default NewsletterSlice
