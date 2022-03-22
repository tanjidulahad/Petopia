import Link from "next/link";
import React from "react";

function Sideprofilecard({active}) {
  return (
    <div className="w-full  h-full hidden md:block lg:block rounded-t-xl bg-white shadow-lg ">
      <div className="w-full h-40  rounded-t-xl bg-gray-900 ">
        <img
          className="w-full rounded-t-xl  h-full opacity-70"
          src="https://im1.dineout.co.in/images/uploads/restaurant/sharpen/5/k/w/p5605-15644763495d4003bdce387.jpg?tr=tr:n-xlarge"
        />
      </div>


        <div className="w-full  ">
          <div className=" flex justify-between">
            <div className="  w-full ">
            <div className="w-full flex justify-center relative left-4 -top-8">
            <div className="rounded-full w-20 h-20 bg-gray-900  ring-2 z-100 shadow-lg bg-gray-900  ring-white">
              <img
                className="w-full h-full opacity-90 rounded-full"
                src="https://images.indulgexpress.com/uploads/user/imagelibrary/2020/11/7/original/Chef_Ranveer_Brar.jpg"
              />
            </div>
            </div>


            <div className=" text-center relative  ml-2 -top-4 left-4">
              <p className="lg:text-base md:text-base   font-bold flex  justify-center  text-gray-900">
                KiranKumar
              </p>
              <p className="lg:text-base md:text-left  md:text-sm font-medium flex   justify-center text-gray-500">
                +91 1234567890
              </p>
              <p className="lg:text-base md:text-sm flex  justify-center font-medium   text-gray-500">
                kiranads6@gmail.com
              </p>
            </div>
            </div>
            <div className="  w-max ">
            <Link href='/account/myorders' as='/account/profile ' >
            <p className=" cursor-pointer text-lg m-2 font-medium text-red-600 relative ">
              Edit
            </p>
              </Link>
          </div>
          </div>


        </div>


      <div className="border-t-2 border-gray w-full">
        <div className="mt-12  ">
          {
            active==='myorders' ?
            <div className="border-l-4 border-rose-700 h-10 my-6">
              <Link href='/account/myorders' as='/account/myorders ' >
              <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-red-600">
              {" "}
              My Orders
            </p>
              </Link>

          </div>:
            <div className=" cursor-pointer h-10 my-6">
              <Link href='/account/myorders' as='/account/myorders ' >

              <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
              My Orders

              </p>
              </Link>
              </div>


          }
        {
          active==='wishlist' ?
          <div className="border-l-4 border-rose-700 h-10 my-6">

          <Link href='/account/myorders' as='/account/wishlist ' >
                     <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-red-600">

            Wishlist

            </p>
            </Link>
        </div>:
          <div className=" cursor-pointer h-10 my-6">
            <Link href='/account/myorders' as='/account/wishlist ' >
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
            Wishlist

            </p>
            </Link>

            </div>
        }

{
          active==='wallet' ?
          <div className="border-l-4 border-rose-700 h-10 my-6">

          <Link href='/account/myorders' as='/account/wallet ' >
                     <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-red-600">

            Wallet

            </p>
            </Link>
        </div>:
          <div className=" cursor-pointer h-10 my-6">
            <Link href='/account/myorders' as='/account/wallet ' >
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
            Wallet

            </p>
            </Link>

            </div>
        }
{
          active==='savedplaces' ?
          <div className="border-l-4 border-rose-700 h-10 my-6">

          <Link href='/account/myorders' as='/account/savedplaces ' >
                     <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-red-600">

            Saved Places

            </p>
            </Link>
        </div>:
          <div className=" cursor-pointer h-10 my-6">
            <Link href='/account/myorders' as='/account/savedplaces ' >
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
            Saved Places

            </p>
            </Link>

            </div>
        }



{
  active==='subscription' ?
  <div className="border-l-4 border-rose-700 h-10 my-6">

  <Link href='/account/myorders' as='/account/subscription ' >
             <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-red-600">

             Subscription

    </p>
    </Link>
</div>:
  <div className=" cursor-pointer h-10 my-6">
    <Link href='/account/myorders' as='/account/subscription ' >
    <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
    Subscription

    </p>
    </Link>

    </div>
}



          <div className=" h-10 my-6">
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
              {" "}
              Log Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sideprofilecard;
