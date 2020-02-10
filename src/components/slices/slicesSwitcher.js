import React from "react"

import TeamSlice from "./team"
import TextSlice from "./text"
import BlockTitleTextSlice from './block_title_text'

const Slices = ({ slices }) => {
  return slices.map((contentSlice, idx) => {
    var Component;
    switch (contentSlice.type) {
      case 'text':
          Component = TextSlice
          break;
      case "block_title_with_text":
          Component = BlockTitleTextSlice
          break;
      case "team":
        Component = TeamSlice
        break
      default:
        console.warn("default case, content is unhandled")
        return <div></div>
    }
    return (<div className="py-24"><Component key={idx} data={contentSlice} /></div>)
  })
}

export default Slices
