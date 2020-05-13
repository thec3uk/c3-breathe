/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require("react")

export const onRenderBody = (
  { pathname, setHeadComponents, setPostBodyComponents },
  pluginOptions
) => {
  setHeadComponents([
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>,
  ])
  setPostBodyComponents([
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `window._chatlio = window._chatlio||[];
            !function(){ var t=document.getElementById(\"chatlio-widget-embed\");if(t&&window.ChatlioReact&&_chatlio.init)return void _chatlio.init(t,ChatlioReact);for(var e=function(t){return function(){_chatlio.push([t].concat(arguments)) }},i=["configure","identify","track","show","hide","isShown","isOnline", "page", "open", "showOrHide"],a=0;a<i.length;a++)_chatlio[i[a]]||(_chatlio[i[a]]=e(i[a]));var n=document.createElement("script"),c=document.getElementsByTagName("script")[0];n.id="chatlio-widget-embed",n.src="https://w.chatlio.com/w.chatlio-widget.js",n.async=!0,n.setAttribute("data-embed-version","2.3");
               n.setAttribute('data-widget-id','4264b4c8-c57d-4ac6-7c68-b7baed5dd091');
               c.parentNode.insertBefore(n,c);
            }();`,
        }}
      ></script>,
    ])
}
