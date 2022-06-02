import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Button, Input } from '@components/inputs'
import { IoEyeOutline, IoEyeOff } from 'react-icons/io5'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Otp from './otp';
import { getRegisterOtpStart, loginSuccess, authShowToggle, getLoginOtpStart, registerWithPasswordStart, forgotPasswordStart } from '@redux/user/user-action';

// Register Component
const Register = ({fcmToken, showToggle, setPage, forgotPassword, registerWithPassword, userloginSuccess, info }) => {
    const [showPass, setShowPass] = useState(false)
    const [isVarificationPhone, setIsVarificationPhone] = useState(false)
    const [state, setState] = useState({
        storeId: info.store_id,
        fullName: "",
        password: "",
        confirmPassword: "",
        verificationType: isVarificationPhone ? "PHONE" : 'EMAIL', // (EMAIL  or PHONE)
        emailId: "",
        phone: "",
        isdCode: "91", // ..mandatory if verificationType is PHONE
        deviceId:fcmToken
    });
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        if (error) setError(null);
        if ((!(/^\d*$/.test(value)) || value.length > 10) && name == 'phone') return;
        // console.log(name);
        // if (name != 'password' && ) value = value.trim()
        // if (name != 'confirmPassword') value = value.trim()
        if (value.length > 40 && name == 'password') return;
        if (value.length > 40 && name == 'confirmPassword') return;
        setState({ ...state, [name]: value })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // if (isLoading) return;
        if (!state.fullName) return setError("Please enter your name.");
        if (!(state.phone || state.emailId)) return setError("Please enter valid email id or 10 digit phone number.");
        if (state.verificationType == 'PHONE' && state.phone.length < 10) return setError("Please enter valid 10 digit phone number.");
        if (state.verificationType == 'EMAIL' && !state.emailId.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setError("Enter a valid email id!");
        if (!state.password || state.password.length < 8) return setError("Please choose a strong password. Minimum password length should be of eight characters.");
        if (state.password != state.confirmPassword) return setError("Password and confirm password are not same.");
        setError('')
        setIsLoading(true)
        registerWithPassword({ state: { ...state, verificationType: isVarificationPhone ? "PHONE" : 'EMAIL' }, setError, setUser, setStatus: setIsLoading, storeId: info.store_id })
    };
    useEffect(() => {
        setState(state => ({ ...state, verificationType: isVarificationPhone ? "PHONE" : 'EMAIL' }))
    }, [isVarificationPhone])

    // const resendHandler = () => {
    //     forgotPassword({ state })
    // }
    console.log(state);
    return (
        <>
            {
                !!user ?
                    <Otp username={isVarificationPhone ? state.isdCode + ' ' + state.phone : state.emailId}
                        setPage={setPage} userId={user.customer_id} resend={() => forgotPassword({ state })}
                    />
                    :
                    <div className="auth">
                        <div className=" auth-form-container rounded overflow-y-auto h-full" >
                            <div className='p-6 bg-white rounded-md'>
                                <div className="flex justify-between items-center sticky top-0 bg-white py-6 z-10">
                                    <h2 className="text-2xl font-semibold">Create Account</h2>
                                    <Button className='bg-transparent dark-blue p-2' onClick={showToggle}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                        </svg>
                                    </Button>
                                </div>
                                {
                                    !!error &&
                                    <div className='flex sticky top-20 pb-4 bg-white w-full' >
                                        <span className='text-base red-color'>{error}</span>
                                    </div>

                                }
                                <form onSubmit={onSubmitHandler}  >
                                    <div className="mt-6 space-y-6">
                                        <div>
                                            <h3 className='mb-1'>Name</h3>
                                            <Input disabled={isLoading} name='fullName' className={`py-3 ${error && ' border-red-400'}`} type="text" placeholder="Your name" onChange={onChangeHandler} value={state.name} />
                                        </div>
                                        <div>
                                            <div className='w-fit flex' onClick={() => setIsVarificationPhone(!isVarificationPhone)}>
                                                <span className={`py-2 px-3 transition-all  duration-500 border-2 border-static ${isVarificationPhone ? 'text-white font-medium btn-bg' : 'btn-color-revese'}`}>Phone Number</span>
                                                <span className={`py-2 px-3 transition-all duration-500 border-2 border-static ${!isVarificationPhone ? 'text-white font-medium btn-bg' : 'btn-color-revese'}`}>Email</span>
                                            </div>
                                            {
                                                isVarificationPhone ?
                                                    <div className='mt-2 flex space-x-2'>
                                                        <div className='w-16 shrink-0'>
                                                            <PhoneInput
                                                                inputClass='hidden'
                                                                containerClass='py-4 w-fit h-full'
                                                                buttonClass='w-full'
                                                                // country={'us'}
                                                                enableAreaCodes={true}
                                                                value={state.isdCode}
                                                                onChange={phone => setState({ ...state, isdCode: phone })}
                                                            />
                                                        </div>
                                                        <div className=' relative w-full'>
                                                            <input disabled={isLoading} className='ml-2 absolute text-center text-sm top-1/2 -translate-y-1/2 w-11 outline-none' value={'+' + state.isdCode} />
                                                            <Input disabled={isLoading} name='phone' className={`pl-14 py-3 ${error && ' border-red-400'}`} type="tel" placeholder="Enter 10 digit phone number" onChange={onChangeHandler} value={state.phone} />
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='mt-2'>
                                                        <Input disabled={isLoading} name='emailId' className={`py-3 ${error && ' border-red-400'}`} type="email" placeholder="Enter valid email" onChange={onChangeHandler} value={state.emailId} />
                                                    </div>
                                            }
                                        </div>
                                        <div className='mt-6 h-fit '>
                                            {/* <Input disabled={isLoading} name='password' className={`py-3 ${error && ' border-red-400'}`} type={showPass ? 'text' : 'password'} placeholder="Enter password" onChange={onChangeHandler} value={state.password} /> */}
                                            <h3 className='mb-1'>Password</h3>
                                            <div className=' relative'>
                                                <Input disabled={isLoading} name='password' className={`py-3 ${error && ' border-red-400'}`} type={showPass ? 'text' : 'password'} placeholder="Create a password" onChange={onChangeHandler} value={state.password} />
                                                <div className=' cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 p-4' onClick={() => setShowPass(!showPass)}>
                                                    {
                                                        showPass ?
                                                            <IoEyeOff />
                                                            :
                                                            <IoEyeOutline />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div>
                                            <Input disabled={isLoading} name='password' className={`py-3 ${error && ' border-red-400'}`} type="password" placeholder="Create a password" onChange={onChangeHandler} value={state.password} />
                                        </div> */}
                                        <div>
                                            <h3 className='mb-1'>Confirm Password</h3>
                                            <Input disabled={isLoading} name='confirmPassword' className={`py-3 ${error && ' border-red-400'}`} type="password" placeholder="Confirm password" onChange={onChangeHandler} value={state.confirmPassword} />
                                        </div>
                                    </div>
                                    <div className="py-8 border-b-2">
                                        <Button className={`w-full btn-color text-lg font-medium btn-bg py-4 rounded${isLoading == true ? 'loading-btn' : ""}`} type="submit" disabled={isLoading == true}
                                            style={{
                                                ...(isLoading == true) && {
                                                    opacity: 0.7,
                                                    cursor: "not-allowed"
                                                },
                                            }}>{isLoading == true ? 'Loading...' : 'Register'}</Button>
                                    </div>
                                </form>

                                <div className="auth-redirect mt-8 black-color text-lg" >
                                    <span>Already have an account? <Button className="bg-transparent btn-color-revers px-1" onClick={() => setPage(true)}>Login</Button> </span>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    show: state.user.show,
    user: state.user,
    info: state.store.info
})
const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    // getLoginOtp: (phone) => dispatch(getLoginOtpStart(phone)),
    // getRegisterOtp: (user) => dispatch(getRegisterOtpStart(user)),
    // otpVerify: (otp) => dispatch(otpVerificationStart(otp)),
    registerWithPassword: (data) => dispatch(registerWithPasswordStart(data)),
    forgotPassword: (data) => dispatch(forgotPasswordStart(data)),
    userloginSuccess: (data) => dispatch(loginSuccess(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
