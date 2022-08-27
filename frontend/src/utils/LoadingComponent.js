import React from 'react'
import {css} from '@emotion/react'
import RiseLoader from 'react-spinners/CircleLoader'

//css
const override= {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  

const LoadingComponent = () => {
  return (
    <RiseLoader color='red' loading={true}  cssOverride={override}  />

    
  )
}

export default LoadingComponent