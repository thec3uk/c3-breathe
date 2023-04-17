exports.linkResolver = (doc) => {
  const toTypeString = typeof doc === "string"
  var to = undefined
  if (!toTypeString) {
    const linkTypes = {
      Document: (doc) => `/${doc.uid}`,
      Web: (doc) => doc.url,
      // File and Image to be added when we get to them
      page: (doc) => `/${doc.uid}`,
    }
    const key = doc.link_type !== undefined ? doc.link_type : doc.type
    to = linkTypes[key]
    if (to === undefined) {
      console.error("Error: unable to parse the Link", doc)
      return "/not-found"
    }
    return to(doc)
  }
  return doc
}
