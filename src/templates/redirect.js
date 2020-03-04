import React from "react"
import { graphql } from "gatsby"

import { Link } from '../utils/fragments'

const Redirect = ({ data }) => {
  return data.prismic.redirect !== null ? (
    <div>
      Redirecting you to {data.prismic.redirect.title}:{" "}
      {data.prismic.redirect.url.url}
    </div>
  ) : (
    <div>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

export const query = graphql`
  query Redirect($uid: String!) {
    prismic {
      redirect(lang: "en-gb", uid: $uid) {
        title
        url {
          ...link
        }
        _meta {
          uid
        }
      }
    }
  }
`

export default Redirect

Redirect.fragments = [Link]
