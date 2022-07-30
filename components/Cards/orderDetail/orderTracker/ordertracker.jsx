import React from 'react'
import Tracker from './tracker';

function Ordertracker({ data, details }) {
  return (
    <div className="w-full  border-2 rounded-lg  bg-white">
      <div className="my-4  w-full flex justify-between">
        <div className="px-4  w-full flex ">
          <div className=" w-full  m-4  ">
            <p className="text-left font-bold text-base md:text-xl  text-dark">Order #{data.orderId}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t-2  border-gray-200  w-full flex justify-between">
        <div className='flex w-full my-6'>
          <div className=" w-full flex ">
            <div className="  w-full    ">
              <Tracker details={details} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ordertracker
