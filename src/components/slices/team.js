import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
// import Img from 'gatsby-image';
import get from "lodash/get"

const LargeBioText = ({ person }) => {
  return (
    <div
      className={`${
        person.reversed ? "lg:pr-12" : "lg:pl-12"
      } flex justify-center flex-col`}
    >
      <h3 className="text-2xl lg:text-5xl mt-8 lg:mt-0 font-serif uppercase">
        {RichText.asText(person.first_and_lastname)}
      </h3>
      <div className="text-justify">{RichText.render(person.position)}</div>
    </div>
  )
}

const LargeBio = ({ person }) => {
  // const sharpImage = get(person, 'portraitSharp.childImageSharp.fixed');
  return (
    <div
      className={`flex ${
        person.reversed ? "flex-col-reverse" : "flex-col"
      } lg:flex-row mt-12`}
    >
      {person.reversed && <LargeBioText person={person} />}
      {person.show_image && (
        // sharpImage ? (
        //   <Img fixed={sharpImage} className="rounded-full max-w-xxs" />
        // ) : (
        <img
          src={get(person, "portrait.url")}
          className="rounded-full max-w-xxs self-start"
          alt={RichText.asText(person.first_and_lastname)}
        />
        // )
      )}
      {!person.reversed && <LargeBioText person={person} />}
    </div>
  )
}

const SmallBio = ({ person, idx }) => {
  return (
    <div
      className={`flex justify-start flex-col mt-16 col-start-1 col-end-3 ${
        idx % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2"
      } ${idx % 2 === 0 ? "lg:col-end-2" : "lg:col-end-3"}`}
    >
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
    <section className="px-8 lg:px-16 text-black">
      <h2 className="text-4xl lg:text-6xl font-serifAlt">
        {RichText.asText(data.primary.team_section)}
      </h2>
      {data.fields
        .filter(person => person.show_image)
        .map((person, idx) => {
          return <LargeBio key={idx} person={person} />
        })}
      <div className="grid grid-cols-2 lg:col-span-1 col-gap-32 mt-10">
        {data.fields
          .filter(person => !person.show_image)
          .map((person, idx) => {
            return <SmallBio key={idx} person={person} idx={idx} />
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
