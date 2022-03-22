import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md';

function orderlList() {
  return (
    <div className="w-full  my-8 border-2 rounded-lg  bg-white">
    <div className="  m-4 lg:w-full md:w-max ">
    <div className="flex lg:grid lg:grid-cols-2 md:grid-col-2 gap-0 lg:gap-4 md:flex md:gap-2 ">
      <div className="  flex ">
      <div className="hidden md:block lg:block mt-2 rounded bg-gray-900 w-10 " style={{height:'40px'}}>
   <img  className="w-full h-full rounded object-cover opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"/>
 </div>
       <div className="  md:w-max ml-2 my-2 mr-0 md:m-2 lg:m-2  ">
         <p className="hidden md:block lg:block  text-left font-bold text-sm md:w-max">Pazha Mudhir Cholai</p>
         <p className="text-left font-bold text-sm md:w-max">Order summary</p>


         <p className="text-left mt-4 lg:mt-0 md:mt-0 text-sm font-medium text-gray-500 md:w-max ">Order #1208</p>


       </div>
      </div>

      <div className="mt-10 lg:mt-6 md:mt-6   lg:w-full flex justify-end align-center ">
      <p className="text-left  text-sm font-medium text-gray-500  ml-10 md:ml-0 lg:ml-0 mr-0 lg:mr-8  md:ml-4">24th Sept 2019, 12:30 Pm</p>


      </div>
      </div>
    </div>

<div className="my-4 mb-8 border-t-2  border-gray-200 border-b-2">






      <div className="grid grid-cols-2 gap-4 md:flex ">
        <div className=" md:col-span-2 my-4 ">

        <div className=" lg:mx-4  md:mx-4 flex   ">
 <div className="hidden md:block lg:block mt-2 rounded bg-gray-900 w-1/4  " style={{height:'75px'}}>
   <img className="w-full h-full rounded object-cover opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"/>
 </div>
 <div className="   my-2 mx-6 md:ml-6 ">
   <p className="text-left font-semibold text-base text-dark mt-2 ">1 X Plain Briyani</p>
   <p className="text-left text-sm font-medium text-gray-500 mt-2 "> Green, Small</p>
 </div>
</div>

        </div>

        <div className=" lg:w-full  my-4  ">

        <div className="mt-8  w-full flex justify-end align-center ">
<p className="text-left w-max  text-lg font-bold text-gray-900 mr-4 "> Rs 160</p>


</div>

        </div>

      </div>
      <div className="grid grid-cols-2 gap-4 md:flex ">
        <div className=" md:col-span-2 my-4 ">

        <div className=" lg:mx-4  md:mx-4 flex   ">
 <div className="hidden md:block lg:block mt-2 rounded bg-gray-900 w-1/4  " style={{height:'75px'}}>
   <img className=" w-full h-full rounded object-cover opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"/>
 </div>
 <div className="   my-2 mx-6 md:ml-6 ">
   <p className="text-left font-semibold text-base text-dark mt-2 ">1 X Plain Briyani</p>
   <p className="text-left  text-sm font-medium text-gray-500 mt-2 "> Green, Small</p>
 </div>
</div>

        </div>

        <div className=" lg:w-full  my-4  ">

        <div className="mt-8   flex justify-end align-center ">
<p className="text-left w-max text-lg font-bold text-gray-900 mr-4 "> Rs 160</p>


</div>

        </div>

      </div>
















</div>



    </div>
  )
}

export default orderlList
