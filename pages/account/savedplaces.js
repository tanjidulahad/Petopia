import React from 'react'
import accountLayout from '../../components/layout/account-layout'
import Header from '../../components/MobHeader/index'
import Address from '../../components/Cards/Order/address'
import { BsPlusCircle } from 'react-icons/bs'

function Savedplaces() {
  return (
    <>
      <Header display={true} topic="Saved Address" />

      <p className="text-xl hidden md:block lg:block text-gray-900 font-bold">
        {' '}
        Delivery Address
      </p>
      <div className="grid lg:grid-cols-2 md:grid-cols-1  gap-6 my-0 md:my-5 lg:my-5  ">
        <div className="w-full rounded-lg shadow">
          <Address type={`Home`} />
        </div>

        <div className="w-full rounded-lg shadow">
          <Address type={`Work`} />
        </div>
        <div className="w-full rounded-lg shadow">
          <Address type={`Work`} />
        </div>
      </div>
      <div className="flex cursor-pointer mt-24 justify-center md:mt-0 lg:mt-0 md:justify-start lg:justify-start ">
        <BsPlusCircle className="text-red-500" size={30} />

        <p className="text-lg text-red-500  font-semibold ml-4">
          {' '}
          Add New Address{' '}
        </p>
      </div>

    </>
  )
}

export default accountLayout(Savedplaces)
