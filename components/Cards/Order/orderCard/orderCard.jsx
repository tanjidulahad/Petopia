import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md';
import moment from 'moment'

import { Button } from '../../../inputs'

function OrderCard({ status, message, data }) {
  return (
    <div className="w-full  border-2 rounded-lg  bg-white">
      <div className="my-4  w-full flex justify-between">

        <div className="lg:px-4 md:pl-4 w-full flex ">
          {/* <div className=" rounded h-12 w-12 shrink-0 bg-gray-900">
            <img className="w-full h-full rounded object-center opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*" />
          </div> */}
          <div className="  w-full mx-2  ">
            <p className="text-left font-bold text-sm capitalize">{data.storeName.toLowerCase()}</p>
            <p className="text-left text-sm font-medium text-gray-500 ">Order #{data.orderId}</p>
          </div>
        </div>
        <div className="mt-4  w-full flex justify-end ">
          <p className="text-left  text-sm font-medium text-gray-500 lg:mr-4  mr-2">{moment(data.orderPlacedTime).format('lll')}</p>
        </div>
      </div>

      <div className="my-4 border-t-2  border-gray-200 border-b-2  w-full flex justify-between">
        <div className='flex w-full my-6'>
          <div className="flex lg:px-4 md:pl-4  items-center w-full ">
            <div className="h-28 w-28 rounded bg-gray-900 shrink-0">
              <img className="w-full h-full rounded object-cover opacity-80" src={Object.values(data.orderItems)[0].itemImg || '/img/default.png'} />
            </div>
            <div className="  w-full  mx-4  ">
              <p className="text-left font-semibold text-lg  text-red-600">Arriving today</p>
              <p className="text-left text-base font-medium text-gray-500 mt-2">Waiting for Confirmation.!</p>
            </div>
          </div>

          <div className="mt-5 mr-4  w-full flex justify-end w-max align-center">
            <MdKeyboardArrowRight className="text-gray-500" size={30} />
          </div>

        </div>

      </div>
      {
        status === 'past' ?
          <div className=" m-4 w-full h-full flex justify-between align-center">

            <p className="text-lg font-semibold text-dark mb-2">{message}</p>

          </div>
          :
          <Button type='link' href={`/account/orderdetail/${data.orderId}`}>
            <div className=" m-4 w-full h-full flex justify-center align-center">

              <p className="text-lg font-semibold text-red-500 mb-2">Track Order</p>

            </div>
          </Button>
      }

    </div>
  )
}

export default OrderCard
