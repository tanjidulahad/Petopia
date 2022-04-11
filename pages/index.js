import { BsSearch, BsFillMenuButtonWideFill, BsXLg } from 'react-icons/bs'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from 'react';
import fetcher from "../redux/utility";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Name() {

    const [showModal, setShowModal] = useState(false)
    const [input, setInput] = useState()
    const [stores, setStores] = useState([])
    const router = useRouter()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: [e.target.value] })

        const filter = stores.filter(item =>
            item.store_name.toLowerCase().includes(input?.input)
        )


        if (input.input[0].length <= 1) {
            getStores()
        }
        else {
            setStores(filter)
        }
    }

    useEffect(() => {
        getStores()
    }, [])

    const getStores = async () => {

        const response = await fetcher('GET', '?r=stores/get-sponsored-stores')

        setStores(response.data)

    }


    const solutions = [{ url: '/static/images/art and creaft-1@2x.png', name: 'Restaurants & Fast Food Outlets' }, { url: '/static/images/art and creaft-2@2x.png', name: 'Food Courts' }, { url: '/static/images/art and creaft-3@2x.png', name: 'Supermarket’s, Grocery & Vegetable' }, { url: '/static/images/art and creaft-4@2x.png', name: 'Apparel, Fashion & Lifestyle' }, { url: '/static/images/art and creaft-5@2x.png', name: 'Pharmaceuticals Stores' }, { url: '/static/images/art and creaft-6@2x.png', name: 'Handicrafts & Homemade Goods' }, { url: '/static/images/art and creaft-7@2x.png', name: 'Home Décor & Furnitures' }, { url: '/static/images/art and creaft@2x.png', name: 'Beauty products & Personal care' }]

    const footerData = [
        {
            name: 'Cloud Hosted on',
            urls: ['/static/images/aws dark mode copy@2x.png', '/static/images/Azure web services copy@2x.png']
        },
        {
            name: 'Secured Payments with',
            urls: ['/static/images/pci-compliant.f0aea468@2x.png', '/static/images/ssl-final@2x.png', '/static/images/https (1)@2x.png']
        },
        {
            name: 'Payments accepted via',
            urls: ['/static/images/visa copy@2x.png', '/static/images/master card@2x.png', '/static/images/amex@2x.png', '/static/images/upi@2x.png', '/static/images/paytm@2x.png', '/static/images/pe copy 2@2x.png', '/static/images/google pay copy@2x.png', '/static/images/& more.svg']
        }
    ]

    let settings = {
        infinite: false,
        speed: 1000,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        // prevArrow: <ArrowLeft />,
        // nextArrow: <ArrowRight />,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2
                }
            },

        ]
    }

    // const ArrowLeft = (props) => (
    //     <button
    //         {...props}
    //         className={'prev'} />
    // );
    // const ArrowRight = (props) => (
    //     <button
    //         {...props}
    //         className={'next'} />
    // );

    const handleModal = () => {
        setShowModal(!showModal)
    }

    return (
        <div className="flex flex-col bg-white">

            {/* modal for mobile view */}

            {showModal ?
                <div className='lg:hidden md:hidden bg-white fixed h-[100vh] w-72  right-0 p-2' style={{ zIndex: 1111 }}>
                    <BsXLg style={{ color: 'black', fontSize: '24px', textAlign: 'right' }} className='w-full mt-4 ml-24' onClick={handleModal} />
                    <div className='flex flex-col mt-16'>
                        <p className='text-[#6E335F] border-b border-slate-200 text-lg pb-4 pl-3 cursor-pointer '>Contact Us</p>
                        <p className='text-[#6E335F] border-b border-slate-200 text-lg pb-4 pl-3 cursor-pointer'>About</p>
                    </div>
                    <div className='flex flex-wrap mt-[56vh] text-montRegular text-sm' style={{ bottom: 0 }}>
                        <div className='flex flex-col w-1/2'>
                            <p>Cloud Hosted on</p>
                            <div className='flex items-center justify-center '>
                                <img src='/static/mobile/aws.png' width={30} />
                                <img src='/static/images/Azure web services copy@2x.png' width={30} />
                            </div>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <p>Secured Payments</p>
                            <div className='flex items-center justify-center '>
                                <img src='/static/images/pci-compliant.f0aea468@2x.png' width={50} style={{ height: '30px' }} />
                                <img src='/static/images/ssl-final@2x.png' width={50} style={{ height: '30px' }} />
                                <img src='/static/images/https (1)@2x.png' width={50} style={{ height: '30px' }} />
                            </div>
                        </div>
                        <div className='flex flex-col w-full mt-4 items-center border-t border-slate-400'>
                            <p className='mb-2'>Payments Accepted Via</p>
                            <div className='flex items-center justify-center '>
                                <img src='/static/mobile/visa copy.png' width={30} style={{ height: '20px' }} />
                                <img src='/static/mobile/master card@2x.png' width={50} style={{ height: '20px' }} />
                                <img src='/static/mobile/amex@2x.png' width={30} style={{ height: '20px' }} />
                                <img src='/static/mobile/upi@2x.png' width={30} style={{ height: '20px' }} />
                                <img src='/static/mobile/paytm@2x.png' width={30} style={{ height: '20px' }} />
                                <img src='/static/mobile/pe copy 2@2x.png' width={30} style={{ height: '20px' }} />
                                <img src='/static/mobile/google pay copy@2x.png' width={50} style={{ height: '20px' }} />
                                <img src='/static/mobile/& more.svg' width={30} style={{ height: '20px' }} />

                            </div>
                        </div>

                    </div>


                </div> : ''}

            <header className="p-5 fixed lg:relative w-full md:relative lg:h-40 md:h-48 root-header" style={{ backgroundImage: "url('https://dsa0i94r8ef09.cloudfront.net/widgets/header-background.jpg')", zIndex: 1000 }}>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between lg:w-full md:w-full w-[90vw] ">
                            <div className='flex flex-row'>
                                <img src="/static/profileLogos/goplinto_logo.png" className="mb-3 hidden lg:block" width={120} />
                                <img src="/static/profileLogos/goplinto_logo.png" className="mb-3 lg:hidden" width={133} />
                                <p className="text-white border border-white rounded-xl cursor-pointer p-1 ml-3 lg:text-[10px] lg:h-6 md:h-6 h-8 hover:bg-white hover:text-[#4A0037CC]" onClick={() => window.location.replace('https://www.goplinto.com/')}>Visit Now</p>
                            </div>
                            <div className='lg:hidden md:hidden'>
                                <BsFillMenuButtonWideFill style={{ color: 'white', fontSize: '24px', cursor: 'pointer' }} onClick={handleModal} />
                            </div>
                        </div>
                        <p className="font-bold text-xl text-white leading-9">Bring Your Shop Online,</p>
                        <p className="font-medium text-white text-lg leading-9">Keep your store open 24/7</p>
                    </div>
                    <div className='hidden lg:flex md:flex items-center justify-evenly text-white  lg:w-1/4 md:w-1/4'>
                        <button className='border border-white w-28 p-1 hover:bg-white hover:text-[#4A0037CC]'>About</button>
                        <button className='border border-white w-28 p-1 ml-5 hover:bg-white hover:text-[#4A0037CC]'>Contact us</button>
                    </div>
                </div>
                <div className=" flex justify-center items-center">
                    <div className="bg-white border rounded p-3 flex flex-row items-center w-full lg:w-1/2  md:w-1/2" >
                        <BsSearch className="text-lg mr-2" style={{ color: 'grey' }} />
                        <input type="text" placeholder="Search for a shop" name="input" value='' className="w-full bg-white text-black oulined-none" onChange={handleChange} autoComplete="off" />
                    </div>
                </div>
            </header>
            <main className="mt-56 lg:mt-16 md:mt-16">
                <div className="flex flex-col items-center p-5 lg:block md:block lg:px-24 md:px-24">
                    <p className="text-black font-bold text-xl mb-3 lg:ml-3 md:ml-3 lg:mb-3 md:mb-3">Featured Shops</p>
                    <div className="flex flex-row flex-wrap justify-between lg:justify-start lg:ml-3">
                        {stores.map((store, index) => {
                            return (
                                <div className="flex flex-col pt-2 w-1/2 lg:w-1/4 md:w-1/4 items-center lg:items-start md:items-start max-h-60 min-h-36 " key={index}>
                                    <div className='flex items-start '>
                                        <img src={store?.logo_img_url} className="min-h-28 max-h-28" />
                                    </div>
                                    <p className="text-lg font-semibold mt-4">{store.store_name}</p>
                                    <p className="text-gray-300 text-sm w-44" style={{ fontSize: '12px' }}>{store.store_desc}.<span className='lg:hidden md:hidden'> Visit now</span></p>
                                    <button className='hidden lg:block md:block bg-[#4A0037CC] text-white border border-[#4A0037CC] hover:bg-white hover:text-[#4A0037CC] cursor-pointer p-1 rounded-lg pl-2 pr-2 ml-12 text-sm mt-2'>Visit Store</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="p-5 lg:flex lg:flex-col lg:px-24 md:flex md:flex-col md:px-24">
                    <div className='flex items-center justify-center'>
                        <img src="/static/images/banner2@2x.png" className="lg:w-1/2 mb-3" />
                    </div>
                    <p className="hidden lg:block font-bold text-lg">Boost Your Business</p>
                    <p className="text-black text-lg font-semibold">Create Your Own Mobile App & Website For Your Shop In Just Few Minutes.</p>
                    <button className="hidden lg:block md:block hover:bg-[#4A0037CC] text-white bg-[#4A0037CC] hover:bg-white border border-[#4A0037CC] hover:text-[#4A0037CC] w-48 p-2 py-3  rounded cursor-pointer" style={{ fontSize: '12px' }}>Create Your Free Store Now</button>
                </div>
                <div className="bg-[#FFC35CCC] p-5 lg:px-24 md:px-24">
                    <p className="font-semibold text-lg mb-3">Customize Your Website With Ready Made Templates</p>
                    <div>
                        <Slider
                            {...settings}>
                            <img src="/img/c1.png" className='ml-3 w-1/5 rounded pr-4 grow' />
                            <img src="/img/c2.png" className='ml-3 w-1/5 rounded pr-4 grow' />
                            <img src="/img/c3.png" className='ml-3 w-1/5 rounded pr-4 grow' />
                            <img src="/img/c2.png" className='ml-3 w-1/5 rounded pr-4 grow' />
                        </Slider>
                    </div>
                </div>
                <div className="p-5 mb-24 lg:m-24 md:m-24 lg:border-4 md:border-4 lg:border-dashed md:border-dashed border-[#4A0037CC] rounded-xl lg:h-[80vh] md:h-[80vh] lg:mb-56 md:mb-56">
                    <p className="text-lg font-bold leading-10">Our Solutions</p>
                    <div className='flex flex-row justify-between flex-wrap p-0 bg-white'>
                        {solutions.map((item, index) =>
                            <>
                                <div className='hidden lg:flex flex-col w-1/2 lg:w-1/4 md:w-1/4 ' key={index}>
                                    <img src={item.url} className="grow" />
                                    <p className="font-semibold text-sm text-[#4A0037CC] text-center">{item.name}</p>
                                </div>
                                <div className='lg:hidden md:hidden flex flex-col w-1/2 lg:w-1/4 md:w-1/4'>
                                    <img src={item.url} className="" />
                                    <p className="font-semibold text-sm text-[#4A0037CC] text-center">{item.name}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>



            {/* footer for web */}
            <footer className='hidden lg:block md:block bg-black lg:mt-48'>
                <div className='flex justify-center text-[#FFFFFF] gap-24 mt-5'>
                    <ul className="list-disc flex gap-24">
                        <li>Privacy Policy</li>
                        <li>Return & Refunds</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
                <div className="flex flex-col mt-4 items-center">
                    <p className="text-white leading-10">Create you own store for free on <span className='text-[#FD5391]'>goplinto.com</span></p>
                    <img src="/static/profileLogos/goplinto_logo.png" width={150} />
                </div>
                <div className='w-full flex flex-row items-center justify-between mb-5 mt-8 '>
                    {footerData.map((item, index) => {
                        return (
                            <div className={`flex flex-col items-center
                             ${item.name == 'Payments accepted via' ? 'w-1/2 ' : 'w-48'
                                } `} key={index}>
                                <p className='text-center text-[#FFFFFFB3] mb-3'>{item.name}</p>
                                <div className={`flex flex-row justify-between max-h-8 ${item.name == 'Secured Payments with' ? '' : ''} ${item.name == 'Payments accepted via' ? 'border-x-3 border-white w-1/2' : ''} `}>
                                    {item.urls.map(url =>
                                        <img src={url} width={item.name == 'Secured Payments with' ? 100 : 40} />
                                    )}

                                </div>

                            </div>
                        )
                    })}
                </div>
            </footer>

            {/* footer for mobile */}
            <footer className='lg:hidden md:hidden' style={{ zIndex: 10000 }}>
                <div className="flex flex-row justify-between items-baseline p-5 border border-x-slate-300 border-t-2 fixed bottom-0 bg-white w-full">
                    <p className="text-[#4A0037CC] font-semibold w-1/2 " style={{ fontSize: '3.7vw' }}>Boost Your Business</p>
                    <button className="hover:bg-[#4A0037CC] bg-white hover:text-white border border-[#4A0037CC] text-[#4A0037CC] w-1/2 p-2 py-3  rounded cursor-pointer" style={{ fontSize: '12px' }}>Create Your Free Store Now</button>
                </div>
            </footer>
        </div>
    )
}