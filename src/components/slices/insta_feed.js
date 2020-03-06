import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import { withPreview } from "gatsby-source-prismic-graphql"
import Link from "../link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

const InstaPhoto = ({ photo, idx }) => {
  const [hover, setHover] = useState(false)
  const thumb = photo.thumbnails.filter(p => p.config_width === 320)[0]
  const seed = Math.round(Math.random() * 40)
  const colour = [
    "breathe-blue-1",
    "breathe-blue-2",
    "salmon-1",
    "salmon-3",
    "grey-1",
  ]
  const pad = ["8px", "0", "0px"]
  const border = ["border-0", "border-8", "border-4"]
  return (
    <div className="p-0" onMouseEnter={e => setHover(true)} onMouseLeave={e => setHover(false)}>
      <img
        src={thumb.src}
        className={`${border[seed % 3]} border-${colour[seed % 5]}`}
        style={{
          padding: pad[seed % 3],
          height: thumb.config_width,
          width: thumb.config_width,
        }}
        alt=""
      />
      {hover && <Link target="_blank" to={`https://www.instagram.com/p/${photo.id}/`}><div
        className="flex flex-col justify-center text-center p-8 relative z-20 text-white bg-black-trans"
        style={{
          marginTop: -thumb.config_width,
          height: thumb.config_width,
          width: thumb.config_width,
        }}
      >
        <div className="flex flex-row justify-center items-center">
          <FontAwesomeIcon
            icon={faHeart}
            fixedWidth
            size="sm"
            className="h-8 inline-block"
          />
          <div className="inline-block pl-4 text-sm">{photo.likes}</div>
        </div>
        <p className="text-xs">{photo.caption.length > 200 ? `${photo.caption.slice(0, 180)}...` : photo.caption}</p>
      </div></Link>}
    </div>
  )
}

// different padding, 5, 10
// diffent colours w, b1 b2, s1, s3

const InstaFeedSlice = ({ data }) => {
  const staticQuery = graphql`
    query Insta {
      first: allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 5) {
        nodes {
          caption
          likes
          id
          thumbnails {
            config_height
            config_width
            src
          }
          timestamp
        }
      }
      second: allInstaNode(
        sort: { fields: timestamp, order: DESC }
        limit: 6
        skip: 3
      ) {
        nodes {
          caption
          likes
          id
          thumbnails {
            config_height
            config_width
            src
          }
          timestamp
        }
      }
      third: allInstaNode(
        sort: { fields: timestamp, order: DESC }
        limit: 5
        skip: 7
      ) {
        nodes {
          caption
          likes
          id
          thumbnails {
            config_height
            config_width
            src
          }
          timestamp
        }
      }
    }
  `
  return (
    <StaticQuery
      query={`${staticQuery}`}
      render={withPreview(
        data => (
          <section className="mx-32 -mx-24 pt-20 overflow-x-hidden">
            <div className="flex flex-col">
              <div className="-mr-40 flex flex-row">
                {data.first.nodes.map((photo, idx) => (
                  <InstaPhoto key={idx} idx={idx} photo={photo} />
                ))}
              </div>
              <div className="-ml-64 -mr-64 flex flex-row">
                {data.second.nodes.map((photo, idx) => (
                  <InstaPhoto key={idx} idx={idx} photo={photo} />
                ))}
              </div>
              <div className="-ml-40 flex flex-row">
                {data.third.nodes.map((photo, idx) => (
                  <InstaPhoto key={idx} idx={idx} photo={photo} />
                ))}
              </div>
            </div>
          </section>
        ),
        staticQuery
      )}
    />
  )
}

export const query = graphql`
  fragment InstaFeedSlice on PRISMIC_PageBodyLatest_instagram_photos {
    type
  }
`

export default InstaFeedSlice
