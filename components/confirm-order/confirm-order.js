import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Router from 'next/router'

import ThankYou from "../thank-you/thank-you"

// Actions
import { initiateOrderPymentStart, clearCheckout, createNewRzpOrderStart } from '../../redux/checkout/checkout-action'
import OnlinePayment from "../../../../components/online-payment/online-payment";


const confirmOrder = ({ checkout, checkoutDetails, user, initiateOrder, clearCheckout, info, createNewRzpOrder }) => {
    const { payment, purchaseDetails, purchase, confirmOrder } = checkout;
    const [orderId, setOrderId] = useState(null)
    const paymentMethod = payment == 'Y' ? "PAY" : "COD";
    useEffect(() => {
        if (!purchase) {
            Router.push(`/${info.store_name.replaceAll(' ', '-').trim()}/${info.store_id}/accounts/myorders`)
            return null;
        }
        setOrderId(Object.keys(purchaseDetails.orders)[0])
        if (paymentMethod == 'COD' && purchase?.purchase_id) {
            initiateOrder({ purchaseId: purchase?.purchase_id, method: paymentMethod, customerId: user.customer_id });
        }
        if (paymentMethod == 'PAY' && purchase?.purchase_id) {
            createNewRzpOrder({ purchaseId: purchase?.purchase_id, totalPurchaseAmount: purchaseDetails?.calculatedPurchaseTotal, currency: purchaseDetails?.currencyCode })
        }
        return () => {
            if (confirmOrder.confirm) {
                clearCheckout()
            }
        }
    }, [])
    useEffect(() => {
        if (confirmOrder.confirm) {
            setTimeout(() => {
                Router.push(`/${info.store_name.replaceAll(' ', '-').trim()}/${info.store_id}/accounts/order-details/${orderId}`)
            }, 5000);
        }
        return () => {
            if (confirmOrder.confirm) {
                clearCheckout()
            }
        }
    })
    console.log(confirmOrder.confirm);
    // if (checkout.rzpOrder && !checkout.confirmOrder) {
    //     return <OnlinePayment />
    // } else if (checkout.rzpOrder && checkout.confirmOrde) {
    //     return <ThankYou orderId={confirmOrder.confirm} />
    // } else {
    //     <PageLoader />
    // }
    // if (!purchase) {
    //     Router.push(`/${store.store_name.replaceAll(' ', '-').trim()}/${store.store_id}/accounts/myorders`)
    //     return null;
    // }
    return (
        <>
            {
                paymentMethod == 'COD'
                    ? confirmOrder.confirm
                        ? <ThankYou orderId={orderId} />
                        : <PageLoader />
                    : checkout.rzpOrder && confirmOrder.confirm
                        ? <ThankYou orderId={orderId} />
                        : checkout.rzpOrder && !confirmOrder.confirm
                            ? <OnlinePayment />
                            : <PageLoader />

            }
        </>
    )
}

const mapStateToProps = state => ({
    checkout: state.checkout,
    user: state.user.currentUser,
    info: state.store.info
})

const mapDispatchToProps = dispatch => ({
    initiateOrder: (data) => dispatch(initiateOrderPymentStart(data)),
    clearCheckout: () => dispatch(clearCheckout()),
    createNewRzpOrder: (data) => dispatch(createNewRzpOrderStart(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(confirmOrder)))