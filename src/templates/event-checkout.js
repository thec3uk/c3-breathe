import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { get } from "lodash"
import { RichText } from "prismic-reactjs"

import SEO from "../components/seo"
import Link from "../components/link"
import "../components/layout.css"

import {
  checkAttendeeOut,
} from "../utils/brushfire"

import {
  loadState,
  saveSessionData,
} from "../utils/event_state.js"

const handleCheckin = (setCheckin, result) => {
  setCheckin(result.attendee.checkedIn)
  saveSessionData(result.sessionId, result)
}

const PrivatePage = ({ data }) => {
  const localEventState = loadState()

  // small hack to prevent type error with brushfire_session_id
  const page = get(data, "prismic.online_event", {
    prismic: null,
    brushfire_session_id: "null",
  })
  const attendeePath = `sessions.${page && page.brushfire_session_id}.attendee`
  const checkedInHook = useState(
    get(localEventState, `${attendeePath}.checkedIn`, false)
  )
  const setCheckedIn = checkedInHook[1]
  const attendeeNo = get(localEventState, `${attendeePath}.attendeeNo`, "")

  useEffect(() => {
    const checkInData = checkAttendeeOut(
      page.brushfire_session_id,
      attendeeNo
    )
    checkInData.then(response => {
      if (!response.data[0]["Success"]) {
        console.warn(response.data[0]["Message"])
      }
      handleCheckin(setCheckedIn, {
        sessionId: page.brushfire_session_id,
        attendee: {
          checkedIn: false
        },
      })
    })
  }, [page, attendeeNo, setCheckedIn])

  if (page === null) {
    return null
  }

  return (
    <BackgroundImage
      Tag="div"
      className="min-h-screen flex flex-col text-black bg-top bg-cover justify-center w-screen md:h-screen bg-grey-1"
      fluid={page.background_imageSharp.childImageSharp.fluid}
      backgroundColor={page.bg_colour.colour}
    >
      <SEO title={`Breathe ${page.event_title}: Check in`} />
      <nav className="py-6 px-8 md:fixed top-0 animated flex flex-row justify-start min-w-full items-center">
        <div className="uppercase text-lg font-sans text-white">
          <Link to="/">Breathe</Link>
        </div>
      </nav>
      <style>
        {`html, body {
          min-height: initial;
          min-width: initial;
          overflow:auto;
        }`}
      </style>
      <div className="p-8 m-2 md:m-8 bg-salmon-2 flex flex-col text-center">
        <h1 className="font-accent text-black mb-10">
          Thanks for attending {page.event_title}
        </h1>
        <div>{RichText.render(page.upsell_text)}</div>
      </div>

    </BackgroundImage>
  )
}

export default PrivatePage

export const query = graphql`
  query EventCheckout($uid: String!) {
    prismic {
      online_event(lang: "en-gb", uid: $uid) {
        _meta {
          id
          uid
        }
        bg_colour {
          ...colour
        }
        event_title
        upsell_text
        background_image
        background_imageSharp {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        brushfire_session_id
      }
    }
  }
`
