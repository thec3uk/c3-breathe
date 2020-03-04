import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
// import Img from 'gatsby-image';
import get from 'lodash/get';

const LargeBio = ({ person }) => {
    // const sharpImage = get(person, 'portraitSharp.childImageSharp.fixed');
    return (
      <div  className="flex flex-row mt-12">
        {person.reversed && (
          <div className="pr-12 flex justify-center flex-col">
            <h3 className="text-5xl font-serif uppercase">
              {RichText.asText(person.first_and_lastname)}
            </h3>
            <div className="text-justify">
              {RichText.render(person.position)}
            </div>
          </div>
        )}
        {person.show_image && (
          // sharpImage ? (
          //   <Img fixed={sharpImage} className="rounded-full max-w-xxs" />
          // ) : (
            <img src={get(person, 'portrait.url')} className="rounded-full max-w-xxs" alt={person.first_and_lastname} />
          // )
        )}
        {!person.reversed && (
          <div className="pl-12 flex justify-center flex-col">
            <h3 className="text-5xl font-serif uppercase text-right">
              {RichText.asText(person.first_and_lastname)}
            </h3>
            <div className="text-justify">
              {RichText.render(person.position)}
            </div>
          </div>
        )}
      </div>
    )
}

const SmallBio = ({ person }) => {
    return (
      <div className="flex justify-start flex-col mt-16">
        <h3 className="text-4xl font-serif uppercase">
          {RichText.asText(person.first_and_lastname)}
        </h3>
        <div className="text-justify mt-6">
          {RichText.render(person.position)}
        </div>
      </div>
    )
}

const TeamSlice = ({ data }) => {
  return (
    <section className="px-16 text-black">
      <h2 className="text-6xl font-serifAlt">
        {RichText.asText(data.primary.team_section)}
      </h2>
      {data.fields.filter((person) => person.show_image).map((person, idx) => {
        return <LargeBio key={idx} person={person} />
      })}
      <div className="grid grid-cols-2 col-gap-32 mt-10">
      {data.fields.filter((person) => !person.show_image).map((person, idx) => {
        return <SmallBio key={idx} person={person} />
      })}
      </div>
    </section>
  )
}

export const query = graphql`
  fragment teamSlice on PRISMIC_PageBodyTeam {
    type
    fields {
      position
      portrait
      portraitSharp {
        childImageSharp {
          fixed(width: 200, height: 200, quality: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      show_image
      first_and_lastname
      reversed
    }
    primary {
      team_section
    }
  }
`

export default TeamSlice
