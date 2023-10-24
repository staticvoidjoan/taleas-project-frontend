import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader 
    speed={1}
    width={400}
    height={400}
    viewBox="0 0 400 400"
    backgroundColor="#cfe8f7"
    foregroundColor="#ecebeb"

  >
    <rect x="0" y="0" rx="10" ry="10" width="400" height="400" />
  </ContentLoader>
)

export default MyLoader