export const linkResolver = doc => {
  const toTypeString = typeof doc === "string"
  var to = undefined
  if (!toTypeString) {
    const linkTypes = {
      "Link.document": doc => `/${doc._meta.uid}`,
      "Link.web": doc => doc.url,
      // File and Image to be added when we get to them
    }
    to = linkTypes[doc._linkType]
    if (to === undefined) {
      console.error("Error: unable to parse the Link")
      return "/"
    }
    return to(doc)
  }
  return doc
}
