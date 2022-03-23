import Sideprofilecard from './sideprofilecard.jsx';
import React from 'react'
import Mobileprofile from './mobprofile.jsx'
function index({active,userdetail}) {
console.log(userdetail)
  return (
    <div>
 <Sideprofilecard user={userdetail}/>
     <Mobileprofile user={userdetail}/>
    </div>

  )
}

export default index
