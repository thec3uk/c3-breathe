import React from "react"

import Seo from "../components/seo"
import Link from "../components/link"
import "../components/layout.css"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center w-screen h-screen bg-breathe-blue-1">
      <Seo title="404: Not found" />
      <nav className="fixed top-0 flex flex-row items-center justify-start min-w-full px-8 py-6 animated z-100">
        <div className="font-sans text-lg text-white uppercase">
          <Link to="/">Breathe</Link>
        </div>
      </nav>
      <div className="p-8 m-8 bg-salmon-2">
        <h1 className="text-black font-serifAlt">Page not found</h1>
        <p>
          Looks like you hit a page that doesn't exist. Return to our{" "}
          <Link className="text-white underline hover:text-black" to="/">
            homepage
          </Link>{" "}
          to see if you can then find what you were looking for.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
