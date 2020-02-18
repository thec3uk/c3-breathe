import React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"

const TeamSlice = ({ data }) => {
  return (
    <section className="px-16 text-black">
      <h2 className="text-6xl font-serifAlt">
        {RichText.asText(data.primary.team_section)}
      </h2>
      {data.fields.map((person, idx) => {
        return (
          <div key={idx} className="flex flex-row mt-12">
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
              <img
                className="rounded-full max-w-xxs"
                src={person.portrait.url}
                alt=""
              />
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
      })}
    </section>
  )
}

export const query = graphql`
  fragment teamSlice on PRISMIC_PageBodyTeam {
    type
    fields {
      position
      portrait
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
