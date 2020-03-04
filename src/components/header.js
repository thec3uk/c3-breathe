import { graphql, StaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import { withPreview } from 'gatsby-source-prismic-graphql';
import BackgroundImage from 'gatsby-background-image'
import Link from "./link"


import { Link as LinkFragment } from '../utils/fragments'

const navCssClasses = (defaultColour, activeColour, activePage) => {
  if (activePage) {
    return `text-${activeColour} hover:text-${defaultColour}`
  }
  return `text-${defaultColour} hover:text-${activeColour}`
}

const Header = ({
  siteTitle,
  image,
  pageTitle,
  pageSubtitle,
  headerFontColour,
  currentUid,
  headerCtaTitle,
  headerCtaUrl,
  bgColour,
}) => {
  const staticQuery = graphql`
    query NavBar {
      prismic {
        allNavBar: allPages(tags: "navbar", sortBy: page_title_ASC) {
          ... on PRISMIC_PageConnectionConnection {
            edges {
              node {
                page_title
                ...link
              }
            }
          }
        }
      }
    }
  `
  // const data = useStaticQuery(staticQuery)
  const [scrolling, setScrolling] = useState(false)
  const scrollTop = 200
  useEffect(() => {
    const onScroll = e => {
      setScrolling(e.target.documentElement.scrollTop > scrollTop)
    }
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollTop])
  // const headerImage = image === null ? `/images/2020-bg.png` : image.url
  return (
    <StaticQuery
      query={`${staticQuery}`}
      render={withPreview(data => (
         <BackgroundImage
          Tag="header"
          className="min-h-screen flex flex-col text-black bg-top bg-cover"
          fluid={image}
          backgroundColor={bgColour}
        >
          <nav
            className={`py-6 px-40 fixed top-0 animated flex justify-between min-w-full z-100 ${
              scrolling ? "bg-breathe-blue-1 shadow" : ""
            }`}
          >
            <div
              className="uppercase text-lg font-sans"
              style={{ color: headerFontColour }}
            >
              <Link to="/">{siteTitle}</Link>
            </div>
            <ul className="inline-flex">
              {data.prismic.allNavBar.edges.map(({ node }) => (
                <li
                  key={node._meta.uid}
                  className={
                    "mx-4 uppercase " +
                    navCssClasses(
                      "white",
                      "black",
                      currentUid === node._meta.uid
                    )
                  }
                >
                  <Link to={node}>{node.page_title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className="flex-grow flex flex-col text-center justify-center h-auto"
            style={{ color: headerFontColour }}
          >
            <h1 className="font-serifAlt text-6xl">{pageTitle}</h1>
            <h2 className="font-accent text-6xl">{pageSubtitle}</h2>
            {headerCtaUrl && (
              <div className="mt-8">
                <Link
                  to={headerCtaUrl}
                  className="border uppercase py-3 px-6 hover:border-black hover:text-black"
                >
                  {headerCtaTitle}
                </Link>
              </div>
            )}
          </div>
        </BackgroundImage>
      ), query, [LinkFragment])}
    />
  )
}

export default Header

export const query = graphql`
  fragment header on PRISMIC_Page {
    header_cta
    header_cta_link {
      ...link
    }
    header_sub_title
    header_title
    header_image
    header_imageSharp {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    header_font_colour {
      ...colour
    }
  }
`
