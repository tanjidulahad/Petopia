import { connect } from "react-redux"
import { SocialIcon } from 'react-social-icons';
import PageWrapper from "@components/page-wrapper/page-wrapper";
import { useRouter } from "next/router";

const Contact = ({ info, socialProfile }) => {
    const router = useRouter()
    return (
        <>
            <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
                <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </button>
                <span className='text-base font-semibold'>Contact</span>
            </div>
            <section className=" bg-gray-100">
                <div className="wrapper">
                    <div className=" flex flex-col justify-center items-center py-16 rounded-md w-full">
                        <div className=" items-start sm:text-center flex flex-col justify-start sm:justify-center w-full px-4">
                            <div className="h-36 w-36 sm:h-44 sm:w-44 sm:mx-auto">
                                <img className="w-full h-auto object-contain" src={info.logo_img_url || 'default-store.webp'} alt={info.store_name} />
                            </div>
                        </div>
                        <h6 className="text-base w-full text-left sm:text-center px-4 sm:text-2xl font-semibold mt-8">{info.store_name}</h6>
                        <div className="mt-8 px-4 pb-6 sm:pb-8 border-b-2 w-full ">
                            <p className="text-left md:text-center w-full">
                                {info.store_desc}
                            </p>
                        </div>
                        <div className="px-4 flex flex-col space-y-8 sm:space-y-12 justify-start md:justify-center items-start md:items-center py-8">
                            <p className="font-semibold md:font-normal">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline btn-color-revers mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {info.address}, {info.city}, {info.state}, {info.country}
                            </p>
                            <div className="flex flex-col md:flex-row justify-start  md:justify-center md:space-x-20 font-semibold md:font-normal">
                                {
                                    !!info.primary_phone &&
                                    <a href={`tel:+${info.primary_phone}`}>
                                        <p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline btn-color-revers mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            +{info.primary_phone}
                                        </p>

                                    </a>
                                }
                                {
                                    !!info.primary_email &&
                                    <a className="mt-4 md:mt-0" href={`mailto:${info.primary_email}`}>
                                        <p><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline btn-color-revers mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                            {info.primary_email}
                                        </p>
                                    </a>
                                }
                            </div>
                            <div className="text-left md:text-center">
                                {
                                    !!socialProfile.length &&
                                    <>
                                        <h5>Follow Us</h5>
                                        <div className=" flex justify-center items-center space-x-4  mt-8">
                                            {
                                                socialProfile.map((itme, i) => (
                                                    <>
                                                        {
                                                            !!itme.social_account_link &&
                                                            <div className=" w-fit h-fit rounded-full bg-black text-white">
                                                                <SocialIcon bgColor="#000" fgColor="#fff" url={`https://${itme.social_account_link}`} target='_blank' key={i} />
                                                            </div>
                                                        }
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
const mapStateToProps = state => ({
    info: state.store.info,
    socialProfile: state.store.socialProfile
})

export default connect(mapStateToProps)(PageWrapper(Contact))