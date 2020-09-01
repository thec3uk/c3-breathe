// {
//     event: event_title,
//     sessions: {
//         sessionId: {
//             sessionId: sessionId
//             attendee: {
//                 attendeeNo: attendeeNo
//                 checkedIn: true|false
//             }
//         }
//     }
// }

import { setWith, mergeWith, isArray } from "lodash"

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

const loadState = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem("eventState")) || {}
  }
  return {}
}

// QUESTION: Should this pull the existing data and perform a merge?
// This means we can just send what we need to the function rather than everything...
const saveState = state => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("eventState", JSON.stringify(state))
  }
}

const getSessionData = sessionId => {
  const state = loadState()
  return "sessions" in state && state.sessions[sessionId] !== undefined
    ? state.sessions[sessionId]
    : {}
}

const saveSessionData = (sessionId, sessionData) => {
  const state = loadState()

  setWith(
    state,
    `sessions.${sessionId}`,
    mergeWith(getSessionData(sessionId), sessionData, customizer),
    Object
  )
  saveState(state)
}

export { loadState, saveState, getSessionData, saveSessionData }
