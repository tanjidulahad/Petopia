import Header from '../../components/MobHeader/index'
import React from 'react'
import accountLayout from '../../components/layout/account-layout'
import Edit from '../../components/Cards/Order/profile/index'

function Profile() {
  return (
    <>
    <Header display={true} topic="Edit Profile" />
      <div className="grid lg:grid-cols-1   ">
        <div className="w-full bg-white rounded-lg shadow">
          <Edit type={`Home`} />
        </div>
      </div>
    </>
  )
}

export default accountLayout(Profile)
