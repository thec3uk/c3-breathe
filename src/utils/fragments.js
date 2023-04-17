import { graphql } from "gatsby"

const Colour = graphql`
  fragment colour on PrismicLinkType {
    document {
      ... on PrismicColour {
        data {
          colour
        }
      }
    }
  }
`

const Link = graphql`
  fragment link on PrismicLinkType {
    link_type
    id
    uid
    #    ... on PRISMIC__Document {
    #        uid
    #        id

    #    }
    url
    document {
      __typename
      ... on PrismicRedirect {
        uid
        url
      }
      ... on PrismicPage {
        uid
        url
      }
    }
    # ... on PRISMIC__FileLink {
    #   url
    #   name
    #   size
    #   _linkType
    # }
    # ... on PRISMIC__ImageLink {
    #   url
    #   name
    #   size
    #   height
    #   width
    #   _linkType
    # }
    # ... on PRISMIC__ExternalLink {
    #   url
    #   _linkType
    # }
  }
`

export { Colour, Link }
