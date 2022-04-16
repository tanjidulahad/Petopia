import { useState } from 'react'
import { connect } from "react-redux"

import { authShowToggle, getLoginOtpStart, getRegisterOtpStart, otpVerificationStart } from "../../redux/user/user-action";

import Login from './login';
import Register from './register';



const Auth = ({ show, user }) => {
    const [page, setPage] = useState(true) // true == login, false == Register

    return (
        <>
            {show && !user ?
                page ?
                    <Login setPage={setPage} />
                    :
                    <Register setPage={setPage} />
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

