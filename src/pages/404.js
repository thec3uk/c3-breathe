import React from "react"

import SEO from "../components/seo"
import Link from "../components/link"
import "../components/layout.css"


const navCssClasses = (defaultColour, activeColour, activePage) => {
  const activePageClasses = `text-${activeColour} hover:text-${defaultColour} border border-transparent hover:border-${activeColour}`
  const defaultPageClasses = `text-${defaultColour} hover:text-${activeColour} border border-transparent hover:border-${defaultColour}`
  return activePage ? activePageClasses : defaultPageClasses
}


const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center w-screen h-screen bg-breathe-blue-1">
        <SEO title="404: Not found" />
        <nav
          className="py-6 px-8 fixed top-0 animated flex flex-row justify-start min-w-full z-100 items-center"
        >
          <div
            className="uppercase text-lg font-sans text-white"
          >
            <Link to="/">Breathe</Link>
          </div>
        </nav>
        <div className="p-8 m-8 bg-salmon-2">
          <h1 className="font-serifAlt text-black">Page not found</h1>
          <p>Looks like you hit a page that doesn't exist. Return to our <Link className="text-white hover:text-black underline" to="/">homepage</Link> to see if you can then find what you were looking for.</p>
        </div>
    </div>
  )
}

export default NotFoundPage
