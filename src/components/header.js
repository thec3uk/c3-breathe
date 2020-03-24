import { graphql, StaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import { withPreview } from 'gatsby-source-prismic-graphql';
import BackgroundImage from 'gatsby-background-image'
import {CSSTransition} from 'react-transition-group'
import Link from "./link"


import { Link as LinkFragment } from '../utils/fragments'

const navCssClasses = (defaultColour, activeColour, activePage) => {
  const activePageClasses = `text-${activeColour} hover:text-${defaultColour} border border-transparent hover:border-${activeColour}`
  const defaultPageClasses = `text-${defaultColour} hover:text-${activeColour} border border-transparent hover:border-${defaultColour}`
  return activePage ? activePageClasses : defaultPageClasses
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTopScroll, setCurrentTopScroll] = useState(0)
  const scrollTop = 200
  useEffect(() => {
    const onScroll = e => {
      if (!menuOpen) {
        setScrolling(e.target.documentElement.scrollTop > scrollTop)
      }
    }
    window.addEventListener("scroll", onScroll)
    setCurrentTopScroll(window.document.scrollingElement.scrollTop)
    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollTop, menuOpen])
  const onMenuOpenClose = e => {
    setMenuOpen(!menuOpen)
    if (scrolling && !menuOpen) {
      setScrolling(false)
    } else if (menuOpen && currentTopScroll > scrollTop) {
      setScrolling(true)
    }
  }
  return (
    <StaticQuery
      query={`${staticQuery}`}
      render={withPreview(data => (
         <BackgroundImage
          preserveStackingContext={true}
          Tag="header"
          className="min-h-screen flex flex-col text-black bg-top bg-cover"
          fluid={image}
          backgroundColor={bgColour}
        >
          <nav
            className={`py-6 px-8 lg:px-40 fixed top-0 animated flex justify-between min-w-full z-100 items-center ${
              scrolling ? "bg-breathe-blue-1 shadow" : ""
            }`}
          >
            <div
              className="uppercase text-lg font-sans"
              style={{ color: headerFontColour }}
            >
              <Link to="/">{siteTitle}</Link>
            </div>
            <ul className="md:inline-flex hidden">
              {data.prismic.allNavBar.edges.map(({ node }) => (
                <li
                  key={node._meta.uid}
                  className={
                    "mx-2 p-2 uppercase " +
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
            <div className="-mr-2 flex items-center md:hidden">
              <button type="button" className="inline-flex items-center justify-center p-1 text-white hover:text-breathe-blue-1 hover:bg-white focus:outline-none focus:bg-white focus:text-breathe-blue-1 transition duration-150 ease-in-out" onClick={onMenuOpenClose}>
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <CSSTransition in={menuOpen} timeout={300} classNames="mobilenav" unmountOnExit>

              <div className="absolute top-0 inset-x-0 p-2 md:hidden">
                <div className="shadow-md transition transform origin-top-right">
                  <div className="bg-breathe-blue-1 shadow-xs overflow-hidden">
                    <div className="px-6 pt-4 flex items-center justify-between">
                      <div>
                        <div
                          className="uppercase text-lg font-sans"
                          style={{ color: headerFontColour }}
                        >
                          <Link to="/">{siteTitle}</Link>
                        </div>
                      </div>
                      <div className="-mr-2">
                        <button type="button" className="inline-flex items-center justify-center p-1 text-white hover:text-breathe-blue-1 hover:bg-white focus:outline-none focus:bg-white focus:text-breathe-blue-1 transition duration-150 ease-in-out" onClick={onMenuOpenClose}>
                          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3 block">
                      {data.prismic.allNavBar.edges.map(({ node }) => (
                        <div
                          key={node._meta.uid}
                          className={
                            "mx-2 my-2 p-2 uppercase " +
                            navCssClasses(
                              "white",
                              "black",
                              currentUid === node._meta.uid
                            )
                          }
                        >
                          <Link to={node}>{node.page_title}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>

          </nav>
          <div
            className="flex-grow flex flex-col text-center justify-center h-auto"
            style={{ color: headerFontColour }}
          >
            <h1 className="font-serifAlt text-5xl lg:text-6xl">{pageTitle}</h1>
            <h2 className="font-accent text-5xl lg:text-6xl">{pageSubtitle}</h2>
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
      ), staticQuery, [LinkFragment])}
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
