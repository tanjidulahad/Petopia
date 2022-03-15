import React from 'react'
import Searchbar from './Searchbar'
import Slider from './slider'
import Products from './product';
function index({ products }) {
  return (
    <div className=" mx-6 ">
      <Searchbar />
      <Slider />
      <Products products={products} />
    </div>
  )
}

export default index