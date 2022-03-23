/**
 * 
 * @param {Array} list list of all images, the first image will be default image 
 * @param {String} alt alt is the default alt string for all images
 * @returns Jsx object
 */
import { useState, useEffect } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { useMediaQuery } from 'react-responsive';

const TailwindSlider = () => (
    <div id="carouselExampleIndicators" class="carousel slide relative" data-bs-ride="carousel">
        <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
            ></button>
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
            ></button>
            <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
            ></button>
        </div>
        <div class="carousel-inner relative w-full overflow-hidden">
            <div class="carousel-item active float-left w-full">
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
                    class="block w-full"
                    alt="Wild Landscape"
                />
            </div>
            <div class="carousel-item float-left w-full">
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
                    class="block w-full"
                    alt="Camera"
                />
            </div>
            <div class="carousel-item float-left w-full">
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
                    class="block w-full"
                    alt="Exotic Fruits"
                />
            </div>
        </div>
        <button
            class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button
            class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
        >
            <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
)

const PdpImage = ({ list = [], alt = 'goplinto product image' }) => {

    const [activeImage, setActiveImage] = useState(0)
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 640 })
    const [openSlider, setOpenSlider] = useState(false)

    return (
        <div className="flex justify-start items-start md:space-x-4 pdp-images" >
            <div className=" max-h-full pdp-image-list-c min-w-fit">
                <div className="pdp-image-list hidden sm:flex flex-col max-w-fit md:space-y-4">
                    {
                        [...list].map((item, i) => (
                            <div className="w-20 h-20 overflow-hidden rounded-md cursor-pointer" key={i} onClick={() => setActiveImage(i)}>
                                <img className="w-full h-full object-cover" src={item} alt={alt} />
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
                            <div className={`${openSlider && 'slider-active'} z-10 mob-pdp-image-slider fixed inset-x-0  -bottom-full bg-black-color-75 flex items-end`}>
                                <div className='w-full bg-white'>
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
                                                    <div className={`${i == activeImage && 'active'} overflow-hidden h-20 w-20 p-4 flex-shrink-0 border-b-4 cursor-pointer`} onClick={() => setActiveImage(i)} key={i}>
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