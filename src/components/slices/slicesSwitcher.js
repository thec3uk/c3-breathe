import React from "react"

import TeamSlice from "./team"
import TextSlice from "./text"
import BlockTitleTextSlice from './block_title_text'
import TitleEmbedCTASlice from './title_embed_cta'
import GeometricCTASlice from './geometric_cta'
import ListOfArticlesSlice from './article_list'
import BlockTitleCTATextSlice from './text_with_cta'

const Slices = ({ slices }) => {
  return slices && slices.map((contentSlice, idx) => {
    const componentListObj = {
      text: TextSlice,
      block_title_with_text: BlockTitleTextSlice,
      team: TeamSlice,
      title_with_embed_and_cta: TitleEmbedCTASlice,
      geometric_cta: GeometricCTASlice,
      list_of_articles: ListOfArticlesSlice,
      block_title_with_text_and_cta: BlockTitleCTATextSlice,
    }
    const Component = componentListObj[contentSlice.type]
    if (Component === undefined) {
      console.warn("Warning: default case, content is unhandled")
      return <div></div>
    }
    return (<div className="py-24"><Component key={idx} data={contentSlice} /></div>)
  })
}

export default Slices
