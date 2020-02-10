import React from "react"

// staticcomponent with SiteConfig component

const Footer = ({siteTitle}) => {
    return (
        <footer className="py-8 px-16 font-serif">
            Copyright © {siteTitle} {new Date().getFullYear()}
        </footer>
    )
}

export default Footer;
