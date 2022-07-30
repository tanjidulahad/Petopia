import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Loader from "@components/loading/loader"
// import DefaultComponent from '@components/indexDefault/index-dtault';

export default function name() {
    const router = useRouter()
    const [storeId, setStoreId] = useState(null)
    const [active, setActive] = useState(0)

    useEffect(() => {
        const { storeId } = router.query
        if (storeId) {
            setStoreId(storeId)
            router.push(router.asPath)
        }
    }, [router.isReady])
    const quotes = [
        'Build Your Brand Online with Store Website',
        'Connect & Reach your customers like never before',
        'To get started log on to Goplinto'
    ]
    useEffect(() => {
        const id = setInterval(() => {
            setActive(active < quotes.length - 1 ? active + 1 : 0)
        }, 4000);
        return () => {
            clearInterval(id)
        }
    }, [active])

    return (
        <>
            <div className="flex h-[100vh] justify-center flex-col items-center w-full bg-[#D85A5A] bg-opacity-80" style={{ minHeight: '95vh' }}>
                <p className="text-left w-[20rem] max-h-[10rem] sm:w-[30rem] mb-3 block"><span className=' font-bold text-xs sm:text-sm uppercase mb-2 text-white'>powered by</span></p>
                <a href="https://www.goplinto.com/" className="w-[20rem] max-h-[10rem] sm:w-[30rem] mb-3 block" target="_blank" rel="noopener noreferrer">
                    <img src="/img/goplinto_logo.png" alt="Goplinto" />
                </a>
                {
                    storeId ?
                        <h1 className=" font-extrabold text-2xl mt-4 text-white">Your store is getting ready
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="inline" style={{ margin: 'auto' }} width="75px" height="75px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                    <circle cx="27.5" cy="57.5" r="5" fill="#fe718d">
                                        <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>
                                    </circle> <circle cx="42.5" cy="57.5" r="5" fill="#f47e60">
                                        <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.44999999999999996s"></animate>
                                    </circle> <circle cx="57.5" cy="57.5" r="5" fill="#f8b26a">
                                        <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.3s"></animate>
                                    </circle> <circle cx="72.5" cy="57.5" r="5" fill="#abbd81">
                                        <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.15s"></animate>
                                    </circle>
                                </svg>
                            </span>
                        </h1>
                        :
                        <div className=" text-white mt-4">
                            <div className=" flex justify-start space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
                                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
                                </svg>
                                <div className="h-14 overflow-y-hidden w-[80vw] sm:w-[30rem] relative">
                                    {
                                        quotes.map((item, i) =>
                                            <p className="font-semibold text-base sm:text-lg transition-all duration-700 delay-100 opacity-80 w-full absolute -top-[200%]" style={
                                                active == i ? { top: 0 } : {}
                                            }>{item}</p>
                                        )
                                    }
                                </div>
                            </div>
                            <p className=" font-bold text-white text-right text-base sm:text-lg">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                    </svg> Goplinto
                                </i>
                            </p>
                        </div>
                }
            </div>
        </>
    )
}
