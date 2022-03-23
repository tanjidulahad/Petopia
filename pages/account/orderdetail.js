import React from 'react'
import Ordertracker from '../../components/Cards/orderDetail/orderTracker/tracker'
import List from '../../components/Cards/orderDetail/orderList/orderlList'
import Address from '../../components/Cards/orderDetail/address/adress.jsx'
import Header from '../../components/MobHeader/index'

function orderDetail() {
  return (
    <section className="bg-gray-100 w-full ">
    <div className='wrapper mx-auto'>
    <Header display={true} topic="Order #1208" />
      <div className="grid grid-cols-11 mt-4 md:mt-0 lg:mt-0 ">
        <div className="col-span-11 md:col-span-8  md:my-10 lg:col-span-8  lg:my-10 ">
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
