import React, { useState, useEffect } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { StaticQuery, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"

const _postEmailToMailchimp = (email, attributes, setStatus, setMessage) => {
  addToMailchimp(email, attributes)
    .then(result => {
      // Mailchimp always returns a 200 response
      // So we check the result for MC errors & failures
      setMessage(result.msg)
      setStatus(result.result !== "success" ? "error" : "success")
    })
    .catch(err => {
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
      prismic {
        allContact_informations {
          edges {
            node {
              newsletter_title
              newsletter_brief
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
      render={data => {
        const newsletter =
          data.prismic.allContact_informations.edges[0].node
        return (
          <section className="px-0 py-12 md:py-0 md:px-16 text-black md:-mx-24 bg-salmon-1 flex flex-row justify-end">
            <div className="bg-white w-full lg:w-8/12 z-10 shadow-md lg:-mx-16 mt-16 md:mt-48 lg:mt-24 lg:mb-48 h-auto px-8 lg:px-48 py-12 absolute left-0">
              <h3 className="uppercase font-serifAlt mb-6">{newsletter.newsletter_title}</h3>
              <div className="lg:mr-32">{RichText.render(newsletter.newsletter_brief)}</div>
              <form className="mb-4" method="post">
                {status === "success" ? (
                  <div>{message}</div>
                ) : (
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-serif font-bold mb-2"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <div className="flex flex-col lg:flex-row">
                      <input
                        className="shadow-inner appearance-none border border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="katie@thec3.uk"
                        onChange={e => setEmail(e.target.value)}
                      />
                      <button
                        className="mt-4 lg:mt-0 lg:ml-4 border border-black shadow uppercase font-serif px-6 py-2 hover:bg-salmon-3 hover:text-white"
                        onClick={e =>
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
            <div className="bg-breathe-blue-1 lg:mr-12 lg:w-7/12 flex flex-row justify-end items-end">
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
      }}
    />
  )
}

export default NewsletterSlice
