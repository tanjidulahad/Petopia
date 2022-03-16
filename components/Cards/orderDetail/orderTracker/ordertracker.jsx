import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md';
import Tracker from './tracker';

function ordertracker() {
  return (
    <div className="w-full  border-2 rounded-lg  bg-white">
    <div className="my-4  w-full flex justify-between">

      <div className="px-4  w-full flex ">

       <div className="  w-full  m-4  ">
         <p className="text-left font-bold text-xl  text-dark">Order #1208</p>
         <p className="text-left text-lg font-bold text-red-500 mt-4">Arriving Today by 11:00 AM</p>
       </div>
      </div>


    </div>

    <div className="mt-4 border-t-2  border-gray-200  w-full flex justify-between">
    <div className='flex w-full my-6'>
    <div className="px-4  w-full flex ">

       <div className="  w-full    ">
        <Tracker/>
       </div>
      </div>



    </div>

    </div>


    </div>
  )
}

export default ordertracker
