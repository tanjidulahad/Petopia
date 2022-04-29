import React, { useEffect, useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import moment from 'moment'

function Tracker({ details }) {
  const [orderStatus, setOrderStatus] = useState(0);
  const [isCanceled, setIsCanceled] = useState(false)

  const steps = [
    'Order is Placed',
    'Order in Progress',
    'Order Delivered Successfully',
  ];
  const stepsCancel = [
    'Order is Placed',
    'Order Canceled',
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
      else if (details?.orderStatus == "ORDER_DECLINED_BY_RESTAURANT" || details?.orderStatus == "CANCELLED_BY_CUSTOMER") {
        setIsCanceled(true)
        setOrderStatus(2)
      }
    }
  }, [details])
  console.log('order-can', details)
  const ccc = {
    root: {
      "& .MuiStepIcon-active": { color: "red" },
      "& .MuiStepIcon-completed": { color: "green" },
      "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" }
    }
  }
  return (
    <div id="tracker" className={` `}>
      <div className='mt-2'>
        {
          isCanceled ?
            <p className=' font-medium text-base'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>Order Cancelled on {moment.unix(details?.orderCancelledTime).format('lll')}</p>
            :
            orderStatus == 3 ?
              <>
                <p className=' font-medium text-base'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Delivered on {moment.unix(details?.deliveredTime).format('lll')}</p>
              </>
              :
              <div className={'w-full md:flex lg:flex btn-color-revese bg-white justify-center items-center'}>
                <Stepper activeStep={orderStatus} alternativeLabel className={ccc.root} >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel >{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

              </div>
        }
      </div>
    </div >
  )
}

export default Tracker