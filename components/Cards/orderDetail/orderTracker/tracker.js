import React, { useEffect, useState } from 'react'
import Stepper from '@components/stepper/stepper';
import moment from 'moment'
import { connect } from 'react-redux';

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

function Tracker({ details, display }) {
  const [orderStatus, setOrderStatus] = useState(0);
  const [isCanceled, setIsCanceled] = useState(false)
  const [isTrackerOpen, setIsTrackerOpen] = useState(false)
  const steps = [
    {
      lable: 'Order is Placed',
      dsc: moment.unix(details.orderPlacedTime).format('Do MMM YYYY, h:mm a')
    },
    {
      lable: 'Order Confirmed',
    },
    {
      lable: details.isDelivery == "Y" ? ' Order Shipped' : 'Ready for Pick-up',
    },
    {
      lable: 'Order Delivered Successfully',
    }

  ];
  useEffect(() => {
    if (details?.orderStatus) {
      if (details?.orderStatus == "PAYMENT_COMPLETED") {
        setOrderStatus(0)
      }
      else if (details?.orderStatus == "ORDER_CONFIRMED_BY_REST") {
        setOrderStatus(1)
      }
      else if (details?.orderStatus == "PENDING_PICKUP_BY_CUST") {
        setOrderStatus(2)
      }
      else if (details?.orderStatus == "ORDER_DELIVERED_SUCCESS") {
        setOrderStatus(3)
      }
      else if (details?.orderStatus == "ORDER_DECLINED_BY_RESTAURANT" || details?.orderStatus == "CANCELLED_BY_CUSTOMER" || details?.orderStatus == "ORDER_CANCELLED_BY_REST") {
        setIsCanceled(true)
        setOrderStatus(1)
      }
    }
  }, [details])
  const style = display ? {
    compoleted: {
      color: display?.secondary_color || '#E83B3B'
    },
    active: {
      color: '#E83B3B'
    },
    pending: {
      color: '#c5c5c5'
    },
    check: {
      color: '#fff'
    },
  } : {}
  return (
    <div id="tracker" className={` `}>
      <div className='mt-2'>
        {
          isCanceled ?
            <p className='px-4 sm:px-10 font-medium text-base'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>Order Cancelled on {moment.unix(details?.orderCancelledTime).format('lll')}</p>
            :
            orderStatus == 3 ?
              <>
                <p className=' px-4 sm:px-10 font-medium text-base'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Delivered on {moment.unix(details?.deliveredTime).format('lll')}</p>
              </>
              :
              <>
                <div className={'w-full hidden mx-auto sm:w-3/5 sm:flex flex-col justify-center items-center'}>
                  <Stepper steps={steps} activeStep={orderStatus + 1} sx={style} />
                </div>
                <div className={'w-full px-4 flex sm:hidden space-x-5 items-center'}>
                  <div className={`h-5 w-5 shrink-0 rounded-full shadow-xl z-10 scale-75`} style={{
                    // boxShadow: `0px 0px 0px 10px ${hexToRGB(display?.primary_color || '#E83B3B', 0.15)}`,
                    // backgroundColor: display?.primary_color || '#E83B3B'
                  }} >
                    <span class="flex h-5 w-5">
                      <span class={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`} style={{
                        backgroundColor: display?.secondary_color || '#3aa39f',
                        animationDuration: '1.5s'
                      }} ></span>
                      <span class={`relative inline-flex rounded-full h-5 w-5 [background-color:${display?.secondary_color || '#3aa39f'}]`} style={{
                        backgroundColor: display?.secondary_color || '#3aa39f',
                        animationDuration: '1.5s'
                      }}></span>
                    </span>
                  </div>
                  <div>
                    <h6 className='text-lg font-semibold'>{steps[orderStatus]?.lable}</h6>
                    <span className='text-sm text-gray-400 block'>Order Placed at {moment.unix(details.orderPlacedTime).subtract(3, 'days').calendar()}</span>
                    <span className='text-sm btn-color-revers block cursor-pointer' onClick={() => setIsTrackerOpen(true)}>See all updates</span>
                  </div>
                </div>
              </>

        }
      </div>
      {
        // isTrackerOpen &&
        <div className="auth block sm:hidden transition-all duration-[1000ms]" style={{
          bottom: isTrackerOpen ? 0 : '-100%',
          top: isTrackerOpen ? 0 : '300%'
        }}>
          <div className="p-6 bg-white auth-form-container rounded" style={{ height: 'fit-content' }} >
            <div className="flex justify-between items-center border-b-2 pb-2 ">
              <h2 className="text-base sm:text-2xl font-semibold">Track Order #{details.orderId}</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" onClick={() => setIsTrackerOpen(false)} stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className='py-4'>

            </div>
            <Stepper steps={steps} vertical={true} activeStep={orderStatus + 1} sx={style} />
          </div>
        </div>
      }
    </div >
  )
}

const mapStateToProps = state => ({
  display: state.store.displaySettings
})

export default connect(mapStateToProps)(Tracker)
