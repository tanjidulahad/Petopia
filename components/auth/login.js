import { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Button, Input } from '../inputs'
import { loginSuccess, authShowToggle, getLoginOtpStart } from '../../redux/user/user-action'
import Otp from './otp'

// Login Component
const Login = ({ showToggle, getLoginOtp, userloginSuccess, setPage, shop }) => {
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState(null) // {}
    const [error, setError] = useState("") // ""
    const [status, setStatus] = useState('') // loading failed success
    const onChangeHandler = (e) => {
        const { value } = e.target;
        if (error) setError(null);
        // if (!(/^\d*$/.test(value))) return;
        setPhone(value.trim())
    }
    const onSubmitHandler = () => {
        if (!phone) return setError("Enter valid phone number!.");
        getLoginOtp({ phone, setUser, setError, storeId: shop.store_id })
        setError('')
        setStatus('loading')
    }
    useEffect(() => {
        return () => {
            setUser(null);
            setStatus('')
        }
    }, [])
    useEffect(() => {
        if (error) {
            setStatus('')
        }
        if (user) {
            setStatus('')
        }
    }, [error, user])

    return (
        <>
            {
                !user ?
                    <div className="auth">
                        <div className="auth-form-container" >
                            <div className="title-c">
                                <h2 className="font-24 font-w-600">Login</h2>
                                <Button className='bg-transparent dark-blue p-2' onClick={showToggle} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="mt-16">
                                <div className='' style={{ minHeight: '24px', maxWidth: 'fit-content' }} >
                                    {
                                        error ?
                                            <span className='font-16 font-w-400 error-danger'>{error}</span>
                                            : null
                                    }
                                </div>
                                <Input name='otp' className={`auth-input ${error && 'input-danger'}`} type="text" placeholder="Phone Number or Email" onChange={onChangeHandler} value={phone} />
                            </div>
                            <div className="mt-40">
                                <Button className={`w-100 ${status == 'loading' ? 'loading-btn' : ""}`} type="button" onClick={onSubmitHandler} disabled={status == 'loading'}>{status == 'loading' ? 'Loading...' : 'Get OTP'}</Button>
                            </div>

                            <div className="hr mt-24"></div>
                            <div className="auth-redirect font-16" >
                                <span>New User? <Button className=" bg-transparent primary-color px-1" onClick={() => setPage(false)}>Create Account</Button> </span>
                            </div>

                        </div>
                    </div>
                    : <Otp username={phone} onSuccess={() => { userloginSuccess(user) }} setPage={setPage} setUser={setUser} userId={user.customer_id} resend={onSubmitHandler} />
            }
        </>

    )

}

const mapDispatchToProps = dispatch => ({
    showToggle: () => dispatch(authShowToggle()),
    getLoginOtp: (data) => dispatch(getLoginOtpStart(data)),
    userloginSuccess: (data) => dispatch(loginSuccess(data)),
})
const mapStateToProps = (state) => ({
    shop: state.store.shop
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
