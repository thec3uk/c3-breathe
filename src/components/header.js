import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import BackgroundImage from "gatsby-background-image"
import { CSSTransition } from "react-transition-group"
import Link from "./link"

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
      allNavBar: allPrismicPage(
        filter: { tags: { eq: "navbar" } }
        sort: { data: { page_title: ASC } }
      ) {
        edges {
          node {
            url
            uid
            type
            data {
              page_title
            }
          }
        }
      }
    }
  `
  const data = useStaticQuery(staticQuery)
  const [scrolling, setScrolling] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTopScroll, setCurrentTopScroll] = useState(0)
  const scrollTop = 200
  useEffect(() => {
    const onScroll = (e) => {
      if (!menuOpen) {
        setScrolling(e.target.documentElement.scrollTop > scrollTop)
      }
    }
    window.addEventListener("scroll", onScroll)
    setCurrentTopScroll(window.document.scrollingElement.scrollTop)
    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollTop, menuOpen])
  const onMenuOpenClose = (e) => {
    setMenuOpen(!menuOpen)
    if (scrolling && !menuOpen) {
      setScrolling(false)
    } else if (menuOpen && currentTopScroll > scrollTop) {
      setScrolling(true)
    }
  }
  return (
    <BackgroundImage
      preserveStackingContext={true}
      Tag="header"
      className="flex flex-col min-h-screen text-black bg-top bg-cover"
      fluid={image}
      backgroundColor={bgColour}
    >
      <nav
        className={`py-6 px-8 lg:px-40 fixed top-0 animated flex justify-between min-w-full z-100 items-center ${
          scrolling ? "bg-breathe-blue-1 shadow" : ""
        }`}
      >
        <div
          className="font-sans text-lg uppercase"
          style={{ color: headerFontColour }}
        >
          <Link to="/">{siteTitle}</Link>
        </div>
        <ul className="hidden md:inline-flex">
          {data.allNavBar.edges.map(({ node }) => (
            <li
              key={node.uid}
              className={
                "mx-2 p-2 uppercase " +
                navCssClasses("white", "black", currentUid === node.uid)
              }
            >
              <Link to={node}>{node.data.page_title}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center -mr-2 md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-1 text-white transition duration-150 ease-in-out hover:text-breathe-blue-1 hover:bg-white focus:outline-none focus:bg-white focus:text-breathe-blue-1"
            onClick={onMenuOpenClose}
          >
            <svg
              className="w-6 h-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <CSSTransition
          in={menuOpen}
          timeout={300}
          classNames="mobilenav"
          unmountOnExit
        >
          <div className="absolute inset-x-0 top-0 p-2 md:hidden">
            <div className="transition origin-top-right transform shadow-md">
              <div className="overflow-hidden shadow-xs bg-breathe-blue-1">
                <div className="flex items-center justify-between px-6 pt-4">
                  <div>
                    <div
                      className="font-sans text-lg uppercase"
                      style={{ color: headerFontColour }}
                    >
                      <Link to="/">{siteTitle}</Link>
                    </div>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-1 text-white transition duration-150 ease-in-out hover:text-breathe-blue-1 hover:bg-white focus:outline-none focus:bg-white focus:text-breathe-blue-1"
                      onClick={onMenuOpenClose}
                    >
                      <svg
                        className="w-6 h-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="block px-2 pt-2 pb-3">
                  {data.allNavBar.edges.map(({ node }) => (
                    <div
                      key={node.uid}
                      className={
                        "mx-2 my-2 p-2 uppercase " +
                        navCssClasses("white", "black", currentUid === node.uid)
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
        className="flex flex-col justify-center flex-grow h-screen text-center"
        style={{ color: headerFontColour }}
      >
        <h1 className="text-5xl font-serifAlt lg:text-6xl">{pageTitle}</h1>
        <h2 className="text-5xl font-accent lg:text-6xl">{pageSubtitle}</h2>
        {headerCtaUrl && headerCtaTitle && (
          <div className="mt-8">
            <Link
              to={headerCtaUrl}
              className="px-6 py-3 uppercase border border-white hover:border-black hover:text-black"
            >
              {headerCtaTitle}
            </Link>
          </div>
        )}
      </div>
    </BackgroundImage>
  )
}

export default Header

export const query = graphql`
  fragment header on PrismicPageDataType {
    header_cta
    header_cta_link {
      ...link
    }
    header_sub_title
    header_title
    header_image {
      fluid(maxWidth: 1920) {
        ...GatsbyPrismicImageFluid
      }
    }
    header_font_colour {
      ...colour
    }
  }
`
