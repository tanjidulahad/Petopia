import React from 'react'
import Slider from './slider'
import Products from './product';
function index({ products }) {
  return (
    <div className=" mx-6 ">
      {/* <Slider /> */}
      <Products products={products} />
    </div>
  )
}

export default index