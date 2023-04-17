import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { get, isEmpty } from "lodash"
import { RichText } from "prismic-reactjs"

import SEO from "../components/seo"
import Link from "../components/link"

import "../components/layout.css"

import { getAttendeeInfo, checkAttendeeIn } from "../utils/brushfire"

import { loadState, saveSessionData } from "../utils/event_state.js"

const handleCheckin = (setCheckin, result) => {
  setCheckin(result.attendee.checkedIn)
  saveSessionData(result.sessionId, result)
}

const remoteCheckIn = (sessionId, attendeeNo, email, name, setCheckedIn) => {
  const checkInData = checkAttendeeIn(sessionId, attendeeNo)
  checkInData.then((response) => {
    const checkedIn =
      response.data[0]["Success"] ||
      response.data[0]["Message"] === "Already checked in"
    handleCheckin(setCheckedIn, {
      sessionId: sessionId,
      attendee: {
        checkedIn: checkedIn,
        attendeeNo: attendeeNo,
        email: email,
        name: name,
      },
    })
  })
}

const CheckInComponent = ({
  setCheckedIn,
  sessionId,
  attendeeNo,
  setAttendeeNo,
  email,
  setEmail,
  name,
  setName,
  meetingURL,
}) => {
  const [checkInState, setCheckInState] = useState("waiting")
  const [attendeeList, setAttendeeList] = useState([])
  const [delayed, setDelayed] = useState(false)

  useEffect(() => {
    const timer =
      checkInState === "loading" &&
      !delayed &&
      setTimeout(() => {
        setDelayed(true)
      }, 2000)
    return () => clearTimeout(timer)
  }, [checkInState, delayed])

  const selectAttendee = (attendee) => {
    setAttendeeNo(attendee["AttendeeNumber"])
    const name = `${attendee["FirstName"]} ${attendee["LastName"]}`
    setName(name)
    remoteCheckIn(
      sessionId,
      attendee["AttendeeNumber"],
      email,
      name,
      setCheckedIn
    )
  }

  const checkIn = () => {
    setCheckInState("loading")
    if (email !== "" && attendeeNo === "") {
      const attendeeInfo = getAttendeeInfo(sessionId, email)
      attendeeInfo.then((response) => {
        const tempList = response.data.filter((item) => !item.CheckedIn)
        if (tempList.length > 1) {
          setCheckInState("choosing")
          setAttendeeList(tempList)
        } else if (tempList.length === 1) {
          selectAttendee(tempList[0])
        } else {
          selectAttendee(response.data[0])
        }
      })
    }
    if (attendeeNo !== "") {
      remoteCheckIn(sessionId, attendeeNo, email, name, setCheckedIn)
    }
  }
  return (
    <div className="flex flex-col items-center text-left">
      <div className="flex flex-col px-8 py-8 mb-16 shadow items-between bg-breathe-blue-1 md:mb-0">
        <div>
          <h3 className="font-serif text-2xl">Check in</h3>
          <p className="mt-2 mb-4 font-serif text-lg md:mb-8">
            {checkInState === "loading" &&
              "Checking you in... Get ready for the event to start!"}
            {checkInState === "choosing" &&
              `Please select who is checking in from the email address ${email}.`}
            {checkInState === "waiting" && "Enter your email to get started."}
          </p>
        </div>
        {checkInState === "waiting" && (
          <div className="grid grid-cols-1 grid-rows-3 gap-2 md:gap-4 md:grid-rows-2 md:grid-cols-4">
            <label
              htmlFor="email"
              className="mt-auto font-serif text-lg font-normal md:px-4 md:pr-0 md:py-2 md:text-right md:my-0"
            >
              Email
            </label>
            <input
              id="email"
              className="row-start-2 px-2 py-1 leading-normal bg-white border border-gray-300 appearance-none md:row-start-1 md:col-start-2 md:col-span-3 focus:outline-none focus:shadow-outline"
              type=""
              name="email"
              placeholder="katie@breathe.thec3.uk"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="row-start-3 font-sans text-white uppercase border shadow md:row-start-2 md:col-span-2 md:col-start-2 bg-salmon-3 hover:bg-salmon-2"
              type="button"
              onClick={() => checkIn()}
            >
              Check in
            </button>
          </div>
        )}
        {checkInState === "choosing" && !isEmpty(attendeeList) && (
          <div
            className={`gap-4 grid grid-rows-${attendeeList.length} grid-cols-1 w-1/2 mx-auto`}
          >
            {attendeeList.map((attendee) => (
              <button
                className="col-span-1 text-white border shadow bg-salmon-3 hover:bg-salmon-2"
                type="button"
                key={attendee.AttendeeNumber}
                onClick={() => selectAttendee(attendee)}
              >
                {attendee.FirstName} {attendee.LastName}
              </button>
            ))}
          </div>
        )}
        {checkInState === "loading" && delayed && (
          <div className={`gap-4 grid grid-rows-2 grid-cols-1 w-3/4 mx-auto`}>
            <p className="col-span-1 mt-2 mb-4 font-serif text-lg md:mb-8">
              Stuck? Click the button below to jump into the event
            </p>
            <a
              href={meetingURL}
              className="p-4 my-auto font-sans text-center text-white uppercase border shadow bg-salmon-3 hover:bg-salmon-2"
            >
              Join the Event
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

const PrivateContent = ({ meetingURL }) => {
  return (
    <div className="flex justify-center p-8">
      <a
        href={meetingURL}
        className="p-4 my-auto font-sans text-center text-black uppercase border shadow bg-breathe-blue-1 hover:bg-breathe-blue-3 hover:text-white"
      >
        Join the Event
      </a>
    </div>
  )
}

const PrivatePage = ({ data }) => {
  const localEventState = loadState()

  // small hack to prevent type error with brushfire_session_id
  const page = get(data, "prismic.online_event", {
    prismic: null,
    brushfire_session_id: "null",
  })
  const attendeePath = `sessions.${page && page.brushfire_session_id}.attendee`
  const [checkedIn, setCheckedIn] = useState(
    get(localEventState, `${attendeePath}.checkedIn`, false)
  )
  const [attendeeNo, setAttendeeNo] = useState(
    get(localEventState, `${attendeePath}.attendeeNo`, "")
  )
  const [email, setEmail] = useState(
    get(localEventState, `${attendeePath}.email`, "")
  )
  const [name, setName] = useState(
    get(localEventState, `${attendeePath}.name`, "")
  )

  if (page === null) {
    return null
  }
  return (
    <BackgroundImage
      Tag="div"
      className="flex flex-col justify-center w-screen min-h-screen text-black bg-top bg-cover md:h-screen bg-grey-1"
      fluid={page.background_image.fluid}
      backgroundColor={page.bg_colour.document.data.document.data.colour}
    >
      <SEO title={`Breathe ${page.event_title}: Check in`} />
      <nav className="top-0 flex flex-row items-center justify-start min-w-full px-8 py-6 md:fixed animated">
        <div className="font-sans text-lg text-white uppercase">
          <Link to="/">Breathe</Link>
        </div>
      </nav>
      <div className="flex flex-col p-8 m-2 text-center md:m-8 bg-salmon-2">
        <h1 className="mb-10 text-black font-accent">
          Welcome to {page.event_title}
        </h1>
        {page.lead_paragraph && (
          <div className="mx-auto font-serif text-xl md:px-20">
            {RichText.render(page.lead_paragraph)}
          </div>
        )}
        {checkedIn ? (
          <PrivateContent meetingURL={page.video_url.url} />
        ) : (
          <CheckInComponent
            setCheckedIn={setCheckedIn}
            attendeeNo={attendeeNo}
            setAttendeeNo={setAttendeeNo}
            sessionId={page.brushfire_session_id}
            email={email}
            name={name}
            setEmail={setEmail}
            setName={setName}
            meetingURL={page.video_url.url}
          />
        )}
      </div>
    </BackgroundImage>
  )
}

export default PrivatePage

export const query = graphql`
  query Event($uid: String!) {
    prismicOnlineEvent(uid: { eq: $uid }) {
      id
      uid

      data {
        bg_colour {
          ...colour
        }
        event_title
        video_id
        video_password
        # video_url {
        #   ...link
        # }
        lead_paragraph {
          richText
          html
        }
        background_image {
          fluid(maxWidth: 1920) {
            ...GatsbyPrismicImageFluid
          }
        }
        brushfire_session_id
      }
    }
  }
`
