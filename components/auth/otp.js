import { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Button, Input } from '../inputs';
import { otpVerificationStart, authShowToggle } from '../../redux/user/user-action';

const Otp = ({ showToggle, username, resend, setPage, otpVerify, onSuccess, userId, setUser, storeId }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState("") // ""
    const [status, setStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const onChangeHandler = (e) => {
        const { value } = e.target;
        if (error) setError(null);
        if (!(/^\d*$/.test(value))) return;
        setOtp(value)
    }
    const onSubmitHandler = () => {
        if (!otp) return setError("Enter valid OTP.");
        otpVerify({
            otp,
            userId,
            storeId,
            setError,
            setStatus,
            setUser,
            mode: username.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'email' : 'phone',
        })
        setError('')
        setIsLoading(true)
    }
    useEffect(() => {
        if (status) {
            if (onSuccess) {
                onSuccess()
            }
        }
    }, [status])
    useEffect(() => {
        if (error || status) {
            setIsLoading(false)
        }
    }, [status, error])

    // Componentdidmount
    useEffect(() => {
        return () => {
            setOtp('');
            setStatus("")
            setError('')
            setIsLoading(false)
        }
    }, [])
    return (
        <div className="auth">
            <div className="auth-form-container" >
                <div className="title-c">
                    <h2 className="font-24 font-w-600">OTP Verification</h2>
                    <Button className='bg-transparent dark-blue p-2' onClick={() => { setPage(true); showToggle() }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                            <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                        </svg>
                    </Button>
                </div>
                <div className="mt-16">
                    <div className='' style={{ height: '24px' }} >
                        {error ? <></> :
                            <span className='font-16 font-w-400 dark-blue-50'>OTP sent to {username}</span>
                        }
                    </div>
                    <div className='' style={{ height: '24px' }} >
                        {
                            error ?
                                <span className='font-16 font-w-400 error-danger'>{error}</span>
                                : null
                        }
                    </div>
                    <div>
                        <Input name='otp' className={`auth-input mt-8 ${error && 'input-danger'}`} type="text" placeholder="Enter OTP" value={otp} onChange={onChangeHandler} />
                    </div>
                </div>
                <div className="auth-redirect my-4 font-w-400 font-16 d-flex justify-content-between align-items-center" >
                    <div>
                        <span className='font-18 font-w-400'>01:25</span>
                    </div>
                    <div>
                        <span className='dark-blue-50'>Didn't receive OTP? <Button className="bg-transparent primary-color px-1" onClick={resend} >Resend</Button> </span>
                    </div>
                </div>
                <div className="mt-24">
                    <Button className={`w-100 ${isLoading ? 'loading-btn' : ""}`} type="button" onClick={onSubmitHandler} disabled={isLoading}>{isLoading ? 'Loading...' : 'Verify OTP'} </Button>
                </div>


            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    show: state.user.show,
    storeId: state.store.shop.store_id,
})
const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    otpVerify: (otp) => dispatch(otpVerificationStart(otp))
})

export default connect(mapStateToProps, mapDispatchToProps)(Otp)
