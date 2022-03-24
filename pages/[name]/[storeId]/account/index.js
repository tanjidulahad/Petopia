import React from 'react'
import { connect } from "react-redux"
import Profile from '@components/Cards/Order/Profile-card/index.js';
import Edit from '@components/Cards/Order/profile/index.js'
import withAuth from '@components/auth/withAuth'
import Router, { useRouter } from 'next/router';
import PageWrapper from '@components/page-wrapper/page-wrapper';

function index({ user }) {
  const router = useRouter();
  return (
    <>
      <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
        <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </button>
        <span className='text-base font-semibold'>Profile</span>
      </div>
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
    </>
  )
}
const mapStateToProps = state => ({
  show: state.user.show,
  // user: state.user.currentUser
})

export default connect(mapStateToProps, null)(PageWrapper(withAuth(index)))
