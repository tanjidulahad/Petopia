import React from 'react'
import OrderCard from '../../components/Cards/Order/orderCard/orderCard'
import SideProfile from '../../components/Cards/Order/Profile-card'
function Myorder() {
  return (
    <section className="bg-gray-100 w-full ">
      <div className='wrapper mx-auto'>
        <div className="grid grid-cols-11 ">
          <div className="lg:col-span-2 md:col-span-4  my-10 ">
            <SideProfile />
          </div>
          <div className="col-span-8  my-10 mx-8 ">
            <p className="text-xl text-gray-900 font-bold"> Current Orders</p>
            <div className="grid grid-cols-2 gap-6 my-10">
              <div className="w-full rounded-lg shadow">

                <OrderCard />
              </div>


            </div>

            <p className="text-xl text-gray-900 font-bold"> Past Orders</p>
            <div className="grid grid-cols-2 gap-6 my-10">
              <div className="w-full rounded-lg shadow">

                <OrderCard status={"past"} message={"Delivery Success"} />
              </div>
              {/* <!-- ... --> */}
              <div className="w-full rounded-lg shadow">

                <OrderCard stayus={"past"} message={"Order Cancelled"} />
              </div>
              <div className="w-full rounded-lg shadow">

                <OrderCard status={"past"} message={"Order Cancelled"} />
              </div>


            </div>

          </div>

        </div>
      </div>

    </section>
  )
}

export default Myorder
