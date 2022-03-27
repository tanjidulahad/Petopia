/**
 * 
 * @param {Array} list list of all images, the first image will be default image 
 * @param {String} alt alt is the default alt string for all images
 * @returns Jsx object
 */
import { useState, useEffect } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { useMediaQuery } from 'react-responsive';

const PdpImage = ({ list = [], alt = 'goplinto product image' }) => {

    const [activeImage, setActiveImage] = useState(0)
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 640 })
    const [openSlider, setOpenSlider] = useState(false)
    useEffect(() => {
        console.log(activeImage);
    })

    return (
        <div className="flex justify-start items-start md:space-x-4 pdp-images" >
            <div className=" max-h-full pdp-image-list-c min-w-fit">
                <div className="pdp-image-list hidden sm:flex flex-col max-w-fit space-y-3 md:space-y-4">
                    {
                        [...list].map((item, i) => (
                            <div className="w-20 h-20 overflow-hidden rounded-md cursor-pointer" key={i} onClick={() => setActiveImage(i)}>
                                <img className={`w-full h-full object-cover ${activeImage != i && 'opacity-60'}`} src={item} alt={alt} />
                            </div>
                        ))
                    }
                </div>

            </div>
            <div className="mx-auto pdp-primary-image flex h-full min-h-full items-center justify-center ">
                <div className="w-full h-full overflow-hidden rounded sm:pl-4 md:pl-0">
                    {isDesktopOrLaptop ?
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'product',
                                isFluidWidth: true,
                                src: list[activeImage] || '/img/default.png',
                                width: 1200,
                                height: 1080
                            },
                            largeImage: {
                                src: list[activeImage] || '/img/default.png',
                                width: 600,
                                height: 600
                            },
                            enlargedImageContainerStyle: { background: '#fff', zIndex: 9 }
                        }} />
                        :
                        <>
                            <img className="w-full h-full" src={list[activeImage]} alt={alt} onClick={() => setOpenSlider(true)} />
                            <div className='w-full py-4 flex space-x-2 justify-center'>
                                {
                                    list.map((item, i) => (
                                        <div className={`${i == activeImage && 'active'} border-b-4 w-4 cursor-pointer`} onClick={() => setActiveImage(i)} key={i} />
                                    ))
                                }
                            </div>
                            <div className={`${openSlider ? 'slider-active' : 'slider'} z-10 mob-pdp-image-slider fixed inset-x-0  -bottom-full bg-black-color-75 flex items-end`}>
                                <div className='w-full bg-white pb-16'>
                                    <div className='p-6 w-full black-color cursor-pointer' onClick={() => setOpenSlider(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg ml-auto" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                        </svg>
                                    </div>
                                    <div className='mob-pdp-image-c my-6 w-full flex justify-center items-center overflow-hidden'>
                                        <img className='w-full h-auto object-cover' src={list[activeImage] || '/img/default.png'} alt={alt} />
                                    </div>
                                    <div className='w-full px-4 mb-10'>
                                        <div className='flex overflow-x-auto space-x-6 items-center no-scrollbar'>
                                            {
                                                list.map((item, i) => (
                                                    <div className={`${i == activeImage && 'active'} overflow-hidden h-20 w-20 p-4 flex-shrink-0 border-b-4 cursor-pointer `} onClick={() => setActiveImage(i)} key={i}>
                                                        <img className="w-full h-auto object-contain" src={item} alt={alt} />
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default PdpImage;