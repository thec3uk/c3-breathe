import React from "react"
import { graphql } from "gatsby"
import { PrismicText, PrismicRichText } from "@prismicio/react"
import Img from "gatsby-image"
import get from "lodash/get"

const LargeBioText = ({ person }) => {
  return (
    <div
      className={`${
        person.reversed ? "lg:pr-12" : "lg:pl-12"
      } flex justify-center flex-col`}
    >
      <h3 className="mt-8 font-serif text-2xl uppercase lg:text-5xl lg:mt-0">
        <PrismicText field={person.first_and_lastname.richText} />
      </h3>
      <div className="text-justify">
        <PrismicRichText field={person.position.richText} />
      </div>
    </div>
  )
}

const LargeBio = ({ person }) => {
  const sharpImage = get(person, "portrait.fixed")
  return (
    <div
      className={`flex ${
        person.reversed ? "flex-col-reverse" : "flex-col"
      } lg:flex-row mt-12`}
    >
      {person.reversed && <LargeBioText person={person} />}
      {
        person.show_image && (
          // (sharpImage ? (
          //   <Img
          //     fixed={sharpImage}
          //     className="self-start rounded-full"
          //   />
          // ) : (
          <img
            src={get(person, "portrait.url")}
            className="self-start rounded-full max-w-xs"
            alt={<PrismicText field={person.first_and_lastname.text} />}
          />
        )
        // ))
      }
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
      <h3 className="font-serif text-4xl uppercase">
        <PrismicText field={person.first_and_lastname} />
      </h3>
      <div className="mt-6 text-justify">
        <PrismicText field={person.position} />
      </div>
    </div>
  )
}

const TeamSlice = ({ data }) => {
  return (
    <section className="px-8 text-black lg:px-16">
      <h2 className="text-4xl lg:text-6xl font-serifAlt">
        <PrismicText field={data.primary.team_section} />
      </h2>
      {data.items
        .filter((person) => person.show_image)
        .map((person, idx) => {
          return <LargeBio key={idx} person={person} />
        })}
      <div className="grid grid-cols-2 col-gap-32 mt-10 lg:col-span-1">
        {data.items
          .filter((person) => !person.show_image)
          .map((person, idx) => {
            return <SmallBio key={idx} person={person} idx={idx} />
          })}
      </div>
    </section>
  )
}

export const query = graphql`
  fragment teamSlice on PrismicPageDataBodyTeam {
    slice_type
    items {
      position {
        html
        richText
        text
      }
      portrait {
        fixed(width: 200, height: 200, quality: 90) {
          ...GatsbyPrismicImageFixed
        }
        url
      }
      show_image
      first_and_lastname {
        text
        richText
        html
      }
      reversed
    }
    primary {
      team_section {
        text
      }
    }
  }
`

export default TeamSlice
