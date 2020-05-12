import React, { useState } from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import $ from "jquery"
import { get, isEmpty } from "lodash"
import { RichText } from "prismic-reactjs"

import SEO from "../components/seo"
import Link from "../components/link"
import ZoomEmbed from "../components/zoom"
import "../components/layout.css"

import {
  getAttendeeInfo,
  checkAttendeeIn,
  checkAttendeeOut,
} from "../utils/brushfire"

import {
  loadState,
  saveSessionData,
} from "../utils/event_state.js"

const checkOutParamName = "checkOut"

const handleCheckin = (setCheckin, result) => {
  setCheckin(result.attendee.checkedIn)
  saveSessionData(result.sessionId, result)
}

const remoteCheckIn = (sessionId, attendeeNo, email, name, setCheckedIn) => {
  const checkInData = checkAttendeeIn(sessionId, attendeeNo)
  checkInData.then(response => {
    handleCheckin(setCheckedIn, {
      sessionId: sessionId,
      attendee: {
        checkedIn: response.data[0]["Success"],
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
}) => {
  const [checkInState, setCheckInState] = useState("waiting")
  const [attendeeList, setAttendeeList] = useState([])

  const selectAttendee = (attendee) => {
    setAttendeeNo(attendee["AttendeeNumber"])
    // const name = `${attendee["FirstName"]} ${attendee["LastName"]}`
    const name = attendee["FirstName"]
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
    console.log(email, attendeeNo, name)
    setCheckInState("loading")
    if (email !== "" && attendeeNo === "") {
      const attendeeInfo = getAttendeeInfo(sessionId, email)
      attendeeInfo.then(response => {
        const tempList = response.data.filter(item => !item.CheckedIn)
        if (tempList.length > 1) {
          setCheckInState("choosing")
          setAttendeeList(tempList)
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
      <div className="flex flex-col items-between bg-breathe-blue-1 py-8 px-8 shadow">
        <div>
          <h3 className="font-serif text-2xl">Check in</h3>
          <p className="mt-2 font-serif text-lg">
            {checkInState === "loading" &&
              "Checking you in... Get ready for the event to start!"}
            {checkInState === "choosing" &&
              `Please select who is checking in from the email address ${email}.`}
            {checkInState === "waiting" &&
              "Enter your email to get started."}
          </p>
        </div>
        {checkInState === "waiting" && (
          <div className="gap-4 grid grid-rows-2 grid-cols-4">
            <label htmlFor="email" className="px-4 py-2 text-lg text-right">
              Email
            </label>
            <input
              id="email"
              className="col-span-3 px-2 py-1 bg-white focus:outline-none focus:shadow-outline border border-gray-300 appearance-none leading-normal"
              type=""
              name="email"
              placeholder="katie@breathe.thec3.uk"
              onChange={e => setEmail(e.target.value)}
            />
            <button
              className="col-span-2 col-start-2 border shadow bg-salmon-3 text-white hover:bg-salmon-2"
              type="button"
              onClick={() => checkIn({
                AttendeeNumber: attendeeNo
              })}
            >
              Check in
            </button>
          </div>
        )}
        {checkInState === "choosing" && !isEmpty(attendeeList) && (
          <div className={`gap-4 grid grid-rows-${attendeeList.length} grid-cols-1 w-1/2 mx-auto`}>
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
      </div>
    </div>
  )
}

const PrivateContent = ({
  attendeeNo,
  sessionId,
  setCheckedIn,
  checkedIn,
  meetingNo,
  password,
  email,
  name,
}) => {
  const leaveUrl =
    typeof window !== "undefined" &&
    window.location.href.includes(checkOutParamName)
      ? window.location.href
      : `${window.location.href}?${checkOutParamName}=1`

  return (
      <div className="p-8 flex justify-center">

        <ZoomEmbed
          enabled={checkedIn}
          meetingNo={meetingNo}
          password={password}
          signatureUrl={"/.netlify/functions/zoomGenerateSignature"}
          email={email}
          name={name}
          leaveUrl={leaveUrl}
        />
      </div>
  )
}

// <iframe
//   className="w-full h-104 border-0"
//   src={`https://zoom.us/wc/join/${meetingNo}?prefer=0&un=${btoa(name)}&uel=${btoa(email)}&pwd=${password}`}
//   sandbox="allow-forms allow-scripts allow-same-origin" allow="microphone; camera; fullscreen">
// </iframe>



const PrivatePage = ({ data }) => {
  const localEventState = loadState()
  var Urlcheckout = false

  // small hack to prevent type error with brushfire_session_id
  const page = get(data, "prismic.online_event", {
    prismic: null,
    brushfire_session_id: "null",
  })
  const attendeePath = `sessions.${page.brushfire_session_id}.attendee`
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

  if (page.prismic === null) {
    return null
  }

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search)
    Urlcheckout = params.get(checkOutParamName) === "1"
    if (Urlcheckout) {
      $("#zmmtg-root").css("display", "none")
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
            checkedIn: false,
            attendeeNo: attendeeNo,
            email: email,
            name: name,
          },
        })
        // saveSessionData(page.brushfire_session_id, )
      })
    }
  }

  return (
    <BackgroundImage
      Tag="div"
      className="min-h-screen flex flex-col text-black bg-top bg-cover justify-center w-screen h-screen bg-grey-1"
      fluid={page.background_imageSharp.childImageSharp.fluid}
      backgroundColor={page.bg_colour.colour}
    >
      <SEO title={`Breathe ${page.event_title}: Check in`} />
      <nav className="py-6 px-8 fixed top-0 animated flex flex-row justify-start min-w-full items-center">
        <div className="uppercase text-lg font-sans text-white">
          <Link to="/">Breathe</Link>
        </div>
      </nav>
      <div className="p-8 m-8 bg-salmon-2 flex flex-col text-center">
        <h1 className="font-accent text-black mb-10">
          {Urlcheckout ? `Thanks for attending` : `Welcome to`}{" "}
          {page.event_title}
        </h1>
        {!Urlcheckout && page.lead_paragraph && (<div className="text-xl font-serif mb-12 mx-auto px-20">{RichText.render(page.lead_paragraph)}</div>)}
        {checkedIn ? (
          <PrivateContent
            attendeeNo={attendeeNo}
            setCheckedIn={setCheckedIn}
            checkedIn={checkedIn}
            sessionId={page.brushfire_session_id}
            meetingNo={page.video_id}
            password={page.video_password}
            email={email}
            name={name}
          />
        ) : Urlcheckout ? (
          <div>{RichText.render(page.upsell_text)}</div>
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
          />
        )}
      </div>
      <script type="text/javascript">
          {`window._chatlio = window._chatlio||[];
          !function(){ var t=document.getElementById("chatlio-widget-embed");if(t&&window.ChatlioReact&&_chatlio.init)return void _chatlio.init(t,ChatlioReact);for(var e=function(t){return function(){_chatlio.push([t].concat(arguments)) }},i=["configure","identify","track","show","hide","isShown","isOnline", "page", "open", "showOrHide"],a=0;a<i.length;a++)_chatlio[i[a]]||(_chatlio[i[a]]=e(i[a]));var n=document.createElement("script"),c=document.getElementsByTagName("script")[0];n.id="chatlio-widget-embed",n.src="https://w.chatlio.com/w.chatlio-widget.js",n.async=!0,n.setAttribute("data-embed-version","2.3");
             n.setAttribute('data-widget-id','4264b4c8-c57d-4ac6-7c68-b7baed5dd091');
             c.parentNode.insertBefore(n,c);
          }();`}
      </script>


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
        lead_paragraph
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
