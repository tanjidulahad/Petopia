import React from 'react'

function Profile({ type, fullname, email_id, phone }) {

  return (

    <div className={` w-full ${type === 'index' ? "lg:w-full" : "lg:w-1/2"}  md:w-full  `}>
      <p className="m-8 mb-4 text-lg text-dark hidden md:block lg:block" >Edit Profile</p>
      <div className="rounded-full w-20 h-20 bg-gray-100 text-gray-400 m-8 lg:mx-8 md:mx-8 lg:my-0 md:my-0 z-100 flex justify-center items-center">
        <span className='text-3xl font-extrabold	' >
          {(() => {
            const name = fullname.split(' ')
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
      <div className="mx-8 my-6">
        <div className="mb-2">
          <p className="mb-2 text-sm" >Name</p>
          <input type="text" value={`${fullname ? fullname : ""}`} placeholder="Full Name" className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none " />

        </div>
        <div className="mb-2">
          <p className="mb-2 text-sm" >Phone Number</p>
          <input type="text" placeholder="Phone number" value={`${phone ? phone : ""}`} className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none " />

        </div>
        <div className="mb-2 text-sm">
          <p className="mb-2">Email</p>
          <input type="text" placeholder="Email" className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none" value={`${email_id ? email_id : ""}`} />

        </div>
        <div className="my-4 ">
          <button className="bg-red-400 p-2  px-4 rounded text-sm text-white "> Save details</button>

        </div>
      </div>

    </div>
  )
}

export default Profile
