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
      <div className=" block lg:hidden md:hidden shadow-xl bg-white  " style={{ height: '90vh' }}>
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
            {/* <Link href='/account/profile ' >
              <p className=" cursor-pointer text-lg m-2 font-semibold btn-color-revers  relative ">
                Edit
              </p>
            </Link> */}
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
                      <p className="  mx-2   text-sm font-semibold relative text-gray-600">
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
        <div className=' sticky top-full w-full footer-bg '>
          <div className='bg-[#242424] bg-opacity-70 [padding-top:12px!important] [padding-bottom:12px!important] text-white'>
            <p className=" text-[9px] font-light text-center">powered by</p>
            <a href="https://goplinto.com" target={'_blank'} className=" block h-8 text-center w-32 font-semibold m-auto mt-2"><img className="w-full h-auto" src="https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png" alt="Goplinto" /></a>

            <div className='px-2 md:px-6 w-full flex-row items-start justify-between mt-2.5 md:pb-0 space-x-1 md:space-x-4 space-y-4'>
              <div className="w-full flex flex-row items-start justify-between">
                <div className={`w-full basis-2/12 flex-grow flex flex-col flex-auto justify-center space-y-3 items-center`} >
                  <p className='inline-block w-full text-center text-[7px] md:text-sm lg:text-base md:px-2' >{'Cloud Hosted on'}</p>
                  <div className={`w-full flex flex-row justify-center items-start max-h-8 space-x-4`}>
                    <div className=' w-6 h-6 '>
                      <img src={'/static/images/aws dark mode copy@2x.png'} className='w-full h-full object-contain' />
                    </div>
                    <div className=' w-6 h-6'>
                      <img src={'/static/images/Azure web services copy@2x.png'} className='w-full h-full object-contain' />
                    </div>
                  </div>
                </div>
                <div className={`w-full basis-3/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3 divide-x-2`} >
                  <p className='w-full text-center text-[7px] md:text-sm lg:text-base md:px-2' >{'Secured Payments with'}</p>
                  <div className={`w-full flex flex-row justify-center items-start px-2 border-[#212B3680]  space-x-4`}>
                    <div className=' h-6 w-6 '>
                      <img src={'/static/images/pci-compliant.f0aea468@2x.png'} className='w-full h-full object-contain' />
                    </div>
                    <div className=' h-6 w-6 '>
                      <img src={'/static/images/ssl-final@2x.png'} className='w-full h-full object-contain' />
                    </div>
                    <div className=' h-6 w-6 '>
                      <img src={'/static/images/https (1)@2x.png'} className='w-full h-full object-contain' />
                    </div>
                  </div>
                </div>

              </div>
              <div className={`w-full basis-7/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3`} >
                <p className='w-full text-center text-[7px] md:text-sm lg:text-base md:px-2' >{'Secured Payments with'}</p>
                <div className={`w-full flex flex-row justify-between items-baseline px-2`}>
                  <div className=' h-6 w-6'>
                    <img src={'/static/images/amex@2x.png'} className='w-full h-full object-contain' />
                  </div>
                  <div className=' h-6 w-6'>
                    <img src={'/static/images/master card@2x.png'} className='w-full h-full object-contain' />
                  </div>
                  <div className=' h-6 w-6'>
                    <img src={'/static/images/visa copy@2x.png'} className='w-full h-full object-contain' />
                  </div>
                  <div className=' h-6 w-6'>
                    <img src={'/static/images/upi@2x.png'} className='w-full h-full object-contain' />
                  </div>
                  <div className=' h-6 w-6'>
                    <img src={'/static/images/paytm@2x.png'} className='w-full h-full object-contain' />
                  </div>
                  <div className=' h-6 w-6'>
                    <img src={'/static/images/pe copy 2@2x.png'} className='w-full h-full object-contain' />
                  </div>
                  <div className=' h-6 w-6'>
                    <img src={'/static/images/google pay copy@2x.png'} className='w-full h-full object-contain' />
                  </div>
                  <div className=' h-6 w-6'>
                    <img src={'/static/images/& more.svg'} className='w-full h-full object-contain' />
                  </div>
                </div>
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
