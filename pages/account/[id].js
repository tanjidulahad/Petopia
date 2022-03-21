import { useRouter } from 'next/router'
import React, { useEffect,useState } from 'react'
import ErrorPage from 'next/error'

function Service() {
  const router= useRouter()
  const [aspath, setaspath] = useState(router.asPath.split('/')[2])

  useEffect(() => {
    // alert(aspath)
    if(router.asPath.split('/')[2] === 'wallet')
    {

      router.push({
        pathname:'/account/myorders/',
        asPath:`/account/${router.asPath.split('/')[2]}`
      },`/account/wallet`)
    }
    if(router.asPath.split('/')[2] === 'savedplaces')
    {
      router.push({
        pathname:'/account/myorders/',
        asPath:`/account/${router.asPath.split('/')[2]}`
      },`/account/savedplaces`)
    }
     if(router.asPath.split('/')[2] === 'wishlist')
    {
      router.push({
        pathname:'/account/myorders/',
        asPath:`/account/${router.asPath.split('/')[2]}`
      },`/account/wishlist`)
    }
    if (router.asPath.split('/')[2] === 'subscription')
    {
      router.push({
        pathname:'/account/myorders/',
        asPath:`/account/${router.asPath.split('/')[2]}`
      },`/account/subscription`)
    }

    else{
      setaspath("Error")
    }


  },)
console.log(aspath)
  return (
    <div>

{
 aspath=== "[id]" ?`Loading....`:aspath==="wallet"?"":aspath=== "Error" &&<ErrorPage  statusCode={404} />

}

{

}


    </div>

  )
}

export default Service
