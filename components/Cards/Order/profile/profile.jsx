import React from 'react'

function Profile() {
  return (
    <div className=" w-full lg:w-1/2 md:w-full  ">
      <p className="m-8 mb-4 text-lg text-dark hidden md:block lg:block">Edit Profile</p>
      <div className="rounded-full w-20 h-20 bg-gray-900 m-8 lg:mx-8 md:mx-8 lg:my-0 md:my-0 z-100  bg-gray-900  ">
              <img
                className="w-full h-full opacity-90 rounded-full"
                src="https://images.indulgexpress.com/uploads/user/imagelibrary/2020/11/7/original/Chef_Ranveer_Brar.jpg"
              />
            </div>

       <div className="mx-8 my-6">
         <div className="mb-2">
           <p className="mb-2 text-sm">Name</p>
         <input type="text" placeholder="Full Name" className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none "/>

         </div>
         <div className="mb-2">
           <p className="mb-2 text-sm">Phone Number</p>
         <input type="text" placeholder="Full Name" className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none "/>

         </div>
         <div className="mb-2 text-sm">
           <p className="mb-2">Email</p>
         <input type="text" placeholder="Full Name" className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none"/>

         </div>
         <div className="my-4 ">
           <button className="bg-red-400 p-2  px-4 rounded text-sm text-white "> Save details</button>

         </div>
       </div>

    </div>
  )
}

export default Profile
