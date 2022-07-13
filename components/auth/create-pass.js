import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Button, Input } from '../inputs';
import { IoEyeOutline, IoEyeOff } from 'react-icons/io5'
import { otpVerificationStart, authShowToggle, newPasswordCreateStart, loginSuccess } from '@redux/user/user-action';

const CreateNewPassword = ({ showToggle, setPage, createNewPassword, loginSuccess, user, info }) => {
    const [showPass, setShowPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')
    const [state, setState] = useState({
        password: "",
        confirmPassword: "",
        customerId: user.customer_id
    })

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        if (error) setError('')
        if (value.length > 24) return;
        let val = value.replace(/\s\s+/g, '').trim()
        setState({ ...state, [name]: val })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!state.password || state.password.length < 8) return setError("Please choose a strong password. Minimum password length should be of eight characters.");
        if (state.password != state.confirmPassword) return setError("Password and confirm password are not same.");
        setShowPass(false)
        setIsLoading(true)
        createNewPassword({ state, setError, setIsLoading, setIsSuccess })
    }
    useEffect(() => {
        let id;
        if (isSuccess) {
            id = setTimeout(() => {
                loginSuccess(user)
                setPage(true)
            }, 3000)
        }
        return () => {
            clearTimeout(id)
        }
    }, [isSuccess])
    return (
        <>
            {
                isSuccess ?
                    <div className="auth">
                        <div className="p-6 flex flex-col bg-white justify-center items-center auth-form-container rounded m-h-fit ">
                            <div>
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
                    :
                    <div className="auth">
                        <div className="p-6 bg-white auth-form-container rounded" style={{ height: 'fit-content' }} >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold">Create Password</h2>
                                <Button className='bg-transparent dark-blue p-2' onClick={() => { setPage(true); showToggle() }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>
                            <form onSubmit={onSubmitHandler}>
                                <div className="mt-10">
                                    <div className='' style={{ maxWidth: 'fit-content' }} >
                                        {
                                            !!error &&
                                            <span className='text-base red-color'>{error}</span>
                                        }
                                    </div>
                                    <div className='mt-6 h-fit '>
                                        <h3 className='mb-1'>Password</h3>
                                        <div className='relative h-fit'>
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
                                    </div>
                                    <div className='mt-6 relative h-fit'>
                                        <h3 className='mb-1'>Confirm password</h3>
                                        <Input name='confirmPassword' className={`py-3 ${error && ' border-red-400'}`} type={showPass ? 'text' : 'password'} placeholder="Confirm password" value={state.confirmPassword} onChange={onChangeHandler} disabled={isLoading} />
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

                                <div className='my-8' >
                                    <Button className={`w-full btn-bg btn-color py-4 rounded`} type="submit" disabled={isLoading}
                                        style={{
                                            ...isLoading && {
                                                opacity: 0.7,
                                                cursor: "not-allowed"
                                            },
                                        }}>{isLoading ? 'Loading...' : 'Submit'} </Button>
                                </div>
                            </form>

                        </div>
                    </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    show: state.user.show,
    info: state.store.info
})
const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    createNewPassword: (data) => dispatch(newPasswordCreateStart(data)),
    otpVerify: (data) => dispatch(otpVerificationStart(data)),
    loginSuccess: (data) => dispatch(loginSuccess(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPassword)
