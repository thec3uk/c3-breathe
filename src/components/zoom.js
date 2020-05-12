import React from "react"
import { ZoomMtg } from "@zoomus/websdk"
import axios from "axios"
import $ from "jquery"

import "./zoom.css"



ZoomMtg.setZoomJSLib("/zoom", "/av")
ZoomMtg.preLoadWasm()
ZoomMtg.prepareJssdk()


const ZoomEmbed = ({ enabled, meetingNo, password, signatureUrl, email, name, leaveUrl }) => {
  if (enabled) {
    $("#zmmtg-root").css('display', 'block');
  }
  console.log(name, email);
  axios
    .post(signatureUrl, {
      meetingNumber: meetingNo,
    })
    .then(result => {
      const { signature } = result.data
      ZoomMtg.init({
        leaveUrl: leaveUrl,
        // disableJoinAudio: true,
        disableInvite: true,
        disableCallOut: true,
        // audioPanelAlwaysOpen: false,
        success: function(success) {
          ZoomMtg.join({
            meetingNumber: meetingNo,
            apiKey: process.env.GATSBY_ZOOM_API_KEY,
            userName: name,
            signature: signature,
            passWord: password,
            userEmail: email,
            success: function(success) {
              console.log("join meeting success")
            },
            error: function(res) {
              console.log(res)
            },
          })
        },
        error: function(res) {
          console.log(res)
        },
      })

    })
  return (
    <div id="zoom-component-container">
      Zoom Meeting should start here. <br/>
      If you appear to be having issues with joining then please use this link:{` `}
      <a className="underline text-breathe-blue-1" href={`https://zoom.us/j/${meetingNo}`}>{`https://zoom.us/j/${meetingNo}`}</a> (Password: {password})
    </div>
  )
}

export default ZoomEmbed
