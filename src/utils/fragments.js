import { graphql } from 'gatsby';

const Colour = graphql`fragment colour on PRISMIC_Colour {
  colour
}`

const Link = graphql`fragment link on PRISMIC__Linkable {
  _linkType
  ... on PRISMIC__Document {
    _meta {
      uid
      id
    }
  }
  ... on PRISMIC__FileLink {
    url
    name
    size
  }
  ... on PRISMIC__ImageLink {
    url
    name
    size
    height
    width
  }
  ... on PRISMIC__ExternalLink {
    url
  }
}`

export {
  Colour,
  Link
}
