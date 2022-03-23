import React from 'react'
import Slider from './slider'
import Products from './product';
function index({ products, ...props }) {
  return (
    <div className=" mx-6 ">
      {/* <Slider /> */}
      <Products products={products} {...props} />
    </div>
  )
}

export default index