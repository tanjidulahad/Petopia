import React, { useEffect } from 'react'
import OrderCard from '../../components/Cards/Order/orderCard/orderCard'
import SideProfile from '../../components/Cards/Order/Profile-card'
import WishItem from '../../components/Cards/Order/wishlist'
import { useState } from 'react'
import Address from '../../components/Cards/Order/address'
import { BsPlusCircle } from 'react-icons/bs'
import Wallet from '../../components/Cards/Order/wallet';
import Transaction from '../../components/Cards/Order/wallet/transaction.jsx';
import Subscription from '../../components/Cards/Order/subscription'
import { useRouter } from 'next/router'
import Edit from '../../components/Cards/Order/profile/index';
function Myorder() {
  const router=useRouter()
console.log(router)
  useEffect(() => {

    setrender(window.location.pathname.split('/')[2])
  },[router.asPath])
  const [counter, setcounter] = useState(0)
  const [render, setrender] = useState('')

  return (
    <section className="bg-gray-100 w-full ">
      <div className="wrapper mx-auto">
        <div className="grid grid-cols-11 ">
          <div className="lg:col-span-2 md:col-span-4 col-span-0 my-0  md:my-10 lg:my-10 ">
            <SideProfile active={render} />
          </div>
          <div className="lg:col-span-9 md:col-span-7 col-span-11 my-10 ml-4 mx-4 md:mx-0 lg:mx-0 md:ml-8 lg:ml-8 ">
            {render === 'wishlist' ? (
              <>
               <p className="text-xl text-gray-900 font-bold"> Wishlist</p>
              <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
                <div className="w-full rounded-lg shadow">
                  <WishItem />
                </div>

                <div className="w-full rounded-lg shadow">
                  <WishItem />
                </div>
                <div className="w-full rounded-lg shadow">
                  <WishItem />
                </div>
              </div>
              </>
            ) : render === 'savedplaces' ? (
              <>
              <p className="text-xl text-gray-900 font-bold">
                  {' '}
                  Delivery Address
                </p>
                <div className="grid lg:grid-cols-2 md:grid-cols-1  gap-6 my-5">
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
                <div className="flex cursor-pointer ">
                  <BsPlusCircle className="text-red-500" size={30} />

                  <p className="text-lg text-red-500  font-semibold ml-4">
                    {' '}
                    Add New Address{' '}
                  </p>
                </div>
              </>
            ): render === 'profile' ? (
              <>

                <div className="grid lg:grid-cols-1    ">

                  <div className="w-full bg-white rounded-lg shadow">
                    <Edit type={`Home`} />
                  </div>


                </div>

              </>
            )

            : render ==='wallet'? <div className="grid grid-cols-1   gap-6 ">
            <div className="w-full rounded-lg shadow">
              <Wallet/>
            </div>

            <div className="w-full rounded-lg shadow">
              <Transaction/>
            </div>
          </div>:render ==='subscription'?  <>
              <p className="text-xl text-gray-900 font-bold">
                  {' '}
                  My Subscription
                </p>
                <div className="grid lg:grid-cols-2 md:grid-cols-1  gap-6 my-5">
                  <div className="w-full rounded-lg shadow">
                    <Subscription status={`Active`} />
                  </div>

                  <div className="w-full rounded-lg shadow">
                    <Subscription status={`Active`} />
                  </div>
                  <div className="w-full rounded-lg shadow">
                    <Subscription  />
                  </div>
                </div>

              </>:


            (
              <>
                <p className="text-xl text-gray-900 font-bold">
                  {' '}
                  Current Orders
                </p>
                <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
                  <div className="w-full rounded-lg shadow">
                    <OrderCard />
                  </div>
                </div>

                <p className="text-xl text-gray-900 font-bold"> Past Orders</p>
                <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
                  <div className="w-full rounded-lg shadow">
                    <OrderCard status={'past'} message={'Delivery Success'} />
                  </div>
                  {/* <!-- ... --> */}
                  <div className="w-full rounded-lg shadow">
                    <OrderCard stayus={'past'} message={'Order Cancelled'} />
                  </div>
                  <div className="w-full rounded-lg shadow">
                    <OrderCard status={'past'} message={'Order Cancelled'} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Myorder
