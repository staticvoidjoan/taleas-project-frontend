import React from 'react';
import ContentLoader from 'react-content-loader';

const ContLoader = ({ ...rest }) => (
    <ContentLoader viewBox=" 0 360 800" height={700} backgroundColor="#999999" foregroundColor="#ecebeb" width={400}>
    {/* Card Photo */}
    <rect x="20" y="40" rx="10" ry="10" width="350" height="500" />
  
    {/* Card Text */}
    <rect x="20" y="520" rx="4" ry="4" width="350" height="15" />
  
    {/* Card Description */}
    <rect x="20" y="550" rx="4" ry="4" width="350" height="10" />
    <rect x="20" y="570" rx="4" ry="4" width="350" height="10" />
    <rect x="20" y="590" rx="4" ry="4" width="350" height="10" />
  
    {/* Buttons */}
    <circle cx="50" cy="660" r="30" />
    <circle cx="150" cy="660" r="30" />
    <circle cx="240" cy="660" r="30" />
    <circle cx="340" cy="660" r="30" />
  </ContentLoader>
)



export default ContLoader;