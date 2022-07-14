import { logOutCancel } from "@redux/UI/ui-action";
import { logOutStart } from "@redux/user/user-action";
import { connect } from "react-redux";
import { Button } from "@components/inputs";
import { addToCart, removeFromCart, clearCart } from "@redux/cart/cart-actions";
import { clearCheckout } from "@redux/checkout/checkout-action";
import { clearCartError } from "@redux/checkout/checkout-action";

const CartErrorPop = ({ cart, cartError, purchaseError, addToCart, removeFromCart, clearCartError, clearCart, clearCheckout }) => {
    return (
        <>
            {
                !!cartError &&
                <div className="fixed inset-0 bg-gray-400 z-30 bg-opacity-80" style={{ zIndex: 10002 }}>
                    <div className=" absolute left-1/2 h-fit bottom-0 sm:bottom-auto sm:top-1/2 bg-white rounded-md w-full -translate-x-1/2 sm:-translate-y-1/2 p-4 sm:p-10" style={{ maxWidth: '556px' }}>
                        <div className="title-c">
                            <h2 className="text-center text-3xl text-red-500 m-auto"> {'Sure?'}</h2>
                            {/* <Button className='bg-transparent dark-blue p-2' onClick={clearError}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                    <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                </svg>
                            </Button> */}
                        </div>
                        <div className='my-8 text-center space-y-3'>
                            <p className='text-base font-medium'>{cartError.message}.</p>
                            <p className='text-base font-medium'>Clear cart and add this product?</p>
                        </div>
                        <div className="mt-10 flex justify-between space-x-4 text-lg text-white">
                            <Button className="py-3 w-full  font-semibold hover:bg-red-500 hover:text-white text-red-500 border-2 border-red-500 rounded transition-all " type="button"
                                onClick={() => {
                                    clearCart();
                                    clearCheckout();
                                    clearCartError();
                                    addToCart(cartError.payload)
                                }} >{'Yes'}</Button>

                            <Button className="py-3 w-full bg-red-500  font-semibold   border-2  rounded transition-all" type="button"
                                onClick={() => {
                                    clearCartError();
                                    if (cart.find(item => item.item_id == cartError.payload.item_id)) {
                                        removeFromCart(cartError.payload)
                                    }
                                }}  >{'No, wait'}</Button>
                        </div>

                    </div>
                </div>
            }
            {
                !!purchaseError &&
                <div className="fixed inset-0 bg-gray-400 z-30 bg-opacity-80" style={{ zIndex: 10002 }}>
                    <div className=" absolute left-1/2 h-fit bottom-0 sm:bottom-auto sm:top-1/2 bg-white rounded-md w-full -translate-x-1/2 sm:-translate-y-1/2 p-4 sm:p-10" style={{ maxWidth: '556px' }}>
                        <div className="title-c">
                            <h2 className="text-center text-3xl text-red-500 m-auto">{purchaseError?.message}</h2>
                            {/* <Button className='bg-transparent dark-blue p-2' onClick={clearError}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                                    <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                                </svg>
                            </Button> */}
                        </div>
                        <div className='my-8 text-center space-y-3'>
                            {/* <p className='text-base font-medium'>{}.</p> */}
                            <p className='text-base font-medium'>Somthing went wrong.</p>
                        </div>
                        <div className="mt-10 flex justify-between text-lg text-white">
                            <Button className="py-3 w-full font-semibold btn-color btn-bg btn-border border-2  rounded transition-all hover:scale-[98%] " type="button"
                                onClick={() => {
                                    clearCartError();
                                }} >{'Close'}</Button>

                            {/* <Button className="py-3 w-full bg-red-500  font-semibold   border-2  rounded transition-all" type="button"
                                onClick={() => {
                                    clearCartError();

                                }}  >{'No, wait'}</Button> */}
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    addToCart: (data) => dispatch(addToCart(data)),
    removeFromCart: (data) => dispatch(removeFromCart(data)),
    clearCartError: () => dispatch(clearCartError()),
    clearCart: () => dispatch(clearCart()),
    clearCheckout: () => dispatch(clearCheckout()),

})

const mapStateToProps = state => ({
    cartError: state.checkout.cartError,
    purchaseError: state.checkout.purchaseError,
    cart: state.cart
})

export default connect(mapStateToProps, mapDispatchToProps)(CartErrorPop);