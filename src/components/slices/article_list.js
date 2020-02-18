import React from "react"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"

const ListOfArticlesSlice = ({ data }) => {
  console.log(data)
  return (
    <section
      className="px-40 py-20 flex flex-col -mx-24"
      style={{ backgroundColor: data.primary.background_colour.colour }}
    >
      <h2 className="text-right font-serif uppercase text-6xl mb-12 text-black">
        {RichText.asText(data.primary.title_of_section)}
      </h2>
      <div className="flex flex-row justify-between">
        {data.fields.map(({ articles_to_link, title }, idx) => {
          return (
            <div key={idx} className="border-2 border-black w-3/12 text-center border-black bg-cover h-88 bg-center flex flex-col justify-end shadow-lg" style={{
              backgroundImage: `url(/images/20180917-231A0496.jpg)`
            }}>
              <div className="py-4 bg-black" style={{
                filter: `opacity(50%)`,
                backdropFilter: `blur(4px)`
              }}>
              <Link>
                <h4 className="uppercase font-serif text-white" >{title}</h4>
              </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export const query = graphql`
  fragment articleList on PRISMIC_PageBodyList_of_articles {
    type
    fields {
      title
      articles_to_link {
        ...link
      }
    }
    primary {
      title_of_section
      background_colour {
        ...colour
      }
    }
  }
`

export default ListOfArticlesSlice
