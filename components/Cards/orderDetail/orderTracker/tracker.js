import React, { useEffect, useState } from 'react'

import StepProgressBar from 'react-step-progress'
// import the stylesheet
import 'react-step-progress/dist/index.css'
import { TiTick } from 'react-icons/ti'
import { BsDot } from 'react-icons/bs'
import  {HiOutlineDotsVertical} from 'react-icons/hi'
import { CgBorderStyleDotted } from 'react-icons/cg'
import moment from 'moment'


export default function Tracker({details}) {
  console.log(details,'line12....123124')
  const [active, setactive] = useState({
    step1: 'active',
    step2:  details.orderStatus==="" ||details.orderStatus=== "CANCELLED_BY_CUSTOMER"?'pending':'active',
    step3: details.orderStatus!==""?details.isDelivery==="N"?'pending':'active':"inactive",
    mobupdate:true
  })

  return (
    <>
      <div id="tracker" className=" hidden md:flex lg:flex bg-white  justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center">
          <div
            className="w-10 h-10  ml-4 rounded-full flex justify-center items-center  "
            style={{
              backgroundColor:
                active.step1 === 'active'
                  ? '#D85A5A'
                  : active.step1 === 'pending'
                  ? 'rgb(239 207 207)'
                  : '#2424243F',
            }}
          >
            {active.step1 === 'active' ? (
              <TiTick color={'white'} size={20} />
            ) : (
              active.step1 === 'pending' && (
                <BsDot size={40} color={'#D85A5A'} />
              )
            )}
          </div>
        </div>

        <CgBorderStyleDotted
          size={40}
          color={active.step1 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        <CgBorderStyleDotted
          size={40}
          color={active.step1 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        <CgBorderStyleDotted
          size={40}
          color={active.step1 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        <CgBorderStyleDotted
          size={40}
          color={active.step1 === 'active' ? '#D85A5A' : '#2424243F'}
        />

        <div className="flex flex-col  justify-center items-center text-center">
          <div
            className="w-10 h-10 bg-red-600  rounded-full flex justify-center items-center "
            style={{
              backgroundColor:
                active.step2 === 'active'
                  ? '#D85A5A'
                  : active.step2 === 'pending'
                  ? 'rgb(239 207 207)'
                  : '#2424243F',
            }}
          >
            {active.step2 === 'active' ? (
              <TiTick color={'white'} size={20} />
            ) : (
              active.step2 === 'pending' && (
                <BsDot size={40} color={'#D85A5A'} />
              )
            )}
          </div>
        </div>

        <CgBorderStyleDotted
          size={40}
          color={active.step2 === 'active' ? '#D85A5A' : '#2424243F'}
        />

        <CgBorderStyleDotted
          size={40}
          color={active.step2 === 'active' ? '#D85A5A' : '#2424243F'}
        />

        <CgBorderStyleDotted
          size={40}
          color={active.step2 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        <CgBorderStyleDotted
          size={40}
          color={active.step2 === 'active' ? '#D85A5A' : '#2424243F'}
        />

        <div className="flex flex-col justify-center items-center text-center">
          <div
            className="w-10 h-10 bg-red-600 text-white rounded-full flex justify-center items-center "
            style={{
              backgroundColor:
                active.step3 === 'active'
                  ? '#D85A5A'
                  : active.step3 === 'pending'
                  ? 'rgb(239 207 207)'
                  : '#2424243F',
            }}
          >
            {active.step3 === 'active' ? (
              <TiTick color={'white'} size={20} />
            ) : (
              active.step3 === 'pending' && (
                <BsDot size={40} color={'#D85A5A'} />
              )
            )}
          </div>
        </div>


      </div>
      <div className=" hidden md:flex lg:flex bg-white  justify-center items-center">
        <div className="flex relative right-2 flex-col justify-center items-center text-center">
          <p className="flex text-sm   my-1">Order Placed</p>
          <p
            className={`flex  text-sm text-gray-400 ${
              active.step1 === 'active' ? 'text-gray-400' : 'text-white'
            } `}
          >
            {moment(details?.orderPlacedTime).format('lll')}
          </p>
        </div>

        <div className="flex flex-col relative left-8 right-4  justify-center items-center text-center">
          <p className="flex text-sm   my-1">
        {
        details?.orderStatus==="CANCELLED_BY_CUSTOMER" ?"Order is Cancelled":details?.orderStatus===""||null?'Waiting for confirmation':details?.orderStatus
        }

            </p>
          {
            <p
              className={`flex  text-sm ${
                active.step2 === 'active' ||details?.orderStatus==="CANCELLED_BY_CUSTOMER" ? 'text-gray-400' : 'text-white'
              } `}
            >

{
  details?.orderStatus==="CANCELLED_BY_CUSTOMER"?

  moment(details?.orderCancelledTime).format('lll')
  :
  details?.orderStatus==="PAYMENT_COMPLETED"?

  moment(details?.paymentCompletedTime).format('lll')
  :
  ""

}
</p>
}

        </div>



        <div className="flex  relative left-12 md:left-6 lg:left-12 flex-col justify-center items-center text-center">
          <p className="flex  text-sm l   realtive left-10 my-1">
            Out for delivery
          </p>

          <p
            className={`flex   ${
              active.step3 === 'active' ? 'text-gray-400' : 'text-white'
            } `}
          >
{
  details?.isDelivery==='Y'? moment(details.customerPickupReadyTime).format('lll'):"24th Sept 2020, 12:08 Pm"
}
          </p>
        </div>
      </div>
      {/* Mobile vieew */}
       <div className="block md:hidden lg:hidden flex-col justify-start ">

       <div className={` ${active.mobupdate?active.step1==="pending"?"flex":"hidden":"flex"} justify-start items-center text-center`}>
          <div
            className="w-10 h-10  ml-4 rounded-full flex justify-center items-center  "
            style={{
              backgroundColor:
                active.step1 === 'active'
                  ? '#D85A5A'
                  : active.step1 === 'pending'
                  ? 'rgb(239 207 207)'
                  : '#2424243F',
            }}
          >
            {active.step1 === 'active' ? (
              <TiTick color={'white'} size={20} />
            ) : (
              active.step1 === 'pending' && (
                <BsDot size={40} color={'#D85A5A'} />
              )
            )}
          </div>
          <div className="ml-4">
          <p className="flex text-sm  ">Order Placed</p>
          <p
            className={`flex  text-sm text-gray-400 ${
              active.step1 === 'active' ? 'text-gray-400' : 'hidden'
            } `}
          >
            {moment(details?.orderPlacedTime).format('lll')}
          </p>
          </div>
        </div>
        <div className={`${active.mobupdate?active.step1==="pending"?"flex":"hidden":"block"} mx-4`}>
        <HiOutlineDotsVertical
          size={40}
          color={active.step1 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        <HiOutlineDotsVertical
          size={40}
          color={active.step1 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        <HiOutlineDotsVertical
          size={40}
          color={active.step1 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        </div>
        <div className={` ${active.mobupdate?active.step2==="pending"?"flex":"hidden":"flex"} ml-4 justify-start items-center text-center`}>
          <div
            className="w-10 h-10 bg-red-600  rounded-full flex justify-center items-center "
            style={{
              backgroundColor:
                active.step2 === 'active'
                  ? '#D85A5A'
                  : active.step2 === 'pending'
                  ? 'rgb(239 207 207)'
                  : '#2424243F',
            }}
          >
            {active.step2 === 'active' ? (
              <TiTick color={'white'} size={20} />
            ) : (
              active.step2 === 'pending' && (
                <BsDot size={40} color={'#D85A5A'} />
              )
            )}
          </div>
          <div className="ml-4">

          <p className="flex text-sm   my-1">
        {
        details?.orderStatus==="CANCELLED_BY_CUSTOMER" ?"Order is Cancelled":details?.orderStatus===""||null?'Waiting for confirmation':details?.orderStatus
        }

            </p>
          {
            <p
              className={`flex  text-sm ${
                active.step2 === 'active' ||details?.orderStatus==="CANCELLED_BY_CUSTOMER" ? 'text-gray-400' : 'hidden'
              } `}
            >

{
  details?.orderStatus==="CANCELLED_BY_CUSTOMER"?

  moment(details?.orderCancelledTime).format('lll')
  :
  details?.orderStatus==="PAYMENT_COMPLETED"?

  moment(details?.paymentCompletedTime).format('lll')
  :
  ""

}
</p>
}
</div>
        </div>
        <div className={`${active.mobupdate?active.step2==="pending"?"flex":"hidden":"block"} mx-4`}>
        <HiOutlineDotsVertical
          size={40}
          color={active.step2 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        <HiOutlineDotsVertical
          size={40}
          color={active.step2 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        <HiOutlineDotsVertical
          size={40}
          color={active.step2 === 'active' ? '#D85A5A' : '#2424243F'}
        />
        </div>
        <div className={` ${active.mobupdate?active.step3==="pending"?"flex":"hidden":"flex"} ml-4 justify-start items-center text-center`}>


          <div
            className="w-10 h-10 bg-red-600 text-white rounded-full flex justify-center items-center "
            style={{
              backgroundColor:
                active.step3 === 'active'
                  ? '#D85A5A'
                  : active.step3 === 'pending'
                  ? 'rgb(239 207 207)'
                  : '#2424243F',
            }}
          >
            {active.step3 === 'active' ? (
              <TiTick color={'white'} size={20} />
            ) : (
              active.step3 === 'pending' && (
                <BsDot size={40} color={'#D85A5A'} />
              )
            )}

          </div>
          <div className="mx-4">
          <p className="flex  text-sm l   realtive left-10 my-1">
            Out for delivery
          </p>

          <p
            className={`flex   ${
              active.step3 === 'active' ? 'text-gray-400' : 'hidden'
            } `}
          >
{
  details?.isDelivery==='Y'? moment(details.customerPickupReadyTime).format('lll'):"24th Sept 2020, 12:08 Pm"
}
          </p>
          </div>
        </div>

        <p className=" mx-16 text-base text-red-800 cursor-pointer" onClick={()=>{setactive({...active,mobupdate:!active.mobupdate})}} >{active.mobupdate ?'See all updates':"See less update"}</p>
   </div>

    </>
  )
}
