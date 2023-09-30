import React from 'react'
import ContentLoader from "react-content-loader"

const ProfileLoader = ({...rest}) => {
  return (
    <ContentLoader
    width={1000}
    height={500}
    viewBox="0 0 1000 500"
    backgroundColor="#999999"
    foregroundColor="#ecebeb"
    speed={5}
    {...rest}
    style={{ animation: "showLoader 3s infinite" }}
    >

      <rect x="20" y="10" rx="10" ry="10" width="250" height="20" />
    </ContentLoader>
  )
}

export default  ProfileLoader 
