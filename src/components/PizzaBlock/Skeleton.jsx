import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = (props) => (
  <ContentLoader 
  className="pizza-block"
  speed={2}
  width={280}
  height={480}
  viewBox="0 0 280 480"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
>
  <rect x="0" y="290" rx="10" ry="10" width="260" height="30" /> 
  <rect x="0" y="340" rx="10" ry="10" width="260" height="60" /> 
  <rect x="0" y="420" rx="10" ry="10" width="75" height="40" /> 
  <rect x="128" y="420" rx="30" ry="30" width="130" height="40" /> 
  <circle cx="130" cy="130" r="130" />
</ContentLoader>
)