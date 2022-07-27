import React from 'react';

const Inactive = () => {
    return (
        <div className='flex min-h-screen justify-center items-center'>
            <div className='py-[10px] md:py-[150px] px-[10px] md:px-[150px]'>
                <div className='grid grid-cols-5'>
                    <div className='col-span-5 md:col-span-2'>
                        <h1 className="text-[25px] font-bold mb-10px">Oops.!</h1>
                        <h1 className="text-[25px] font-bold mb-10px">
                            We couldn't find the page...
                        </h1>
                        <div className='hidden md:flex'>
                            <p className="mt-[150px] border-b-[1px] pb-[5px] text-gray-500">We can still help you:</p>
                        </div>
                        <div className='hidden md:block'>
                            <div className='my-[30px]'>
                                <p className="text-[15px] font-bold">If you're a customer to this store</p>
                                <p className="text-sm text-gray-500">Please try again after sometime</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-bold">If you're the owner of this store</p>
                                <p className="text-sm text-gray-500">
                                    Please{" "}
                                    <a target="_blank" href="https://dash.goplinto.com/">
                                        <span
                                            className="dashboard-sign-in"
                                            style={{ color: "#F64C5D", fontWeight: "bold" }}
                                        >
                                            Sign-In
                                        </span>
                                    </a>{" "}
                                    to resolve the issue.
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className='col-span-5 md:col-span-3'>
                        <img className='mt-[20px] md:mt-0' src="/img/storeInactive.png" alt="" />
                        <div className='flex md:hidden'>
                            <p className="mt-[50px] border-b-[1px] pb-[5px] text-gray-500">We can still help you:</p>
                        </div>
                        <div className='md:hidden block'>
                            <div className='my-[30px]'>
                                <p className="text-[15px] font-bold">If you're a customer to this store</p>
                                <p className="text-sm text-gray-500">Please try again after sometime</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-bold">If you're the owner of this store</p>
                                <p className="text-sm text-gray-500">
                                    Please{" "}
                                    <a target="_blank" href="https://dash.goplinto.com/">
                                        <span
                                            className="dashboard-sign-in"
                                            style={{ color: "#F64C5D", fontWeight: "bold" }}
                                        >
                                            Sign-In
                                        </span>
                                    </a>{" "}
                                    to resolve the issue.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Inactive;