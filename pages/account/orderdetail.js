import React from 'react'
import Ordertracker from '../../components/Cards/orderDetail/orderTracker'
import List from '../../components/Cards/orderDetail/orderList'
import Address from '../../components/Cards/orderDetail/address'
function orderDetail() {
  return (
    <section className="bg-gray-100 w-full ">
    <div className='wrapper mx-auto'>
      <div className="grid grid-cols-11 ">
        <div className="col-span-8  my-10 ">
    <Ordertracker/>
    <List/>
    <Address/>

        </div>
        <div className="  lg:col-span-2 md:col-span-4 my-10 mx-8 ">
          


        </div>

      </div>
    </div>

  </section>
  )
}

export default orderDetail
