import React from 'react'
import Profile from '../../components/Cards/Order/Profile-card/index.js';
import Edit from '../../components/Cards/Order/profile/index.js'
import withAuth from '../../components/auth/withAuth'
import { connect } from "react-redux"

function index({ user }) {
  // console.log(user)
  return (
    <div className="   ">
      <div className=" bg-gray-100 block md:hidden lg:hidden">
        <Profile user={user} />
      </div>
      <div className=" hidden md:block lg:block">
        <section className="bg-white w-full ">
          <div className="wrapper mx-auto">
            <div className="grid grid-cols-11 ">
              <div className=" hidden md:hidden lg:flex lg:justify-center lg:col-span-2 md:col-span-4 col-span-0 my-0  md:my-10 lg:my-10  ">
              </div>
              <div className=" hidden md:block lg:block lg:col-span-8 md:col-span-8 col-span-0 my-0  md:my-10 lg:my-10  ">
                <Edit type="index" user={user} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  show: state.user.show,
  user: state.user.currentUser
})

export default connect(mapStateToProps, null)(index)
