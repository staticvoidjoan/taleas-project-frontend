import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader 
    speed={1}
    width={300}
    height={300}
    viewBox="0 0 300 300"
    backgroundColor="#cfe8f7"
    foregroundColor="#ecebeb"

  >
    <rect x="0" y="0" rx="10" ry="10" width="300" height="300" />
  </ContentLoader>
)

export default MyLoader