const React = require("react")

require("./src/components/layout.css")

const {
  PrismicPreviewProvider,
  componentResolverFromMap,
} = require("gatsby-plugin-prismic-previews")
const PrismicProvider = require("@prismicio/react").PrismicProvider

const GatsbyLink = require("gatsby").Link

const linkResolver = require("./src/utils/linkResolver").linkResolver
const PageTemplate = require("./src/templates/page")

/**
 * An adapter to support Gatsby's `<Link>` component when using `<PrismicLink>`.
 */
const GatsbyLinkShim = React.forwardRef(({ href, ...props }, ref) => {
  return <GatsbyLink to={href} ref={ref} {...props} />
})
GatsbyLinkShim.displayName = "GatsbyLinkShim"

exports.wrapRootElement = ({ element }) => (
  <PrismicProvider
    linkResolver={linkResolver}
    internalLinkComponent={GatsbyLinkShim}
  >
    <PrismicPreviewProvider
      repositoryConfigs={[
        {
          repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
          linkResolver,
          componentResolver: componentResolverFromMap({
            page: PageTemplate,
          }),
        },
      ]}
    >
      {element}
    </PrismicPreviewProvider>
  </PrismicProvider>
)

// export const onInitialClientRender = () => {
//   $(document).ready(function() {
//     console.log("jQuery is loaded all ok")
//   })
// }
