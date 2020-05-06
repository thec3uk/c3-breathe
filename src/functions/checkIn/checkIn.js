/* eslint-disable */
const fetch = require("node-fetch")
exports.handler = async function(event, context) {
  const { sessionNo, attendeeNo } = JSON.parse(event.body)
  const authToken = process.env.BRUSHFIRE_AUTH_TOKEN
  const url = `https://api.brushfire.com/sessions/${sessionNo}/checkin`
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "api-version": "2019-10-30",
    Authorization: `Basic ${authToken}`,
  }
  try {
    const response = await fetch(url, {
      method: 'post',
      body:    JSON.stringify({
        "Codes": [attendeeNo]
      }),
      headers: headers,
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
