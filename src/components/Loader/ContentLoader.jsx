import React from 'react'
import ContentLoader from "react-content-loader"

const ContLoader = ({...rest}) => {
  return (
      <ContentLoader
        width={1000}
        height={500}
        viewBox="0 0 1000 500"
        backgroundColor="#999999"
        foregroundColor="#ecebeb"
        speed={5}
        {...rest}
        style={{ animation: "showLoader 4s infinite" }}
      >

        <rect x="20" y="20" rx="10" ry="10" width="350" height="539" />

        </ContentLoader>
  )
}

export default ContLoader