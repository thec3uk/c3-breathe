import { graphql } from 'gatsby';

const Colour = graphql`fragment colour on PRISMIC_Colour {
  colour
}`

export {
  Colour
}
