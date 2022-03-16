import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { connect } from "react-redux"
import Link from "next/link"
import { Button } from "../components/inputs"

// Actions
import { getAddressStart, addAddressStart, updateAddressStart, authShowToggle } from "../redux/user/user-action"
import { setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod } from "../redux/checkout/checkout-action"
import { initiateOrderPymentStart, clearCheckout, createNewRzpOrderStart } from '../redux/checkout/checkout-action'

// Components
import { setBackendCartStart, getPurchageStart } from "../redux/checkout/checkout-action"
import CartItem from "../components/cart-item/cart-item";
import { Radio } from "../components/inputs";

const Cart = ({ user, userAddress, storeSettings, cart, info, checkout, setBackendCart, getPurchage, getAddress, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod, authToggle,
    initiateOrder, clearCheckout, createNewRzpOrder }) => {
    const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
    const purchaseDetails = checkout.purchaseDetails;
    const [initiateData, setInitiateData] = useState(null)
    const [initiateStatus, setInitiateStatus] = useState('pending') // pending, loading, failure
    const [rzpOrder, setRzpOrder] = useState('')
    const [checkoutDetails, setcheckoutDetails] = useState({
        deliveryAddress: userAddress.length ? userAddress[0]?.address_id : null,
        deliveryMethod: "N",
        paymentMethod: 'Y',
    })
    const router = useRouter();
    useEffect(() => { // Get Purchase Id
        if (!cart.length) return;
        // Do nothing if don't have storeId and user 
        if (!info || !user) return;
        const data = {
            [info.store_id]: [
                ...cart.map(item => ({
                    item_id: item.item_id,
                    barcode_id: null,
                    quantity: item.quantity,
                    variant_item_id: item.defaultVariantItem?.variant_item_id | null,
                }))
            ]
        }
        //  Creating browsercart 
        if (!checkout.purchase) {
            setBackendCart({ userId: user.customer_id, groupId: info.group_id, data })
        }

        // Setting default details
        if (checkout.purchase) {
            setPaymentMethod({ purchaseId: checkout.purchase?.purchase_id, flag: checkoutDetails.paymentMethod });
        }
        if (checkout.purchase) {
            setShipmentMethod({ purchaseId: checkout.purchase?.purchase_id, flag: checkoutDetails.deliveryMethod });
        }
    }, [user, checkout.purchase, info])
    useEffect(() => {
        if (checkoutDetails.deliveryAddress && checkout.purchase) {
            setDeliveryAddressToPurchase({ purchaseId: checkout.purchase?.purchase_id, addressId: checkoutDetails.deliveryAddress })
        }
    }, [userAddress])

    useEffect(() => {
        if (!user || userAddress.length) return;
        getAddress(user.customer_id)
    }, [user])

    useEffect(() => {
        if (checkout.purchase?.purchase_id) {
            getPurchage(checkout.purchase?.purchase_id)
        }
    }, [])
    // Change function to chagen address payment and shipment methods
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        console.log(checkoutDetails);
        setcheckoutDetails({
            ...checkoutDetails,
            [name]: value
        })
        if (name == 'deliveryAddress' && checkout.purchase) {
            setDeliveryAddressToPurchase({ purchaseId: checkout.purchase?.purchase_id, addressId: value })
        }
        if (name == 'paymentMethod' && checkout.purchase) {
            setPaymentMethod({ purchaseId: checkout.purchase?.purchase_id, flag: value });
        }
        if (name == 'deliveryMethod' && checkout.purchase) {
            setShipmentMethod({ purchaseId: checkout.purchase?.purchase_id, flag: value });
        }
    }
    // Initial Payment function
    const initiatePayment = () => {
        if (!checkoutDetails.deliveryAddress) return;
        const orderId = Object.keys(purchaseDetails.orders)[0]
        const { purchase } = checkout
        const paymentMethod = checkoutDetails.paymentMethod == 'Y' ? "PAY" : "COD";
        if (paymentMethod == 'COD' && purchase?.purchase_id) {
            setInitiateStatus('loading')
            initiateOrder({ purchaseId: purchase?.purchase_id, method: paymentMethod, customerId: user.customer_id, setInitiateStatus, setInitiateData });
        }
    }
    console.log(initiateStatus);
    useEffect(() => {
        if (initiateStatus == 'success' && initiateData) {
            router.push('/thank-you')
        }
        return () => {
            if (initiateStatus == 'success' && initiateData) {
                clearCheckout()
            }
        }

    }, [initiateStatus])

    if (!cart.length) {
        return (
            <>
                <div className="flex justify-center items-center empty-cart" style={{ minHeight: '80vh' }}>
                    <div className="h-64 w-64 text-center flex justify-center items-center" style={{ borderRadius: '50%', background: 'rgba(246, 75, 93, 0.13)', boxShadow: 'rgb(246 75 93 / 13%) 0px 0px 100px 100px' }}>
                        <h4>Your Cart is Empty,
                            <span className="red-color">
                                <Link href='/'> Shop now!</Link>
                            </span>
                        </h4>
                    </div>
                </div>
            </>
        )
    }
    return (
        <section className="bg-black-color-lighter cart">
            <div className="wrapper mx-auto">
                <div className="grid grid-cols-12 gap-10">
                    <div className="w-full col-span-8 ">
                        <div className="w-full bg-white rounded">
                            <div className="p-10 border-b-2">
                                <h2>Review your order</h2>
                            </div>
                            <div className="flex px-10 pt-10 justify-between">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 ">
                                        <img className="w-full h-full rounded" src="https://dsa0i94r8ef09.cloudfront.net/264/assets/60cc53e3a47e4_paneer exotic pizza.png" alt="..." />
                                    </div>
                                    <h4 className="text-xl inline ml-4">Pazha Mudhir Cholai</h4>
                                </div>
                                <span className="text-base font-medium black-color-75">{totalItems} items</span>
                            </div>
                            {/* cart Item list */}
                            <div className="p-10 flex flex-col space-y-8">
                                {
                                    cart.map((item, i) => (
                                        <CartItem data={item} key={i} />
                                    ))
                                }
                            </div>
                        </div>
                        {
                            !!purchaseDetails &&
                            <>
                                {/* Delivery method */}
                                <div className="w-full mt-10 p-10 bg-white rounded">
                                    <div className="">
                                        <h2>Delivery Method</h2>
                                    </div>
                                    <div className="py-10 grid grid-cols-2 gap-10 border-b-2">
                                        <div className="">
                                            <label className="p-8 delivery-inputs rounded block w-full" htmlFor="delivery">
                                                <Radio id='delivery' name='deliveryMethod' value={'Y'} onChange={onChangeHandler} checked={checkoutDetails.deliveryMethod == 'Y'} />
                                                <span className="ml-4 font-semibold text-base">Delivery</span>
                                            </label>
                                        </div>
                                        <div className="">
                                            <label className=" p-8 delivery-inputs rounded block w-full" htmlFor="pickup">
                                                <Radio id='pickup' name='deliveryMethod' value={'N'} onChange={onChangeHandler} checked={checkoutDetails.deliveryMethod == 'N'} />
                                                <span className="ml-4 font-semibold text-base">Self Pick Up</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="pt-10 w-full">
                                        <div className="">
                                            <h2>Choose Delivery Address</h2>
                                        </div>
                                        <div className="pt-10 grid grid-cols-2 gap-10">
                                            {
                                                [...userAddress].map((item, i) => (
                                                    <div className="address" key={i}>
                                                        <div className=" p-8 delivery-inputs rounded block w-full" >
                                                            <Radio className='hidden' id={`address${i}`} name='deliveryAddress' checked={checkoutDetails.deliveryAddress == item.address_id} value={item.address_id} onChange={onChangeHandler} />
                                                            <div className="flex">
                                                                <div className="red-color">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                                                                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="ml-2 w-full">
                                                                    <h3 className="text-xl font-semibold">{item.address_tag}</h3>
                                                                    <div className="my-4">
                                                                        <span className="home">{item.address_line_1}, {item.address_line_2}</span>
                                                                        <span className="state-pin">{item.city}, {item.state} {item.zip_code},</span>
                                                                        <span className="country">{item.country},</span>
                                                                        <span className="country font-w-bold">+91 {item.phone}</span>
                                                                    </div>
                                                                    <button className="btn-color-revese my-2">Edit</button>
                                                                    {
                                                                        checkoutDetails.deliveryAddress != item.address_id &&
                                                                        <label className="block my-2 btn-bg btn-color py-3.5 px-8 rounded max-w-fit" htmlFor={`address${i}`} >Deliver Here</label>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* Payment options */}
                                <div className="w-full p-10 mt-10 bg-white rounded">
                                    <div className="">
                                        <h2>Choose Payment Option </h2>
                                    </div>
                                    <div className="pt-10 grid grid-cols-2 gap-10">
                                        <div className="">
                                            <label className="p-8 delivery-inputs rounded block w-full" htmlFor="online">
                                                <div className="flex">
                                                    <Radio className='mt-2' id='online' name='paymentMethod' value="Y" onChange={onChangeHandler} checked={checkoutDetails.paymentMethod == 'Y'} />
                                                    <div className="pl-4">
                                                        <h3 className="font-semibold text-base block">Online Payment</h3>
                                                        <span className="block text-base black-color-75 tracking-tight">( UPI, Credit/Debit cards, Wallet, Net banking )</span>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="">
                                            <label className="p-8 delivery-inputs rounded block w-full" htmlFor="cod">
                                                <div className="flex">
                                                    <Radio className='mt-2' id='cod' name='paymentMethod' value="N" onChange={onChangeHandler} checked={checkoutDetails.paymentMethod == 'N'} />
                                                    <div className="pl-4">
                                                        <h3 className="font-semibold text-base block">Cash On Delivery</h3>
                                                        <span className="block text-base black-color-75 tracking-tight">( Cash, UPI)</span>
                                                    </div>
                                                </div>
                                                <span className="text-xs red-color tracking-tighter">Cash on delivery is not eligible for wallet transactions</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    {/* Invoice section */}
                    <div className="w-full col-span-4">
                        <div className="bg-white">
                            <div className="p-10 border-b-2 rounded">
                                <h2>Promo / Gift Code</h2>
                            </div>
                            <div className="w-full p-10 flex justify-between items-baseline space-x-2">
                                <input type="text" className="text-lg font-medium w-full border-b-2 focus:outline-none focus:border-b-2 " placeholder="Have any Promo Code?" />
                                <button className="py-2 btn-color rounded px-4 text-base btn-bg ">Apply</button>
                            </div>
                        </div>
                        <div>
                            <div className=" mt-10 pb-10 bg-white rounded">
                                <div className="p-10 border-b-2 rounded">
                                    <h2>Invoice</h2>
                                </div>
                                {
                                    !!purchaseDetails &&
                                    <>
                                        <div className="p-10">
                                            <div className="flex justify-between space-x-2 border-b-2 border-dashed pb-6">
                                                <h6 className="text-lg font-semibold">Item Total</h6>
                                                <div>
                                                    <span className="black-color-75 text-base">{purchaseDetails.itemCount} item(s)</span>
                                                    <span className="text-lg font-medium ml-2">₹ {Number(purchaseDetails.totalOrderAmount).toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className=" border-b-2 border-dashed">

                                                <div className="flex justify-between space-x-2 my-4">
                                                    <h6 className="text-lg black-color font-medium">Delivery Charge</h6>
                                                    <div>
                                                        <span className="text-lg black-color font-medium ml-2">{purchaseDetails.totalDeliveryCharge ? `₹ ${Number(purchaseDetails.totalDeliveryCharge).toFixed(2)}` : 'Free'}</span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between space-x-2 my-4">
                                                    <h6 className="text-lg black-color font-medium">Tax</h6>
                                                    <div>
                                                        <span className="text-lg black-color font-medium ml-2">₹ {Number(purchaseDetails.totalTaxAmount).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                {
                                                    purchaseDetails?.totalConvenienceCharge ?
                                                        <div className="flex justify-between space-x-2 my-4">
                                                            <h6 className="text-lg black-color font-medium">Convenience Charge</h6>
                                                            <div>
                                                                <span className="text-lg black-color font-medium ml-2">₹ {Number(purchaseDetails.totalConvenienceCharge).toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                        : null
                                                }
                                                <div className="flex justify-between space-x-2 my-4">
                                                    <h6 className="text-lg black-color font-medium">Coupon Applied</h6>
                                                    <div>
                                                        <span className="text-lg black-color font-medium ml-2">₹ {Number(purchaseDetails.totalCouponSavingsAmount).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-2 my-4">
                                                    <h6 className="text-lg success-color font-medium">Discount</h6>
                                                    <div>
                                                        <span className="text-lg success-color font-medium ml-2">- ₹{Number(purchaseDetails.totalSavings).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-4 border-dashed">
                                                <h2 className="text-2xl font-bold">Total Amount</h2>
                                                <h2 className="text-2xl font-bold">₹ {Number(purchaseDetails.calculatedPurchaseTotal).toFixed(2)}</h2>
                                            </div>

                                        </div>
                                        <div className="text-center bg-success-color-lighter success-color py-4">
                                            <span className="text-base fonr-medium">Savings on Bill ₹ {Number(purchaseDetails.totalSavings).toFixed(2)}</span>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="mt-20">
                            {
                                !!purchaseDetails ?
                                    <Button className="w-full py-4 white-color rounded btn-bg text-center" onClick={initiatePayment} >Proceed to Pay ₹ {Number(purchaseDetails.calculatedPurchaseTotal).toFixed(2)}</Button>
                                    :
                                    <Button className="w-full py-4 white-color rounded btn-bg text-center" onClick={authToggle} >Login to Proceed</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    info: state.store.info,
    storeSettings: state.store.settings,
    user: state.user.currentUser,
    userAddress: state.user.address,
    checkout: state.checkout,

})
const mapDispatchToProps = dispatch => ({
    setBackendCart: (data) => dispatch(setBackendCartStart(data)),
    getPurchage: (id) => dispatch(getPurchageStart(id)),
    getAddress: (id) => dispatch(getAddressStart(id)),
    updateAddress: data => dispatch(updateAddressStart(data)),
    addAddressStart: data => dispatch(addAddressStart(data)),

    setDeliveryAddressToPurchase: (id) => dispatch(setDeliveryAddressToPurchase(id)),
    setPaymentMethod: data => dispatch(setPaymentMethod(data)),
    setShipmentMethod: data => dispatch(setShipmentMethod(data)),

    initiateOrder: (data) => dispatch(initiateOrderPymentStart(data)),
    clearCheckout: () => dispatch(clearCheckout()),
    createNewRzpOrder: (data) => dispatch(createNewRzpOrderStart(data)),

    authToggle: () => dispatch(authShowToggle())
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
