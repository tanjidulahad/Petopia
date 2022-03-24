import React from 'react'
import { FiHome } from 'react-icons/fi'

function address({ type, data, onEdit, onRemove }) {
  return (
    <div className="w-full  border-2 md:rounded-lg lg:rounded-lg   bg-white">
      <div className="p-4  w-full flex ">
        <div className="  w-full  m-2  ">
          <div className="flex ">
            <FiHome className='text-red-500 ' size={40} />
            <div className='w-full'>
              <p className="text-left m-4 my-2 font-bold text-base  text-dark">{type}</p>


              <p className="text-left m-4 font-medium text-base  text-gray-500">
                {data.full_name}{', '}<br />{data.address_line_1}, {data.address_line_2 && ','} {data.city},
                <br />{data.state}{', '}
                {data.zip_code}{', '}
                <br />
                {data.country},
                <br />
                <span>+91 {data.phone}</span>
              </p>
              <div className='flex justify-between items-center'>
                <p className="text-left mt-4 mx-4 font-medium text-base cursor-pointer text-red-600" onClick={onEdit}>Edit</p>
                <p className="text-left mt-4 mx-4 font-medium text-base cursor-pointer text-red-600" onClick={onRemove}>Remove</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default address
