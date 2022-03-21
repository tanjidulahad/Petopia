import React from 'react'
import SideProfile from '../../components/Cards/Order/Profile-card'
import WishItem from '../../components/Cards/Order/wishlist'
function Wishlist() {
  return (
    <section className="bg-gray-100 w-full ">
    <div className='wrapper mx-auto'>
      <div className="grid grid-cols-11 ">
        <div className="lg:col-span-2 md:col-span-5  my-10 ">
          <SideProfile />
        </div>
        <div className="lg:col-span-9 md:col-span-6 my-10 ml-8 ">
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




        </div>

      </div>
    </div>

  </section>
  )
}

export default Wishlist
