import React from 'react'

import WishItem from '../../components/Cards/Order/wishlist'
import accountLayout from '../../components/layout/account-layout'
import Header from '../../components/MobHeader/index'

function Wishlist() {
  return (

          <>
          <Header display={true} topic="Wishlist" />

<p className="text-xl mx-2 mt-4 md:mt-0 lg:mt-0 md:mx-0 lg:mx-0 text-gray-900 font-bold">

Wishlist</p>
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


  )
}

export default accountLayout(Wishlist)


  // <>
  //                               <p className="text-xl text-gray-900 font-bold"> Wishlist</p>
  //                               <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
  //                                   <div className="w-full rounded-lg shadow">
  //                                       <WishItem />
  //                                   </div>

  //                                   <div className="w-full rounded-lg shadow">
  //                                       <WishItem />
  //                                   </div>
  //                                   <div className="w-full rounded-lg shadow">
  //                                       <WishItem />
  //                                   </div>
  //                               </div>
  //                           </>