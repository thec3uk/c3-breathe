// import React, { useState, useEffect } from "react"
// import { graphql, useStaticQuery } from "gatsby"
// import Link from "../link"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faHeart } from "@fortawesome/free-solid-svg-icons"

// const InstaPhoto = ({ photo }) => {
//   const [hover, setHover] = useState(false)
//   const [thumb, setThumb] = useState(photo.localFile.url)
//   useEffect(() => {
//     // 0,640 ,768 ,1024,1280
//     const thumbSizes = {
//       0: 150,
//       // 640:240,
//       768: 320,
//       1024: 320,
//     }
//     var thumbSize = Math.max(
//       ...Object.keys(thumbSizes).filter(
//         (item) => item <= window.screen.availWidth
//       )
//     )
//     console.log(thumbSize)
//     setThumb(photo.localFile.url)
//   }, [thumb, photo.localFile.url])
//   const seed = Math.round(Math.random() * 40)
//   const colour = [
//     "breathe-blue-1",
//     "breathe-blue-2",
//     "salmon-1",
//     "salmon-3",
//     "grey-1",
//   ]
//   const pad = ["8px", "0", "0px"]
//   const border = ["border-0", "border-8", "border-4"]
//   return (
//     <div
//       className="flex-none p-0"
//       onMouseEnter={(e) => setHover(true)}
//       onMouseLeave={(e) => setHover(false)}
//       role="presentation"
//     >
//       <img
//         src={thumb.src}
//         className={`${border[seed % 3]} border-${
//           colour[seed % 5]
//         } object-cover`}
//         style={{
//           padding: pad[seed % 3],
//           height: thumb.width,
//           width: thumb.width,
//         }}
//         alt=""
//       />
//       {hover && (
//         <Link target="_blank" to={`https://www.instagram.com/p/${photo.id}/`}>
//           <div
//             className="relative z-20 flex flex-col justify-center object-cover p-8 text-center text-white bg-black-trans"
//             style={{
//               marginTop: -thumb.width,
//               height: thumb.width,
//               width: thumb.width,
//             }}
//           >
//             <div className="flex flex-row items-center justify-center">
//               <FontAwesomeIcon
//                 icon={faHeart}
//                 fixedWidth
//                 size="sm"
//                 className="inline-block h-8"
//               />
//               <div className="inline-block pl-4 text-sm">{photo.likes}</div>
//             </div>
//             <p className="text-xs">
//               {photo.caption
//                 ? photo.caption.length > 200
//                   ? `${photo.caption.slice(0, 180)}...`
//                   : photo.caption
//                 : ""}
//             </p>
//           </div>
//         </Link>
//       )}
//     </div>
//   )
// }

// // different padding, 5, 10
// // diffent colours w, b1 b2, s1, s3

// const InstaFeedSlice = ({ data }) => {
//   const staticQuery = graphql`
//     query Insta {
//       first: allInstaNode(sort: { timestamp: DESC }, limit: 5) {
//         ...Photos
//       }
//       second: allInstaNode(sort: { timestamp: DESC }, limit: 5, skip: 4) {
//         ...Photos
//       }
//       third: allInstaNode(sort: { timestamp: DESC }, limit: 5, skip: 7) {
//         ...Photos
//       }
//     }

//     fragment Photos on InstaNodeConnection {
//       nodes {
//         caption
//         likes
//         id
//         localFile {
//           url
//           childImageSharp {
//             fixed {
//               ...GatsbyImageSharpFixed
//             }
//           }
//         }
//         timestamp
//       }
//     }
//   `
//   const staticData = useStaticQuery(staticQuery)
//   console.log(staticData)
//   console.log(data)
//   return (
//     <section className="pt-20 -mb-16 overflow-x-hidden sm:-mx-24 sm:-mb-24">
//       <div className="flex flex-row lg:flex-col">
//         <div className="flex flex-col -ml-8 sm:-ml-24 md:ml-auto lg:-mr-40 xxl:mr-0 lg:flex-row flex-nowrap">
//           {data.first.nodes.map((photo, idx) => (
//             <InstaPhoto key={idx} photo={photo} />
//           ))}
//         </div>
//         <div className="flex flex-col lg:-ml-24 lg:-mr-24 xxl:mx-auto lg:flex-row">
//           {data.second.nodes.map((photo, idx) => (
//             <InstaPhoto key={idx} photo={photo} />
//           ))}
//         </div>
//         <div className="flex flex-col -mr-16 sm:-mr-24 md:mr-auto lg:-ml-40 xxl:ml-0 lg:flex-row">
//           {data.third.nodes.map((photo, idx) => (
//             <InstaPhoto key={idx} photo={photo} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export const query = graphql`
//   fragment InstaFeedSlice on PrismicPageDataBodyLatestInstagramPhotos {
//     slice_type
//   }
// `

// export default InstaFeedSlice
