import React from 'react'
import {FiHome} from 'react-icons/fi'

function address({type}) {
  return (
    <div className="w-full  border-2 md:rounded-lg lg:rounded-lg   bg-white">


      <div className="p-4  w-full flex ">

       <div className="  w-full  m-2  ">

         <div className="flex ">
           <FiHome className='text-red-500 ' size={40}  />
           <div>
         <p className="text-left m-4 my-2 font-bold text-base  text-dark">{type}</p>

         <p className="text-left m-4 font-medium text-base  text-gray-500">No:12 Kumaran Senthil Apts, Gandhi nagar, Velachery, Chennai - 20.No:12 Kumaran Senthil Apts, Gandhi nagar, Velachery, Chennai - 20.</p>

         <p className="text-left mt-4 mx-4 font-medium text-base cursor-pointer text-red-600">Edit</p>



           </div>
         </div>
       </div>
      </div>







    </div>
  )
}

export default address
