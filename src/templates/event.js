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
  checkInData.then(response => {
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
    console.log(timer)
    return () => clearTimeout(timer)
  }, [checkInState, delayed])

  const selectAttendee = attendee => {
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
      attendeeInfo.then(response => {
        const tempList = response.data.filter(item => !item.CheckedIn)
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
    <div className="flex flex-col text-left items-center">
      <div className="flex flex-col items-between bg-breathe-blue-1 py-8 px-8 shadow mb-16 md:mb-0">
        <div>
          <h3 className="font-serif text-2xl">Check in</h3>
          <p className="mt-2 font-serif text-lg mb-4 md:mb-8">
            {checkInState === "loading" &&
              "Checking you in... Get ready for the event to start!"}
            {checkInState === "choosing" &&
              `Please select who is checking in from the email address ${email}.`}
            {checkInState === "waiting" && "Enter your email to get started."}
          </p>
        </div>
        {checkInState === "waiting" && (
          <div className="gap-2 md:gap-4 grid grid-rows-3 md:grid-rows-2 grid-cols-1 md:grid-cols-4">
            <label
              htmlFor="email"
              className="md:px-4 md:pr-0 md:py-2 text-lg md:text-right font-serif font-normal mt-auto md:my-0"
            >
              Email
            </label>
            <input
              id="email"
              className="row-start-2 md:row-start-1 md:col-start-2 md:col-span-3 px-2 py-1 bg-white focus:outline-none focus:shadow-outline border border-gray-300 appearance-none leading-normal"
              type=""
              name="email"
              placeholder="katie@breathe.thec3.uk"
              onChange={e => setEmail(e.target.value)}
            />
            <button
              className="row-start-3 md:row-start-2 md:col-span-2 md:col-start-2 border shadow bg-salmon-3 text-white hover:bg-salmon-2 font-sans uppercase"
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
            {attendeeList.map(attendee => (
              <button
                className="col-span-1 border shadow bg-salmon-3 text-white hover:bg-salmon-2"
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
            <p className="col-span-1 mt-2 font-serif text-lg mb-4 md:mb-8">
              Stuck? Click the button below to jump into the event
            </p>
            <a
              href={meetingURL}
              className="p-4 my-auto border shadow bg-salmon-3 text-white hover:bg-salmon-2 font-sans uppercase text-center"
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
    <div className="p-8 flex justify-center">
      <a
        href={meetingURL}
        className="p-4 my-auto border shadow bg-breathe-blue-1 text-black hover:bg-breathe-blue-3 hover:text-white font-sans uppercase text-center"
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
      <div className="p-8 m-2 md:m-8 bg-salmon-2 flex flex-col text-center">
        <h1 className="font-accent text-black mb-10">
          Welcome to {page.event_title}
        </h1>
        {page.lead_paragraph && (
          <div className="text-xl font-serif mx-auto md:px-20">
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
        video_password
        video_url {
          ...link
        }
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
