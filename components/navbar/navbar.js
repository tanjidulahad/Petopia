import Link from "@components/link"
import { connect } from 'react-redux';
import { IoCartOutline } from 'react-icons/io5';
import { BsChevronDown } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import { Button, Input } from '@components/inputs';
import headerImg from './header-background.jpg'
// Actions
import { authShowToggle } from '@redux/user/user-action'
import { logOutStart } from '@redux/user/user-action'
import {
  getShopInfoStart, getShopSeoStart, getShopSettingsStart, getSocialProfileStart, getShopDisplaySettingsStart
} from "@redux/shop/shop-action";
import { contactPopup, logOut } from "@redux/UI/ui-action";
import Contact from "@components/contact/contact"


const Navbar = ({ user, cart, contactPopup, isContactOpen, displaySettings, openAuth, logOut, getShopInfo, getShopSeo, getShopSettings, getSocialProfile, getShopDisplaySettings, searchHandler, info, ref }) => {
  const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
  const [isLogin, setIsLogin] = useState(false)
  const [mobNaveHeight, setMobNaveHeight] = useState(10)
  const [searchInput, setSearchInput] = useState(null);

  // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID
  const storeId = info.store_id;
  const [query, setQuery] = useState('')
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 640 })
  useEffect(() => {
    setSearchInput(document.getElementById('search-input') || null)
    // const handleScroll = () => {
    //   const position = window.pageYOffset;
    //   setScrollPosition(position);
    // };
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };

  }, [])
  useEffect(() => {
    setIsLogin(!!user)
  }, [user])

  // const onInputChangeHandler = (e) => {
  //   setQuery(e.target.value)
  //   if (!searchHandler) {
  //     router.push(`/`);
  //   }
  //   searchHandler(e) // This handler function comming from PLP page via redux
  // }

  return (
    <>
      <nav className='sm:sticky top-0 ' ref={ref} style={{ backgroundImage: ` url("${headerImg.src}")` }}>
        <div id='big-navbar' className={(router.pathname == "/[name]/[storeId]" || ['search', 'category'].some(val => router.asPath.includes(val))) ||
          isDesktopOrLaptop ?
          ` navbar-body pt-8 pb-10 sm:pt-4 sm:pb-8 relative nav-bg nav-color transition-all duration-500 ${!searchInput && isDesktopOrLaptop ? 'pt-[8px!important] pb-[6px!important]' : ''}`
          : 'hidden'
        } >
          <div className='flex justify-center sm:justify-between wrapper sm:space-x-2'>
            <Button className='text-left' type='link' href='/'>
              <div className='flex flex-col justify-center sm:flex-row items-center sm:space-x-6'>
                <div className='h-20 w-20 shrink-0 flex items-center justify-center overflow-hidden rounded-md'>
                  <img className='w-100 h-100 object-contain' src={info.logo_img_url || '/img/default-store.webp'} alt="..." />
                </div>
                <div className=' mt-4 sm:mt-0'>
                  <h1 className='text-xl lg:text-2xl font-extrabold'>{info.store_name}</h1>
                  <div className='mt-3 hidden md:block'>
                    {
                      !!info.address && <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill inline" viewBox="0 0 16 16">
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                        <span className='text-sm lg:text-base font-semibold tracking-tight ml-2 '>
                          {info.address}{info.city && ', ' + info.city}{info.state && ', ' + info.state}{info.country && ', ' + info.country}
                        </span>
                      </>
                    }
                  </div>
                </div>
              </div>
            </Button>
            {/* Navbar for desktop */}
            {
              <MediaQuery minWidth={640}>

                <div className="hidden sm:flex justify-end items-center  ">
                  <Button href="/contact" className='whitespace-nowrap font-bold inline-block tracking-tight mr-2 text-lg' onClick={() => { contactPopup(true) }} >Contact Us</Button>
                  <div>
                    <Button className='flex items-center ' type='link' href='/cart'>
                      <span className='text-lg font-bold tracking-tight md:ml-5 lg:ml-8  mx-2'> Cart </span>
                      <span className="  font-bold  my-4 relative" >
                        <IoCartOutline size={25} />
                        {
                          !!totalItems &&
                          <div className="absolute -top-2 -right-1 w-5 h-5 p-2 flex justify-center items-center text-xs text-center rounded-full btn-bg btn-color border border-white">{totalItems}</div>
                        }
                      </span>
                    </Button>
                  </div>
                  {
                    // !isLogin && !user ?
                    !user ?
                      <div className="w-32 ml-8 shrink-0 flex items-center">
                        <Button onClick={openAuth} className="text-black max-h-min text-base font-medium btn-color btn-bg rounded py-3 px-8 hover:scale-[97%] transition-all  " title="Sign In"></Button>
                      </div>
                      :
                      <div className=" flex relative items-center my-6 ml-8 cursor-pointer account">
                        <div className="mt-2 w-10 h-10 bg-gray-100 text-gray-400 overflow-hidden flex justify-center items-center rounded-full">
                          {user?.profile_pic ?
                            <img src={user?.profile_pic} className='w-full h-full object-cover' />
                            :
                            <span className='text-sm font-extrabold	' >{
                              (() => {
                                const name = user.full_name.split(' ')
                                if (name.length) {
                                  if (name.length > 1) {
                                    return `${name[0][0]}${name[name.length - 1][0]}`.toUpperCase()
                                  }
                                  return `${name[0][0]}${name[0][1]}`.toUpperCase()
                                }
                                return 'A'
                              })()
                            }</span>
                          }
                        </div>
                        <div className='flex '>
                          <span className='block min-w-max text-lg font-bold tracking-tight  mt-2  ml-2 mr-2'> My Account</span>
                          <BsChevronDown className="mt-2" size={25} />
                        </div>

                        <div className='absolute w-full hidden account-options top-full z-10' >
                          <div className='p-6 mt-6 bg-white w-full rounded account-options-c' style={{ boxShadow: "0px 4px 8px #2424243F" }}>
                            <ul className='list-none black-color-75 text-base font-medium space-y-6'>
                              <li className='btn-hover-color'>
                                <Link href="/account">
                                  <a >Account</a>
                                </Link>
                              </li>
                              <li className='btn-hover-color'>
                                <Link href="/account/myorders">
                                  <a >My Orders</a>
                                </Link>
                              </li>
                              <li className='btn-hover-color'>
                                <Link href="/account/savedplaces">
                                  <a >Saved Places</a>
                                </Link>
                              </li>
                              <li className='btn-hover-color cursor-pointer' onClick={() => { logOut(); setIsLogin(false) }}>
                                <span className=''>Log Out</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                  }
                  {/* <DynamicComponent user={user} /> */}
                </div>
              </MediaQuery>
            }
          </div>
          {/* 
        {
          (router.pathname == "/[name]/[storeId]" || ['search', 'category'].some(val => Object.keys((router.query)).includes(val))) &&
          <div className='px-6 text-base absolute -bottom-4 left-1/2 -translate-x-1/2 w-full ' style={{ maxWidth: '800px' }}>
            <Input className='py-2' placeholder='Search for items' onChange={onInputChangeHandler} ></Input>
          </div>
        } */}
        </div>


        {
          // ((router.asPath != '/') && !isDesktopOrLaptop) &&
          // <div className='w-full flex justify-between items-center p-4 bg-black-color-lighter sticky top-0'>
          //   <Button className='flex items-center black-color-75' onClick={router.back}>
          //     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          //       <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          //     </svg>
          //   </Button>
          // </div>
        }
        {/* Navbar for mobile */}
        <MediaQuery maxWidth={640}>
          <div id='mob-navbar' className="mob-navbar z-10 py-2 flex sm:justify-end items-center  justify-between w-full fixed sm:relative bottom-0 left-0 right-0 bg-white sm:bg-transparent " style={{ boxShadow: '0px -1px 4px #00000033' }}>
            <div className='text-black w-1/5'>
              <Button type='link' href='/' className={`block sm:hidden text-center text-xs ${router.asPath == '/' || router.pathname == '/[name]/[storeId]' && 'btn-nav-color-active'}`}>
                <svg className='mx-auto' id="home" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ fill: 'inherit', color: 'inherit' }} viewBox="0 0 24 24">
                  <path className="bottom-nav-icons" id="Path_3440" data-name="Path 3440" d="M12,5.69l5,4.5V18H15V12H9v6H7V10.19l5-4.5M12,3,2,12H5v8h6V14h2v6h6V12h3Z" fill="var(--color)">
                  </path>
                </svg>
                <span>Home</span>
              </Button>
            </div>
            <div className='text-center text-xs font-medium text-black w-1/5'>
              <Button className={`btn-nav-color relative ${router.asPath.includes('cart') && 'btn-nav-color-active'}`} type='link' href='/cart'>
                <svg className='mx-auto' id="cart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-3 -5 30 30">
                  <g id="Group_103" data-name="Group 103">
                    <path className="bottom-nav-icons" id="Path_2479" data-name="Path 2479" d="M18.454,14.069a2.431,2.431,0,0,0,2.1-1.13l4.294-7.121A1.1,1.1,0,0,0,23.8,4.194H6.05L4.923,2H1V4.194H3.4l4.318,8.328L6.1,15.2a2.207,2.207,0,0,0,2.1,3.259H22.592V16.264H8.2l1.32-2.194ZM7.19,6.389H21.764l-3.311,5.486H10.033Z" transform="translate(-1 -2)" ></path><path className="bottom-nav-icons" id="Path_2480" data-name="Path 2480" d="M8.012,18a3.017,3.017,0,1,0,3.017,3.017A3.013,3.013,0,0,0,8.012,18Z" transform="translate(-0.508 -0.034)" ></path><path className="bottom-nav-icons" id="Path_2481" data-name="Path 2481" d="M18.012,18a3.017,3.017,0,1,0,3.017,3.017A3.013,3.013,0,0,0,18.012,18Z" transform="translate(-0.056 -0.034)" ></path></g></svg>
                <span className=' text-xs font-medium tracking-tight '>Cart</span>
                {
                  !!totalItems &&
                  <div className="absolute -top-1 -right-1 w-5 h-5  flex justify-center items-center text-xxs text-center rounded-full btn-bg btn-color border ">{totalItems}</div>
                }
              </Button>
            </div>
            {
              !!info.whatsapp_number &&
              <div className='text-center text-xs font-semibold text-black w-1/5'>
                <a href={`https://wa.me/${info.whatsapp_number}`} target='_blank' className='block btn-nav-color '>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className=" mx-auto" width="24" height="24" viewBox="0 0 1219.547 1225.016">
                    <path fill="#E0E0E0" d="M1041.858 178.02C927.206 63.289 774.753.07 612.325 0 277.617 0 5.232 272.298 5.098 606.991c-.039 106.986 27.915 211.42 81.048 303.476L0 1225.016l321.898-84.406c88.689 48.368 188.547 73.855 290.166 73.896h.258.003c334.654 0 607.08-272.346 607.222-607.023.056-162.208-63.052-314.724-177.689-429.463zm-429.533 933.963h-.197c-90.578-.048-179.402-24.366-256.878-70.339l-18.438-10.93-191.021 50.083 51-186.176-12.013-19.087c-50.525-80.336-77.198-173.175-77.16-268.504.111-278.186 226.507-504.503 504.898-504.503 134.812.056 261.519 52.604 356.814 147.965 95.289 95.36 147.728 222.128 147.688 356.948-.118 278.195-226.522 504.543-504.693 504.543z" />
                    <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="609.77" y1="1190.114" x2="609.77" y2="21.084">
                      <stop offset="0" stopColor="#20b038" /><stop offset="1" stopColor="#60d66a" />
                    </linearGradient>
                    <path fill="url(#a)" d="M27.875 1190.114l82.211-300.18c-50.719-87.852-77.391-187.523-77.359-289.602.133-319.398 260.078-579.25 579.469-579.25 155.016.07 300.508 60.398 409.898 169.891 109.414 109.492 169.633 255.031 169.57 409.812-.133 319.406-260.094 579.281-579.445 579.281-.023 0 .016 0 0 0h-.258c-96.977-.031-192.266-24.375-276.898-70.5l-307.188 80.548z" />
                    <image overflow="visible" opacity=".08" width="682" height="639" xlinkHref="FCC0802E2AF8A915.png" transform="translate(270.984 291.372)" />
                    <path fillRule="evenodd" clipRule="evenodd" fill="#FFF" d="M462.273 349.294c-11.234-24.977-23.062-25.477-33.75-25.914-8.742-.375-18.75-.352-28.742-.352-10 0-26.25 3.758-39.992 18.766-13.75 15.008-52.5 51.289-52.5 125.078 0 73.797 53.75 145.102 61.242 155.117 7.5 10 103.758 166.266 256.203 226.383 126.695 49.961 152.477 40.023 179.977 37.523s88.734-36.273 101.234-71.297c12.5-35.016 12.5-65.031 8.75-71.305-3.75-6.25-13.75-10-28.75-17.5s-88.734-43.789-102.484-48.789-23.75-7.5-33.75 7.516c-10 15-38.727 48.773-47.477 58.773-8.75 10.023-17.5 11.273-32.5 3.773-15-7.523-63.305-23.344-120.609-74.438-44.586-39.75-74.688-88.844-83.438-103.859-8.75-15-.938-23.125 6.586-30.602 6.734-6.719 15-17.508 22.5-26.266 7.484-8.758 9.984-15.008 14.984-25.008 5-10.016 2.5-18.773-1.25-26.273s-32.898-81.67-46.234-111.326z" /><path fill="#FFF" d="M1036.898 176.091C923.562 62.677 772.859.185 612.297.114 281.43.114 12.172 269.286 12.039 600.137 12 705.896 39.633 809.13 92.156 900.13L7 1211.067l318.203-83.438c87.672 47.812 186.383 73.008 286.836 73.047h.255.003c330.812 0 600.109-269.219 600.25-600.055.055-160.343-62.328-311.108-175.649-424.53zm-424.601 923.242h-.195c-89.539-.047-177.344-24.086-253.93-69.531l-18.227-10.805-188.828 49.508 50.414-184.039-11.875-18.867c-49.945-79.414-76.312-171.188-76.273-265.422.109-274.992 223.906-498.711 499.102-498.711 133.266.055 258.516 52 352.719 146.266 94.195 94.266 146.031 219.578 145.992 352.852-.118 274.999-223.923 498.749-498.899 498.749z" />
                  </svg>
                  <span className='mx-auto text-xs font-medium tracking-tight'>Chat</span>
                </a>
              </div>
            }
            <div className='text-center text-xs font-semibold text-black w-1/5'>
              <Button className={`btn-nav-color ${router.asPath.includes('contact') && 'btn-nav-color-active'}`} type="link" href='/contact'>
                <svg className='bottom-nav-icons mx-auto' style={{ fill: 'inherit', color: 'inherit' }} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"
                  width="25px" height="25px">
                  <g>
                    <rect fill="none" height="24" width="24"></rect>
                  </g><g><g>
                    <path
                      d="M21,12.22C21,6.73,16.74,3,12,3c-4.69,0-9,3.65-9,9.28C2.4,12.62,2,13.26,2,14v2c0,1.1,0.9,2,2,2h1v-6.1 c0-3.87,3.13-7,7-7s7,3.13,7,7V19h-8v2h8c1.1,0,2-0.9,2-2v-1.22c0.59-0.31,1-0.92,1-1.64v-2.3C22,13.14,21.59,12.53,21,12.22z">
                    </path>
                    <circle cx="9" cy="13" r="1"></circle>
                    <circle cx="15" cy="13" r="1"></circle>
                    <path
                      d="M18,11.03C17.52,8.18,15.04,6,12.05,6c-3.03,0-6.29,2.51-6.03,6.45c2.47-1.01,4.33-3.21,4.86-5.89 C12.19,9.19,14.88,11,18,11.03z">
                    </path>
                  </g>
                  </g>
                </svg>
                <span className=' text-xs font-medium tracking-tight'>Contact</span>
              </Button>
            </div>

            <div className='block sm:hidden text-black text-center text-xs font-semibold  w-1/5'>
              <Button className={`btn-nav-color ${router.asPath.includes('account') && 'btn-nav-color-active'}`} {...user ? { type: 'link', href: '/account' } : { onClick: () => openAuth() }}>
                <svg className='mx-auto' id="account" xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ fill: 'inherit', color: 'inherit' }} viewBox="0 0 24 24">
                  <path id="Path_3437" data-name="Path 3437" d="M0,0H24V24H0Z" fill="none"></path>
                  <path className="bottom-nav-icons" id="Path_3438" data-name="Path 3438"
                    d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM7.07,18.28c.43-.9,3.05-1.78,4.93-1.78s4.51.88,4.93,1.78a7.925,7.925,0,0,1-9.86,0Zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36,2.33a8,8,0,1,1,12.72,0ZM12,6a3.5,3.5,0,1,0,3.5,3.5A3.491,3.491,0,0,0,12,6Zm0,5a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,11Z"
                  ></path>
                </svg>
                <span className=' text-xs font-medium tracking-tight'>Profile</span>
              </Button>
            </div>
          </div>
        </MediaQuery>
      </nav >
      {
        isContactOpen &&
        <div className="fixed inset-0 bg-gray-500 z-50 bg-opacity-90 p-2 sm:p-4 md:p-8 z-10000">
          <div className="w-full h-full rounded-md md:16 lg:px24 xl:px-32 overflow-y-auto">
            <Contact close={contactPopup} />
          </div>
        </div>
      }
      {
        info.whatsapp_number &&
        <a href={`https://wa.me/` + info.whatsapp_number} target='_blank' className=" sm:flex items-center fixed right-9 bottom-9 bg-[#0D9F16] py-3 px-6 rounded-full z-50 hidden text-white space-x-4">
          <span className=" text-lg ">Chat With Us.!</span>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
            <g>
              <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                <path
                  d="M4627.1,4995.6c-1900-174.9-3532.4-1474.7-4118.9-3278.7C343.5,1209.4,285.2,821.8,285.2,232c0-829.9,130.3-1395.8,480.1-2112.6l185.2-384.1L521.9-3523.4C285.2-4216.2,96.6-4788.9,100-4795.8c6.9-3.4,600.2,178.3,1320.4,404.7l1310.1,415l267.5-120c757.9-346.4,1244.9-452.7,2068-452.7c435.5,0,682.5,17.1,902,58.3c2020,401.3,3539.3,1941.1,3878.8,3930.3c68.6,404.7,72,1121.5,3.4,1529.6C9695.9,1936.4,9260.3,2811,8588.2,3514c-387.5,404.7-785.4,703.1-1258.7,950C6506.4,4892.7,5542.7,5081.3,4627.1,4995.6z M6029.7,4131.4c819.6-212.6,1440.4-572.7,1999.4-1155.8C9541.6,1391.1,9497-1095.3,7926.3-2624.8c-552.2-535-1107.8-847.1-1900-1056.3c-332.7-89.2-1145.4-123.5-1546.7-68.6c-384.1,54.9-936.3,243.5-1323.8,449.3l-315.5,168l-757.9-236.6c-418.4-133.8-764.8-240.1-771.6-240.1c-10.3,0,99.5,332.7,236.6,737.4l253.8,740.8l-120,178.3c-277.8,411.5-507.6,987.7-596.7,1498.7c-58.3,336.1-58.3,1011.7,0,1337.5c305.2,1721.6,1670.2,3048.9,3419.3,3326.7C4870.5,4265.1,5659.3,4227.4,6029.7,4131.4z" fill="#fff" />
                <path
                  d="M3142.1,2269.1c-226.4-216.1-370.4-511-397.8-826.5c-37.7-466.4,126.9-877.9,603.6-1512.4c716.8-950,1313.5-1402.7,2325.2-1759.4c363.5-130.3,439-147.5,730.5-147.5c291.5-3.4,346.4,6.9,528.2,96c397.8,195.5,603.6,497.3,603.6,884.9v130.3l-552.1,274.4c-305.2,150.9-579.6,274.4-613.9,274.4s-113.2-65.2-174.9-144.1c-181.8-240.1-418.4-473.3-476.7-473.3c-99.4,0-661.9,294.9-881.4,459.5c-116.6,89.2-291.5,246.9-391,353.3c-212.6,236.6-476.7,620.7-476.7,699.6c0,30.9,61.7,133.8,140.6,222.9c75.4,92.6,168,226.4,205.8,298.4l68.6,126.9l-102.9,233.2c-54.9,126.9-157.8,370.4-226.4,538.4c-171.5,421.8-181.8,428.7-487,428.7h-253.8L3142.1,2269.1z" fill="#fff" />
              </g>
            </g>
          </svg>
        </a>
      }
    </>
  )
}

const mapStateToProps = state => ({
  user: state.user.currentUser,
  cart: state.cart,
  info: state.store.info,
  displaySettings: state.store.displaySettings,
  // Search handler from plp
  searchHandler: state.search.searchHandler,
  isContactOpen: state.ui.isContactOpen
})

const mapDispatchToProps = dispatch => ({
  openAuth: () => dispatch(authShowToggle()),
  // logOut: () => dispatch(logOutStart()),
  logOut: () => dispatch(logOut()),
  getShopInfo: (shopId) => dispatch(getShopInfoStart(shopId)),
  getShopSeo: (shopId) => dispatch(getShopSeoStart(shopId)),
  getShopSettings: (shopId) => dispatch(getShopSettingsStart(shopId)),
  getSocialProfile: (shopId) => dispatch(getSocialProfileStart(shopId)),
  getShopDisplaySettings: (storeId) => dispatch(getShopDisplaySettingsStart(storeId)),
  contactPopup: (nothing) => dispatch(contactPopup())
})
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
