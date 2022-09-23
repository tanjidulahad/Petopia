import { connect } from "react-redux"
import { SocialIcon } from 'react-social-icons';
const Contact = ({ info, socialProfile, close }) => {
    return (
        <>
            <section className=" bg-gray-100 relative">
                <div className=' w-full flex justify-end mr-6 absolute top-4 '>
                    <button className='flex items-center black-color-75 mr-4' onClick={() => { close(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="wrapper">
                    <div className=" flex flex-col justify-center items-center py-16 rounded-md w-full">
                        <div className="text-center flex flex-col items-center">
                            <div className="h-24 w-24">
                                <img className="w-full h-auto object-contain" src={info.logo_img_url || '/img/default-store.webp'} alt={info.store_name} />
                            </div>
                            <h6 className="text-xl font-semibold mt-8">{info.store_name}</h6>
                        </div>
                        <div className="mt-8 px-4 pb-8 border-b-2 w-full ">
                            <p className="text-left text-sm sm:text-lg md:text-center w-full">
                                {info.store_desc}
                            </p>
                        </div>
                        <div className="px-4 flex flex-col space-y-12 justify-start md:justify-center items-start md:items-center py-8">
                            <p className="font-semibold text-sm sm:text-lg md:font-normal">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline btn-color-revers mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {info.address}, {info.city}, {info.state}, {info.country}
                            </p>
                            <div className="flex flex-col text-sm sm:text-lg md:flex-row justify-start  md:justify-center md:space-x-20 font-semibold md:font-normal">
                                {
                                    !!info.primary_phone &&
                                    <a href={`tel:+${info.isd_code_phone_number} ${info.primary_phone}`}>
                                        <p>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline btn-color-revers mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            +{info.isd_code_phone_number} {info.primary_phone}
                                        </p>

                                    </a>
                                }
                                {
                                    !!info.primary_email &&
                                    <a className="mt-4 md:mt-0" href={`mailto:${info.primary_email}`}>
                                        <p className="text-sm sm:text-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline btn-color-revers mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                                        <div className=" flex justify-center text-sm sm:text-lg items-center space-x-4  mt-8">
                                            {
                                                socialProfile.map((item, idx) => (
                                                    <>
                                                        {
                                                            !!item.social_account_link &&
                                                            <a target="_blank" className='block' href={(item.social_account_link.indexOf('http://') == 0 || item.social_account_link.indexOf('https://') == 0) ? `${item.social_account_link}` : `https://${item.social_account_link}`}
                                                                style={{ width: "2rem", height: '2rem', maxHeight: '2rem', borderRadius: '50%' }}
                                                                bgColor="#fff" fgColor="#000"
                                                                key={idx}>
                                                                <img src={item?.logo_img_url || ''} alt="Goplinto" />
                                                            </a>

                                                        }
                                                        {/* <SocialIcon bgColor="#000" fgColor="#fff" url={`https://${itme.social_account_link}`} target='_blank' key={i} /> */}
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

export default connect(mapStateToProps)(Contact)