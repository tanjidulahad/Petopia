import { useFirebase } from '../../firebase/useFirebase';
import { useEffect, useState } from 'react'
import { connect } from "react-redux"

import { authShowToggle, getLoginOtpStart, getRegisterOtpStart, otpVerificationStart } from "../../redux/user/user-action";

import Login from './login';
import Register from './register';



const Auth = ({ show, user }) => {
    const [page, setPage] = useState(true) // true == login, false == Register
    const [fcmToken,setFcmToken]=useState('')

    useEffect(()=>{
        useFirebase().then(res=>{
            setFcmToken(res)
        })
    },[])

    return (
        <>
            {show && !user ?
                page ?
                    <Login fcmToken={fcmToken} setPage={setPage} />
                    :
                    <Register fcmToken={fcmToken} setPage={setPage} />
                : null
            }
        </>
    )
}

const mapStateToProps = state => ({
    show: state.user.show,
    user: state.user.currentUser
})
// const mapDispatchToProps = dispatch => ({
//     showToggle: () => dispatch(authShowToggle()),
// })

export default connect(mapStateToProps)(Auth)

