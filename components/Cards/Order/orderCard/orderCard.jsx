import { useState, useEffect } from 'react';
import moment from 'moment';
import { Button } from '../../../inputs'
import { MdKeyboardArrowRight } from 'react-icons/md';
function OrderCard({ status, message, data }) {
  const [orderStatus, setOrderStatus] = useState('Order is Placed');
  useEffect(() => {
    if (data?.orderStatus) {
      if (data?.orderStatus == "PAYMENT_COMPLETED") {
        setOrderStatus("Order is Placed")
      }
      else if (data?.orderStatus == "ORDER_CONFIRMED_BY_REST") {
        setOrderStatus('Order in Progress')
      }
      else if (data?.orderStatus == "PENDING_PICKUP_BY_CUST") {
        setOrderStatus('Order in Progress')
      }
      else if (data?.orderStatus == "ORDER_DELIVERED_SUCCESS") {
        setOrderStatus('Order Delivered Successfully')
      }
      else if (data?.orderStatus == "ORDER_DECLINED_BY_RESTAURANT" || data?.orderStatus == "CANCELLED_BY_CUSTOMER") {
        setOrderStatus('Order Canceled')
      }
    }
  }, [data])
  return (
    <div className="w-full  border-2 md:rounded-lg lg:rounded-lg  bg-white">
      <div className="my-4 mx-2 md:mx-0 lg:mx-0 w-full flex justify-between">

        <div className="lg:px-4 md:pl-4 w-full flex items-center ">
          {/* <div className="w-1/4  rounded bg-gray-900">
            <img className="w-full h-full rounded object-center opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*" />
          </div> */}
          <div className=" w-max md:w-full lg:w-full ml-2 md:mx-2  lg:mx-2  ">
            <p className="text-left font-bold text-sm w-max capitalize">{data.storeName.toLowerCase()}</p>
            <p className="text-left text-sm font-medium text-gray-500 ">Order #{data.orderId}</p>
          </div>
        </div>
        <div className="mt-6 md:mt-4 lg:mt-4  w-full relative -left-4 md:-left-0 lg:-left-0 flex justify-end ">
          <p className="text-left  text-sm font-medium text-gray-500  lg:mr-4  mr-2">{moment.unix(data.orderPlacedTime).format('lll')}</p>
        </div>
      </div>
      <div className="my-4 mx-2 md:mx-0 lg:mx-0 border-t-2  border-gray-200 border-b-2  w-full flex justify-between">
        <div className='flex w-full my-6'>
          <div className=" lg:px-4 md:pl-4  w-full flex items-center space-x-4">
            <div className="w-28 h-28 rounded bg-gray-900 shrink-0">
              <img className="w-full h-full rounded object-cover opacity-80" src={(() => {
                const obj = Object.values(data.orderItems).find(item => item.itemImg);
                if (obj) {
                  return obj.itemImg
                }
                return `/img/default.webp`
              })()}
              />
            </div>
            <div className="  w-full  ">
              <p className="text-left font-semibold text-lg  btn-color-revers">{orderStatus}</p>
              {/* <p className="text-left text-base font-medium text-gray-500 mt-2">Waiting for Confirmation.!</p> */}
            </div>
          </div>
          <div className="mt-5 mr-4  w-full flex justify-end w-max align-center">
            <MdKeyboardArrowRight className="text-gray-500" size={30} />
          </div>
        </div>
      </div>
      {
        status === 'past' ?
          <Button type='link' href={`/account/orderdetail/${data.orderId}`}>
            <div className=" m-4 w-full h-full flex justify-between align-center">
              <p className="text-lg font-semibold text-dark mb-2 btn-color-revers">{(data?.orderStatus == "ORDER_DECLINED_BY_RESTAURANT" || data?.orderStatus == "CANCELLED_BY_CUSTOMER") ?
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='btn-color-revers'>
                    Order Cancelled
                  </span>
                </>
                :
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className='btn-color-revers'>
                    Delivery Success
                  </span>
                </>
              }</p>
            </div>
          </Button>
          :
          <Button type='link' href={`/account/orderdetail/${data.orderId}`}>
            <div className=" m-4 w-full h-full flex justify-center align-center">
              <p className="text-lg font-semibold btn-color-revers mb-2">Track Order</p>
            </div>
          </Button>
      }

    </div>
  )
}

export default OrderCard
