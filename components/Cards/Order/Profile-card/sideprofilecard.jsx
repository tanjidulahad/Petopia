import React from "react";

function Sideprofilecard() {
  return (
    <div className="w-full  h-full  rounded-t-xl bg-white shadow-lg ">
      <div className="w-full h-40  rounded-t-xl bg-gray-900 ">
        <img
          className="w-full rounded-t-xl  h-full opacity-70"
          src="https://im1.dineout.co.in/images/uploads/restaurant/sharpen/5/k/w/p5605-15644763495d4003bdce387.jpg?tr=tr:n-xlarge"
        />
      </div>

      <div className="wrapper mx-auto ">
        <div className="grid grid-cols-11 ">
          <div className="col-span-10 ">
            <div className="rounded-full w-20 h-20 bg-gray-900 relative left-1/4 -top-12 ring-2 z-100 shadow-lg bg-gray-900  ring-white">
              <img
                className="w-full h-full opacity-90 rounded-full"
                src="https://images.indulgexpress.com/uploads/user/imagelibrary/2020/11/7/original/Chef_Ranveer_Brar.jpg"
              />
            </div>

            <div className=" text-center ml-2">
              <p className="text-sm md:text-base sm:text-sm font-bold relative -top-8 text-gray-900">
                Kiran Kumar
              </p>
              <p className="text-small font-medium relative -top-8 text-gray-500">
                +91 1234567890
              </p>
              <p className="text-small relative -left-6 font-medium relative -top-8 text-gray-500">
                kiranads6@gmail.com
              </p>
            </div>
          </div>

          <div className="col-span-1  w-full  ">
            <p className="text-lg font-medium text-red-600 relative left-12">
              Edit
            </p>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-gray w-full">
        <div className="mt-12  ">
          <div className="border-l-4 border-rose-700 h-10 my-6">
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-red-600">
              {" "}
              My Orders
            </p>
          </div>
          <div className=" h-10 my-6">
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
              {" "}
              Wishlist
            </p>
          </div>
          <div className=" h-10 my-6">
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
              {" "}
              Wallet
            </p>
          </div>
          <div className=" h-10 my-6">
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
              {" "}
              Saved Places
            </p>
          </div>
          <div className=" h-10 my-6">
            <p className=" flex mx-8 py-2 text-lg relative  font-semibold relative  text-gray-600">
              {" "}
              Subscription
            </p>
          </div>

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
