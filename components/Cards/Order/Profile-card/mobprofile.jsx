import React from 'react'
import Link from "@components/link";
import Router from "next/router";
import { connect } from 'react-redux';
import { logOutStart } from '@redux/user/user-action';
import { logOut } from '@redux/UI/ui-action';


function mobprofile({ user, logout }) {
  const active = Router?.router?.state?.pathname.split('/')[2]


  return (
    <div>
      <div className=" block lg:hidden md:hidden shadow-xl bg-white  " style={{ height: '100vh' }}>
        {/* <p className="text-base font-bold text-dark flex justify-start px-4 py-2 shadow-md">Profile</p> */}
        <div className=" flex justify-between my-6 mx-2">
          <div className="flex justify-around items-center my-2 w-full">
            <div className="w-fit flex justify-center mx-2  ">
              <div className="rounded-full border-4 border-white w-20 h-20 bg-gray-100 text-gray-400  flex justify-center items-center">
                <span className='text-3xl font-extrabold	' >
                  {(() => {
                    const name = user.full_name.split(' ')
                    if (name.length) {
                      if (name.length > 1) {
                        return `${name[0][0]}${name[name.length - 1][0]}`.toUpperCase()
                      }
                      return `${name[0][0]}${name[0][1]}`.toUpperCase()
                    }
                    return 'A'
                  })()}
                </span>
              </div>
            </div>
            <div className="  w-full ">
              <div className=" text-left ml-4 mt-1 relative    ">
                <p className="text-sm   font-bold    text-gray-900">
                  {user?.full_name}

                </p>
                <p className="text-sm font-semibold  my-2  text-gray-400">
                  {user?.phone === null ? "" : user?.phone}

                </p>
                <p className="text-sm font-semibold   text-gray-400">
                  {user?.email_id === null ? "" : user?.email_id}

                </p>
              </div>
            </div>
          </div>

          <div className="w-max shrink-0 pr-4">
            <Link href='/account/profile ' >
              <p className=" cursor-pointer text-lg m-2 font-semibold btn-color-revers  relative ">
                Edit
              </p>
            </Link>
          </div>
        </div>

        <div ClassName=" mb-6 ">

          <div className="my-2 pt-4 border-t-2 border-gray-200 space-y-4">
            {
              active === 'myorders' ?
                <div className="border-l-4 border-rose-700 h-10 flex">

                  <Link href='/account/myorders ' >
                    <div className="mx-4  pt-2 flex">
                      <img src='/img/my orders.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  btn-color-revers ">
                        {" "}
                        My Orders
                      </p>
                    </div>


                  </Link>

                </div> :
                <div className=" cursor-pointer h-10 ">
                  <Link href='/account/myorders ' >

                    <div className="mx-4  pt-2 flex">
                      <img src='/img/my orders.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
                        {" "}
                        My Orders
                      </p>
                    </div>
                  </Link>
                </div>


            }
            {
              // active === 'wishlist' ?
              //   <div className="border-l-4 border-rose-700 h-10 ">

              //     <Link href='/account/wishlist ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/wishlist.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  btn-color-revers ">
              //           {" "}
              //           Wishlist
              //         </p>
              //       </div>
              //     </Link>
              //   </div> :
              //   <div className=" cursor-pointer h-10 ">
              //     <Link href='/account/wishlist ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/wishlist.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
              //           {" "}
              //           Wishlist
              //         </p>
              //       </div>
              //     </Link>

              //   </div>
            }

            {
              // active === 'wallet' ?
              //   <div className="border-l-4 border-rose-700 h-10 ">

              //     <Link href='/account/wallet ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/wishlist.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  btn-color-revers ">
              //           {" "}
              //           Wallet
              //         </p>
              //       </div>
              //     </Link>
              //   </div> :
              //   <div className=" cursor-pointer h-10 ">
              //     <Link href='/account/wallet ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/wallet.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
              //           {" "}
              //           Wallet
              //         </p>
              //       </div>
              //     </Link>

              //</div>
            }
            {
              active === 'savedplaces' ?
                <div className="border-l-4 border-rose-700 h-10 ">

                  <Link href='/account/savedplaces ' >
                    <div className="mx-4  pt-2 flex">
                      <img src='/img/saved address.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  btn-color-revers ">
                        {" "}
                        Saved Address
                      </p>
                    </div>
                  </Link>
                </div> :
                <div className=" cursor-pointer h-10 ">
                  <Link href='/account/savedplaces ' >
                    <div className="mx-4  pt-2 flex">
                      <img src='/img/saved address.svg' />
                      <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
                        {" "}
                        Saved Address
                      </p>
                    </div>
                  </Link>

                </div>
            }



            {
              // active === 'subscription' ?
              //   <div className="border-l-4 border-rose-700 h-10 ">

              //     <Link href='/account/subscription ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/help.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  btn-color-revers ">
              //           {" "}
              //           Help
              //         </p>
              //       </div>
              //     </Link>
              //   </div> :
              //   <div className=" cursor-pointer h-10 ">
              //     <Link href='/account/subscription ' >
              //       <div className="mx-4  pt-2 flex">
              //         <img src='/img/help.svg' />
              //         <p className="  mx-2   text-sm relative  font-semibold relative  text-gray-600">
              //           {" "}
              //           Help
              //         </p>
              //       </div>
              //     </Link>

              //   </div>
            }



            <div className=" h-10 mb-6 ">
              <div className="mx-4  pt-2 flex">
                <img src='/img/login.svg' />
                <p className="  mx-2   text-sm font-semibold relative text-gray-600" onClick={logout}>
                  {" "}
                  Log Out
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  // logout: () => dispatch(logOutStart())
  logout: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(mobprofile)
