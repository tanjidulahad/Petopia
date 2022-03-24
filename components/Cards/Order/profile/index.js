import React from 'react'
import Profile from './profile.jsx'

function index({type,user}) {
  const fullname =user?.full_name
  const phone = user?.phone
  const email_id =user?.email_id

    return (
    <Profile type={type} fullname={fullname} phone={phone} email_id={email_id}/>
  )
}

export default index
