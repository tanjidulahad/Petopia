import Sideprofilecard from './sideprofilecard.jsx';
import React from 'react'
import Mobileprofile from './mobprofile.jsx'
function index({active}) {
  return (
    <div>
 <Sideprofilecard active={active}/>
     <Mobileprofile active={active}/>
    </div>

  )
}

export default index
