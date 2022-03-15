import headerImg from './header-background.jpg'
import Logo from '../../Assets/Image/logo.png'
import { IoCartOutline } from 'react-icons/io5';
import { BsChevronDown } from 'react-icons/bs'
import { useState } from 'react';
import { Button } from '../inputs';
const Navbar = () => {
  const [login, setlogin] = useState(false)
  return (
    <nav className='sticky top-0 z-10 '>
      <div className='navbar-body py-6' style={{ backgroundImage: ` url("${headerImg.src}")`, background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)) 0% 0% / cover,' }}>
        <div className='flex justify-between wrapper'>
          <Button className='text-left' type='link' href='/'>
            <div className='flex flex-row items-center space-x-6'>
              <div className='h-20 w-20'>
                <img className='w-100 h-100 object-contain' src='/logo.png' alt="..." />
              </div>
              <div className='white-color'>
                <h1 className='text-2xl font-extrabold'>Pizzeria</h1>
                <div className='mt-3'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill inline" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <span className='text-base font-semibold tracking-tight ml-2 '>No. 9, 11th Cross St, Indira Nagar, Adyar, Chennai, Tamil Nadu 600020.</span>
                  </span>
                </div>
              </div>
            </div>
          </Button>
          <div className="flex justify-end items-center white-color  ">
            <span className='font-bold inline-block tracking-tight my-8 mr-2 text-lg'>Contact Us</span>
            <div>
              <Button className='flex items-center white-color' type='link' href='/cart'>
                <span className='text-lg font-bold tracking-tight ml-8 white-color mx-4'> Cart </span>
                <span className=" white-color font-bold  my-4" >
                  <IoCartOutline size={25} />
                </span>
              </Button>
            </div>
            {
              login ? <span className="flex white-color my-6 ml-8 cursor-pointer">
                <span className=" mt-2 w-8 h-8 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white">
                  <img src="http://source.unsplash.com/100x100/?girl" className="rounded-full" />
                </span>
                <span className='  white-color text-lg font-bold tracking-tight  mt-2  mx-4'> My Account</span>
                <BsChevronDown className="mt-2" size={25} />
              </span> :
                <div className="w-32 ml-8 shrink-0 flex items-center">
                  <Button onClick={() => { setlogin(!login) }} className=" bg-white text-black max-h-min text-base font-medium rounded py-3 px-8 hover:bg-rose-600 hover:text-white " title="Sign In"></Button>
                </div>
            }
          </div>
        </div>


      </div>
    </nav>
  )
}

export default Navbar;