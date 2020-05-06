import axios from 'axios'


async function getAttendeeInfo (sessionNo, email) {
    return await axios.post(`/.netlify/functions/getAttendeeInfo`, {
      sessionNo, email
    })
}

async function checkAttendeeIn (sessionNo, attendeeNo) {
    return await axios.post(`/.netlify/functions/checkIn`, {
      sessionNo, attendeeNo
    })
}

async function checkAttendeeOut (sessionNo, attendeeNo) {
    return await axios.post(`/.netlify/functions/checkOut`, {
      sessionNo, attendeeNo
    })
}

export {
  getAttendeeInfo,
  checkAttendeeIn,
  checkAttendeeOut,
}
