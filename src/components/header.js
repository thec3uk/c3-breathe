import { graphql, useStaticQuery, Link } from "gatsby"
import React, { useEffect, useState } from "react"

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
}) => {
  const data = useStaticQuery(graphql`
    query NavBar {
      prismic {
        allNavBar: allPages(tags: "navbar", sortBy: page_title_ASC) {
          ... on PRISMIC_PageConnectionConnection {
            edges {
              node {
                page_title
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    }
  `)
  const [scrolling, setScrolling] = useState(false);
  const scrollTop = 200;
  useEffect(() => {
    const onScroll = e => {
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  return (
    <header
      className="min-h-screen flex flex-col text-black"
      style={{
        background: `url(${image.url})`,
      }}
    >

      <nav className={`py-6 px-40 fixed top-0 animated flex justify-between min-w-full z-100 ${scrolling ? "bg-breathe-blue-1 shadow": ""}`}>
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
                navCssClasses("white", "black", currentUid === node._meta.uid)
              }
            >
              <Link to={`/${node._meta.uid}`}>{node.page_title}</Link>
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
      </div>
    </header>
  )
}

export default Header

export const query = graphql`
  fragment header on PRISMIC_Page {
    header_cta
    header_sub_title
    header_title
    header_image
    header_font_colour {
      ...colour
    }
  }
`
