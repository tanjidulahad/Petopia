import { useEffect, useState } from 'react'
import Link from '@components/link'

import { BsDot } from 'react-icons/bs'
function index() {
  const [mobNavHeight, setMobNavHeight] = useState(0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const objerver = new ResizeObserver(function (e) {
        if (e[0].contentRect.width < 640 && mobNavHeight == 0) {
          const ele = document.getElementById('mob-navbar')
          const ele2 = document.getElementById('cart-total-btn') || false
          let totalH = mobNavHeight
          if (!!ele) {
            if (ele.offsetHeight != totalH) {
              totalH = ele.offsetHeight
            }
          }
          if (!!ele2) {
            if (ele2.offsetHeight != mobNavHeight) {
              totalH += ele2.offsetHeight
            }
          }
          setMobNavHeight(totalH)
        } else {
          setMobNavHeight(0)
        }
      })
      objerver.observe(document.body)
    }
  }, [])

  return (
    <footer className=' bg-[#242424] footer-bg footer-color' style={{
      paddingBottom: mobNavHeight,
      color: '#fff'
    }}
    >
      <div className="hidden sm:block w-full bg-dark-900 bg-[#242424] bg-opacity-70" >
        {/* <div className="px-32 footer-bg pb-10 " > */}
        <div className="px-32 " >
          <div
            className="  border-b-2 border-gray-800 h-1/3 flex flex-row justify-center "
            style={{ alignItems: 'center' }}
          >
            <p className=" my-8">
              <a href='https://goplinto.com/privacy-policy' target='_blank'>
                Privacy Policy
              </a>
            </p>
            <BsDot className="mx-4 my-8 " color={'gray'} size={20} />
            <p className=" my-8 ">
              <a href='https://goplinto.com/refund-policy' target='_blank'>
                Return & Refunds
              </a>
            </p>

            {/* <BsDot className="mx-4 my-8" color={'gray'} size={20} />
            <p className=" my-8  ">
              <a href='https://goplinto.com/terms-and-condition' target='_blank'>
                Term & conditions
              </a>
            </p> */}
          </div>
          <div className=" h-1/3 mt-10 flex  justify-center  align-center">
            <a className='block' href='https://goplinto.com/' target={'_blank'}>
              <p className=" flex justify-center mx-auto">
                Online Store Created Using
              </p>

              <div className="flex justify-center mx-auto">
                <img
                  src={
                    '/img/goplinto_logo.png'
                  }
                  alt="Picture of the author"
                  className="w-1/4 my-2 mr-16 md:mr-8 lg:mr-8"
                />
              </div>
            </a>
          </div>
        </div>
        <div className='px-2 md:px-6 w-full flex flex-row items-start justify-between mt-9  md:pb-0 space-x-1 md:space-x-4 '>
          <div className={`w-full basis-2/12 flex-grow flex flex-col flex-auto justify-center pb-10 space-y-3 items-center`} >
            <p className='inline-block w-full text-center  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Cloud Hosted on'}</p>
            <div className={`w-full flex flex-row justify-between items-start max-h-8 `}>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/aws dark mode copy@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/Azure web services copy@2x.png'} className='w-full h-full object-contain' />
              </div>
            </div>
          </div>
          <div className={`w-full basis-3/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3 divide-x-2`} >
            <p className='w-full text-center  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Secured Payments with'}</p>
            <div className={`w-full flex flex-row justify-between items-start px-2 border-[#212B3680]`}>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/pci-compliant.f0aea468@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/ssl-final@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/https (1)@2x.png'} className='w-full h-full object-contain' />
              </div>
            </div>
          </div>
          <div className={`w-full basis-7/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3 divide-x-2`} >
            <p className='w-full text-center  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Secured Payments with'}</p>
            <div className={`w-full flex flex-row justify-between items-baseline px-2 border-[#212B3680]`}>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/amex@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/master card@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/visa copy@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/upi@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/paytm@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/pe copy 2@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/google pay copy@2x.png'} className='w-full h-full object-contain' />
              </div>
              <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
                <img src={'/static/images/& more.svg'} className='w-full h-full object-contain' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default index
