import { useEffect, useState } from 'react'
import Link from '@components/link'
import contact from '@components/contact/contact'
import { BsDot } from 'react-icons/bs'
import { connect } from 'react-redux'
import { contactPopup } from '@redux/UI/ui-action'
function footer({ storeSettings, info, socialProfile, contactPopup }) {
  const [mobNavHeight, setMobNavHeight] = useState(0)
  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
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
      < div className="hidden sm:block w-full bg-dark-900 px-20 py-10 bg-black bg-opacity-75 space-y-4" >
        <div className='grid grid-cols-12 gap-4'>
          <div className=' col-span-4 space-y-4'>
            <div className='max-w-[232px] max-h-[232px] rounded-md overflow-hidden'>
              <img src={info?.logo_img_url || '/img/default-store.webp'} alt={info?.store_name} />
            </div>
            <p className=" font-medium text-sm">
              {
                info.store_desc
              }
            </p>
            <div className="link-list space-y-3">
              {storeSettings?.is_address_available=="Y"&&<div className='f-link'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>{' '}{info.city}, {info.state}, {info.country}
                </span>
              </div>}
              <div className='f-link'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>{' '}
                  +{info.isd_code_phone_number} {info.primary_phone}</span>
              </div>
            </div>
          </div>
          <div className='col-span-8 flex '>
            <div className="text-left space-y-4 basis-0 grow">
              <h3 className=' font-bold text-lg'>Menu</h3>
              <div className=' space-y-5'>
                <Link href='/'>
                  <a className='block text-sm font-normal'>Shop</a>
                </Link>
                <a href='javascript:void(0)' onClick={contactPopup} className='block text-sm font-normal'>Contact</a>

              </div>
            </div>
            <div className="text-left space-y-4 basis-0 grow">
              <h3 className=' font-bold text-lg'>Account</h3>
              <div className=' space-y-5'>
                <Link href='/account'>
                  <a className='block text-sm font-normal'>My Profile</a>
                </Link>
                <Link href='/cart'>
                  <a className='block text-sm font-normal'>My Cart</a>
                </Link>
                <Link href='/account/myorders'>
                  <a className='block text-sm font-normal'>Orders</a>
                </Link>
                <Link href='/account/savedplaces'>
                  <a className='block text-sm font-normal'>Saved Address</a>
                </Link>

              </div>
            </div>
            {
              !!socialProfile.length &&
              <div className="text-left space-y-4 basis-0 grow">
                <h3 className=' font-bold text-lg'>Social</h3>
                <div className=' space-y-5'>
                  {
                    socialProfile.map((item, i) => (
                      <>
                        {
                          !!item.social_account_link &&
                          <a className='block text-sm font-normal' href={item.social_account_link.includes('http') ? item.social_account_link : 'https://' + item.social_account_link} target="_blank" rel="noopener noreferrer">
                            {capitalize(item.social_account_name, true)}
                          </a>
                        }
                      </>
                    ))
                  }
                </div>
              </div>
            }
            <div className="text-left space-y-4 basis-0 grow">
              <h3 className=' font-bold text-lg'>Other Links</h3>
              <div className=' space-y-5'>
                <a className='block text-sm font-normal' href='https://goplinto.com/refund-policy' target="_blank" rel="noopener noreferrer">Return & Refunds</a>
                <a className='block text-sm font-normal' href='https://goplinto.com/refund-policy' target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
        <a href="http://goplinto.com" target="_blank" rel="noopener noreferrer" className='blank flex flex-col justify-center items-center mt-2 text-sm'>
          <h4><span className=' font-semibold uppercase mb-2 '>powered by</span></h4>
          <div className='h-8 w-fit mt-2 '>
            <img className='h-full' src="/img/goplinto_logo.png" alt="Goplinto" />
          </div>
        </a>
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

const mapStateToProps = state => ({
  info: state.store.info,
  socialProfile: state.store.socialProfile,
  storeSettings: state.store.settings,
})
const mapDispatchToProps = dispatch => ({
  contactPopup: (nothing) => dispatch(contactPopup())
})
export default connect(mapStateToProps, mapDispatchToProps)(footer)


  // < div className = "hidden sm:block w-full bg-dark-900 bg-[#242424] bg-opacity-70" >
  //   {/* <div className="px-32 footer-bg pb-10 " > */ }
  //   < div className = "px-32 " >
  //         <div
  //           className="  border-b-2 border-gray-800 h-1/3 flex flex-row justify-center "
  //           style={{ alignItems: 'center' }}
  //         >
  //           <p className=" my-8">
  //             <a href='https://goplinto.com/privacy-policy' target='_blank'>
  //               Privacy Policy
  //             </a>
  //           </p>
  //           <BsDot className="mx-4 my-8 " color={'gray'} size={20} />
  //           <p className=" my-8 ">
  //             <a href='https://goplinto.com/refund-policy' target='_blank'>
  //               Return & Refunds
  //             </a>
  //           </p>
  //           {/* <BsDot className="mx-4 my-8" color={'gray'} size={20} />
  //           <p className=" my-8  ">
  //             <a href='https://goplinto.com/terms-and-condition' target='_blank'>
  //               Term & conditions
  //             </a>
  //           </p> */}
  //         </div>
  //         <div className=" h-1/3 mt-10 flex  justify-center  align-center">
  //           <a className='block' href='https://goplinto.com/' target={'_blank'}>
  //             <p className=" flex justify-center mx-auto">
  //               POWER
  //             </p>

  //             <div className="flex justify-center mx-auto">
  //               <img
  //                 src={
  //                   '/img/goplinto_logo.png'
  //                 }
  //                 alt="Picture of the author"
  //                 className="w-1/4 my-2 mr-16 md:mr-8 lg:mr-8"
  //               />
  //             </div>
  //           </a>
  //         </div>
  //       </div >
  // <div className='px-2 md:px-6 w-full flex flex-row items-start justify-between mt-9  md:pb-0 space-x-1 md:space-x-4 '>
  //   <div className={`w-full basis-2/12 flex-grow flex flex-col flex-auto justify-center pb-10 space-y-3 items-center`} >
  //     <p className='inline-block w-full text-center  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Cloud Hosted on'}</p>
  //     <div className={`w-full flex flex-row justify-between items-start max-h-8 `}>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/aws dark mode copy@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/Azure web services copy@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //     </div>
  //   </div>
  //   <div className={`w-full basis-3/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3 divide-x-2`} >
  //     <p className='w-full text-center  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Secured Payments with'}</p>
  //     <div className={`w-full flex flex-row justify-between items-start px-2 border-[#212B3680]`}>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/pci-compliant.f0aea468@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/ssl-final@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/https (1)@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //     </div>
  //   </div>
  //   <div className={`w-full basis-7/12 flex-grow flex flex-col flex-auto justify-center items-center space-y-3 divide-x-2`} >
  //     <p className='w-full text-center  mb-2 text-[6px] md:text-sm lg:text-base md:px-2' >{'Secured Payments with'}</p>
  //     <div className={`w-full flex flex-row justify-between items-baseline px-2 border-[#212B3680]`}>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/amex@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/master card@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/visa copy@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/upi@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/paytm@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/pe copy 2@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/google pay copy@2x.png'} className='w-full h-full object-contain' />
  //       </div>
  //       <div className=' h-[12px] md:h-12 w-[12px] md:w-10 lg:w-16'>
  //         <img src={'/static/images/& more.svg'} className='w-full h-full object-contain' />
  //       </div>
  //     </div>
  //   </div>
  // </div>
  //     </div >