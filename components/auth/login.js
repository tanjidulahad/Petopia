import { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { IoEyeOutline, IoEyeOff } from 'react-icons/io5'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Button, Input } from '../inputs'
import Otp from './otp'
import { loginSuccess, authShowToggle, getLoginOtpStart, loginWithPasswordStart, forgotPasswordStart } from '@redux/user/user-action'

// Login Component
const Login = ({ showToggle, loginWithPassword, userloginSuccess, forgotPassword, setPage, info }) => {
    const [isVarificationPhone, setIsVarificationPhone] = useState(true)
    const [forgotPass, setForgotPass] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [user, setUser] = useState(null)
    const [state, setState] = useState({
        storeId: info.store_id,
        verificationType: isVarificationPhone ? "PHONE" : 'EMAIL', // (EMAIL  or PHONE),
        password: "",
        emailId: "",
        phone: "",
        isdCode: "91",
    })
    // const [user, setUser] = useState(null) // {}
    const [error, setError] = useState("") // ""
    const [isLoading, setIsLoading] = useState(false) // loading failed success

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        if (error) setError(null);
        if ((!(/^\d*$/.test(value)) || value.length > 10) && name == 'phone') return;
        setState({ ...state, [name]: value })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!(state.phone || state.emailId)) return setError("Enter valid 10 digit phone number or email id!");
        setError('')
        setIsLoading(true)
        if (forgotPass) {
            forgotPassword({ state, setError, setIsLoading, setUser })
        } else {
            loginWithPassword({ state, setError, setStatus: setIsLoading })
        }
    }
    useEffect(() => {
        setState(state => ({ ...state, verificationType: isVarificationPhone ? "PHONE" : 'EMAIL' }))
    }, [isVarificationPhone])

    useEffect(() => {
        if (error) {
            setIsLoading('')
        }
    }, [error])
    console.log(state);

    return (
        <>
            {
                user ?
                    <Otp username={isVarificationPhone ? state.isdCode + ' ' + state.phone : state.emailId}
                        setPage={setPage} userId={user} forgotPass={forgotPass} resend={() => forgotPassword({ state })}
                    />
                    :
                    <div className="auth">
                        <div className="p-6 bg-white auth-form-container rounded" style={{ height: 'fit-content' }} >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold">{forgotPass ? 'Reset password' : 'Login'}</h2>
                                <Button className='bg-transparent dark-blue p-2' onClick={showToggle} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>

                            <form onSubmit={onSubmitHandler}>

                                <div className="mt-10 mb-4">
                                    <div className='' style={{ maxWidth: 'fit-content' }} >
                                        {
                                            !!error &&
                                            <span className='text-base red-color'>{error}</span>

                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className='w-fit flex' onClick={() => setIsVarificationPhone(!isVarificationPhone)}>
                                        <span className={`py-2 px-3 transition-all  duration-500 border-2 border-static ${isVarificationPhone ? 'text-white font-medium btn-bg' : 'btn-color-revese'}`}>Phone Number</span>
                                        <span className={`py-2 px-3 transition-all duration-500 border-2 border-static ${!isVarificationPhone ? 'text-white font-medium btn-bg' : 'btn-color-revese'}`}>Email</span>
                                    </div>
                                    {
                                        isVarificationPhone ?
                                            <div className='mt-2 flex space-x-2'>
                                                <div className='w-16 shrink-0 relative'>
                                                    <PhoneInput
                                                        inputClass='hidden'
                                                        containerClass='py-4 w-full h-full'
                                                        buttonClass='w-full flag-div'
                                                        // country={'us'}
                                                        enableAreaCodes={true}
                                                        value={state.isdCode}
                                                        onChange={phone => setState({ ...state, isdCode: phone })}
                                                    />
                                                </div>
                                                <div className=' relative w-full'>
                                                    <input className='ml-2 absolute text-center text-sm top-1/2 -translate-y-1/2 w-11 outline-none' value={'+' + state.isdCode} />
                                                    <Input name='phone' className={`pl-14 py-3 ${error && ' border-red-400'}`} type="tel" placeholder="Enter 10 digit phone number" onChange={onChangeHandler} value={state.phone} />
                                                </div>
                                            </div>
                                            :
                                            <div className='mt-2'>
                                                <Input name='emailId' className={`py-3 ${error && ' border-red-400'}`} type="email" placeholder="Enter valid email" onChange={onChangeHandler} value={state.emailId} />
                                            </div>
                                    }
                                </div>
                                {
                                    !forgotPass &&
                                    <div className='mt-6 relative h-fit '>
                                        <Input name='password' className={`py-3 ${error && ' border-red-400'}`} type={showPass ? 'text' : 'password'} placeholder="Enter password" onChange={onChangeHandler} value={state.password} />
                                        <div className=' cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 p-4' onClick={() => setShowPass(!showPass)}>
                                            {
                                                showPass ?
                                                    <IoEyeOff />
                                                    :
                                                    <IoEyeOutline />
                                            }
                                        </div>
                                    </div>
                                }
                                <div className='mt-5 relative flex justify-end '>
                                    <Button type='button' className=' font-semibold btn-color-revese' onClick={() => { setUser(null); setForgotPass(!forgotPass) }} >{forgotPass ? 'Want to Login?' : 'Forgot password?'}</Button>
                                </div>
                                <div className="py-8 border-b-2 ">
                                    <Button className={`w-full btn-color text-lg font-medium btn-bg py-4 rounded ${isLoading ? 'loading-btn' : ""}`} type="submit" disabled={isLoading}
                                        style={{
                                            ...(isLoading) && {
                                                opacity: 0.7,
                                                cursor: "not-allowed"
                                            },
                                        }}
                                    >{isLoading ? 'Loading...' : forgotPass ? 'Get OTP' : 'Login'}</Button>
                                </div>
                            </form>

                            <div className="auth-redirect  black-color mt-8 text-lg" >
                                <span>New User? <Button className=" bg-transparent btn-color-revers px-1" onClick={() => setPage(false)}>Create Account</Button> </span>
                            </div>

                        </div>
                    </div>
            }
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    loginWithPassword: (data) => dispatch(loginWithPasswordStart(data)),
    forgotPassword: (data) => dispatch(forgotPasswordStart(data)),
    userloginSuccess: (data) => dispatch(loginSuccess(data)),
})
const mapStateToProps = (state) => ({
    info: state.store.info
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
