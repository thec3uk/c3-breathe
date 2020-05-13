const crypto = require('crypto') // crypto comes with Node.js

function generateSignature(apiKey, apiSecret, meetingNumber, role) {

  // Prevent time sync issue between client signature generation and zoom
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature
}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const { meetingNumber } = JSON.parse(event.body)
    const signature = generateSignature(process.env.ZOOM_API_KEY, process.env.ZOOM_API_SECRET, meetingNumber, 0)
    return {
      statusCode: 200,
      body: JSON.stringify({ signature: signature })
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
