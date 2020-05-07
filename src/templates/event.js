import React, { useState } from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import SEO from "../components/seo"
import Link from "../components/link"
import "../components/layout.css"

import {
  getAttendeeInfo,
  checkAttendeeIn,
  checkAttendeeOut,
} from "../utils/brushfire"

const CheckInComponent = ({
  setCheckedIn,
  sessionId,
  attendeeNo,
  setAttendeeNo,
}) => {
  const [email, setEmail] = useState("")
  const [checkInState, setCheckInState] = useState("waiting")

  const checkIn = () => {
    setCheckInState("loading")
    if (email !== "" && attendeeNo === "") {
      const attendeeInfo = getAttendeeInfo(sessionId, email)
      attendeeInfo.then(response => {
        setAttendeeNo(response.data[0]["AttendeeNumber"])
      })
    }
    if (attendeeNo !== "") {
      const checkInData = checkAttendeeIn(sessionId, attendeeNo)
      checkInData.then(response => {
        setCheckedIn(response.data[0]["Success"])
      })
    }
  }
  return (
    <div className="flex flex-col text-left items-center">
      <div className="flex flex-col items-between bg-breathe-blue-1 py-8 px-8 shadow">
        <div>
          <h3 className="font-serif text-2xl">Check in</h3>
          <p className="mt-2 font-serif text-lg">
            {checkInState === "loading" &&
              "Checking you in... Get ready for the event to start"}
            {checkInState === "waiting" &&
              "Enter your Attendee Number or your email to get started"}
          </p>
        </div>
        {checkInState === "waiting" && (
          <div className="gap-4 grid grid-rows-3 grid-cols-2">
            <label htmlFor="attendee" className="px-4 py-2 text-lg text-right">
              Attendee Number
            </label>
            <input
              id="attendee"
              className="px-2 py-1 bg-white focus:outline-none focus:shadow-outline border border-gray-300 appearance-none leading-normal"
              type="text"
              placeholder="XXXXXX"
              name="attendee"
              onChange={e => setAttendeeNo(e.target.value)}
            />
            <label htmlFor="email" className="px-4 py-2 text-lg text-right">
              Email
            </label>
            <input
              id="email"
              className="px-2 py-1 bg-white focus:outline-none focus:shadow-outline border border-gray-300 appearance-none leading-normal"
              type=""
              name="email"
              placeholder="katie@breathe.thec3.uk"
              onChange={e => setEmail(e.target.value)}
            />
            <button
              className="col-span-2 border shadow bg-salmon-3 text-white hover:bg-salmon-2"
              type="button"
              onClick={() => checkIn()}
            >
              Check in
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const PrivateContent = ({ attendeeNo, sessionId, setCheckedIn }) => {
  const [checkOutState, setCheckOutState] = useState("waiting")
  const checkOut = () => {
    setCheckOutState("loading")
    const checkInData = checkAttendeeOut(sessionId, attendeeNo)
    checkInData.then(response => {
      setCheckedIn(!response.data[0]["Success"])
    })
  }
  return (
    <div>
      {checkOutState === "waiting" && (
        <>
          <div className="p-8 flex justify-center">
            <iframe
              title="test"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/ndR4zhPg7V8"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex flex-col items-end">
            <button
              className="px-3 py-1 border shadow bg-breathe-blue-3 text-white hover:bg-breathe-blue-2"
              type="button"
              onClick={() => checkOut()}
            >
              Leave event
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const PrivatePage = ({ data }) => {
    if (data.prismic === null || data.prismic.online_event === null) {
      return null
    }
  const page = data.prismic.online_event

  const [checkedIn, setCheckedIn] = useState(false)
  const [attendeeNo, setAttendeeNo] = useState("")
  return (
    <BackgroundImage
      Tag="div"
      className="min-h-screen flex flex-col text-black bg-top bg-cover justify-center w-screen h-screen bg-grey-1"
      fluid={page.background_imageSharp.childImageSharp.fluid}
      backgroundColor={page.bg_colour.colour}
    >
      <SEO title="Breathe: Check in" />
      <nav className="py-6 px-8 fixed top-0 animated flex flex-row justify-start min-w-full items-center">
        <div className="uppercase text-lg font-sans text-white">
          <Link to="/">Breathe</Link>
        </div>
      </nav>
      <div className="p-8 m-8 bg-salmon-2 flex flex-col text-center">
        <h1 className="font-accent text-black mb-16">
          Welcome to {page.event_title}
        </h1>
        {checkedIn ? (
          <PrivateContent
            attendeeNo={attendeeNo}
            setCheckedIn={setCheckedIn}
            sessionId={page.brushfire_session_id}
          />
        ) : (
          <CheckInComponent
            setCheckedIn={setCheckedIn}
            attendeeNo={attendeeNo}
            setAttendeeNo={setAttendeeNo}
            sessionId={page.brushfire_session_id}
          />
        )}
      </div>
    </BackgroundImage>
  )
}

export default PrivatePage

export const query = graphql`
  query Event($uid: String!) {
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
        video_id
        lead_paragraph
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
