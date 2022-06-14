import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Button, Input } from '../inputs';
import CreateNewPassword from './create-pass'
import { otpVerificationStart, authShowToggle, forgotPasswordOtpVerifyStart } from '@redux/user/user-action';

const Otp = ({ showToggle, username, resend, setPage, otpVerify, verificationType, onSuccess, userId, info, forgotPass, forgotPasswordOtpVerify }) => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [counter, setCounter] = useState(120)
    const [user, setUser] = useState(null)
    const onChangeHandler = (e) => {
        const { value } = e.target;
        if (error) setError('')
        if (!(/^\d*$/.test(value))) return;
        setOtp(value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (otp.length != 5) return setError('Please Enter valid OTP.')
        setIsLoading(true)
        if (forgotPass) {
            forgotPasswordOtpVerify({ state: { otpCode: otp, customerId: userId }, setError, setIsLoading, setIsSuccess, setUser })
        } else {
            otpVerify({ userId, storeId: info.store_id, otp, setError, setStatus: setIsLoading, mode: verificationType })
        }
    }
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if (isSuccess) {
            clearInterval(timer)
        }
        return () => clearInterval(timer);
    }, [counter]);
    console.log(username);
    return (
        <>
            {
                isSuccess ?
                    <CreateNewPassword setPage={setPage} user={user} forgotPass={forgotPass} />
                    :
                    <div className="auth">
                        <div className="p-6 bg-white auth-form-container rounded" style={{ height: 'fit-content' }} >
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold">Enter OTP</h2>
                                <Button className='bg-transparent dark-blue p-2' onClick={() => { setPage(true); showToggle() }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>
                            <div className='mt-3' style={{ maxWidth: 'fit-content' }} >
                                {!error &&
                                    <span className='text-lg font-medium black-color-75'>OTP sent to
                                        {
                                            username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ?
                                                ` ${username}`
                                                : ` +${username}`
                                        }
                                    </span>
                                }
                            </div>

                            <form onSubmit={onSubmitHandler}>
                                <div className="mt-10">
                                    <div className='' style={{ maxWidth: 'fit-content' }} >
                                        {
                                            !!error &&
                                            <span className='text-base red-color'>{error}</span>
                                        }
                                    </div>
                                    <div >
                                        <Input name='otp' className={`auth-input ${error && ' border-red-400'}`} type="text" placeholder="Enter Five Digit OTP" value={otp} onChange={onChangeHandler} disabled={isLoading} />
                                    </div>
                                </div>
                                <div className="auth-redirect text-lg my-8 flex justify-between items-center black-color-75" >
                                    <div>
                                        {!!counter &&
                                            <span className='font-semibold'>0{parseInt(counter / 60)}:{counter % 60 < 10 ? '0' + counter % 60 : counter % 60}</span>
                                        }
                                    </div>
                                    <span >Didn't receive OTP?
                                        {
                                            counter ?
                                                <Button className="btn-color-revers px-2" type="button" style={{ cursor: 'not-allowed', opacity: '0.7' }}>Resend</Button>
                                                :
                                                <Button className="btn-color-revers px-2" type="button" onClick={() => { resend(); setCounter(120) }} >Resend</Button>
                                        }
                                    </span>
                                </div>
                                <div >
                                    <Button className={`w-full btn-bg btn-color py-4 rounded`} type="submit" disabled={isLoading}
                                        style={{
                                            ...isLoading && {
                                                opacity: 0.7,
                                                cursor: "not-allowed"
                                            },
                                        }}>{isLoading ? 'Loading...' : 'Verify'} </Button>
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
    otpVerify: (data) => dispatch(otpVerificationStart(data)),
    forgotPasswordOtpVerify: (data) => dispatch(forgotPasswordOtpVerifyStart(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Otp)
