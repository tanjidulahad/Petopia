import { useEffect, useState } from "react"
import { Button } from "../components/inputs"

const ThankYou = () => {
    return (
        <section>
            <div className="wrapper mx-auto">
                <div className="thank-you py-16">
                    <div className="flex justify-center items-center flex-col">
                        <div className="">
                            <div className="animation-ctn">
                                <div className="icon icon--order-success svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
                                        <g fill="none" stroke="#22AE73" strokeWidth="2">
                                            <circle cx="77" cy="77" r="72" style={{ strokeDasharray: "480px, 480px", strokeDashoffset: '960px' }}></circle>
                                            <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style={{ strokeDasharray: "480px, 480px", strokeDashoffset: '960px' }}></circle>
                                            <polyline className="st0" stroke="#fff" strokeWidth="10" points="43.5,77.8 63.7,97.9 112.2,49.4 " style={{ strokeDasharray: "100px, 100px", strokeDashoffset: '200 px' }} />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className=" text-center mt-10">
                            <h3 className="text-3xl font-bold">Thank you, your order has been placed successfully.!</h3>
                            <div className='pt-6 pb-10'>
                                <span className="text-xl black-color-75  pb-10">An order confirmation mail has been sent to you.</span>
                            </div>
                            <h4 className="text-2xl">Order Id - #{14512}</h4>
                            <div className="mt-6">
                                <Button className="py-4 w-60 block mx-auto  btn-border btn-bg-revese btn-color-revese rounded border-2 " type="link" href={`/`} title="View Order Details" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>)
}

export default ThankYou;