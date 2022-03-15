import { useEffect } from "react"
import { connect } from "react-redux"
import Link from "next/link"

// Components
import { setBackendCartStart, getPurchageStart } from "../redux/checkout/checkout-action"
import CartItem from "../components/cart-item/cart-item";
import { Radio } from "../components/inputs";

const Cart = ({ user, cart, store, checkout, setBackendCart, getPurchage }) => {
    const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
    useEffect(() => { // Get Purchase Id
        if (!cart.length) return;
        if (checkout.purchase?.purchase_id || !store) return;
        const data = {
            [store.store_id]: [
                ...cart.map(item => ({
                    item_id: item.item_id,
                    barcode_id: null,
                    quantity: item.quantity,
                    variant_item_id: item.defaultVariantItem?.variant_item_id | null,
                }))
            ]
        }
        if (!checkout.purchase && user) {
            setBackendCart({ userId: user.customer_id, groupId: store.group_id, data })
        }
    }, [user, checkout.purchase])
    useEffect(() => {
        if (checkout.purchase?.purchase_id) {
            getPurchage(checkout.purchase?.purchase_id)
        }
    }, [])
    console.log(cart.length);
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

                        {/* Delivery method */}
                        <div className="w-full mt-10 p-10 bg-white rounded">
                            <div className="">
                                <h2>Delivery Method</h2>
                            </div>
                            <div className="py-10 grid grid-cols-2 gap-10 border-b-2">
                                <div className="">
                                    <label className="p-8 delivery-inputs rounded block w-full" htmlFor="delivery">
                                        <Radio id='delivery' name='delivery-method' />
                                        <span className="ml-4 font-semibold text-base">Delivery</span>
                                    </label>
                                </div>
                                <div className="">
                                    <label className=" p-8 delivery-inputs rounded block w-full" htmlFor="pickup">
                                        <Radio id='pickup' name='delivery-method' />
                                        <span className="ml-4 font-semibold text-base">Self Pick Up</span>
                                    </label>
                                </div>
                            </div>
                            <div className="pt-10 w-full">
                                <div className="">
                                    <h2>Delivery Method</h2>
                                </div>
                                <div className="pt-10 grid grid-cols-2 gap-10">
                                    <div className="address">
                                        <div className=" p-8 delivery-inputs rounded block w-full" htmlFor="2">
                                            <Radio className='hidden' id='2' name='delivery-method' />
                                            <div className="flex">
                                                <div className="red-color">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                                                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-2 w-full">
                                                    <h3 className="text-xl font-semibold">Home</h3>
                                                    <div className="my-4">
                                                        <span className="black-color-75">No:12 Kumaran Senthil Apts, Gandhi nagar, Velachery, Chennai - 20.</span>
                                                    </div>
                                                    <button className="btn-color-revese my-2">Edit</button>
                                                    <label className="block my-2 btn-bg btn-color py-3.5 px-8 rounded max-w-fit" role={'button'}>Deliver Here</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="address active">
                                        <div className=" p-8 delivery-inputs rounded block w-full" htmlFor="2">
                                            <Radio className='hidden' id='2' name='delivery-method' />
                                            <div className="flex">
                                                <div className="red-color">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                                                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-2 w-full">
                                                    <h3 className="text-xl font-semibold">Home</h3>
                                                    <div className="my-4">
                                                        <span className="black-color-75">No:12 Kumaran Senthil Apts, Gandhi nagar, Velachery, Chennai - 20.</span>
                                                    </div>
                                                    <button className="btn-color-revese my-2">Edit</button>
                                                    <label className="set-delivery block my-2 btn-bg btn-color py-3.5 px-8 rounded max-w-fit" role={'button'}>Deliver Here</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                    <label className="p-8 delivery-inputs rounded block w-full" htmlFor="p1">
                                        <div className="flex">
                                            <Radio className='mt-2' id='p1' name='payment-method' />
                                            <div className="pl-4">
                                                <h3 className="font-semibold text-base block">Online Payment</h3>
                                                <span className="block text-base black-color-75 tracking-tight">( UPI, Credit/Debit cards, Wallet, Net banking )</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="">
                                    <label className="p-8 delivery-inputs rounded block w-full" htmlFor="p2">
                                        <div className="flex">
                                            <Radio className='mt-2' id='p2' name='payment-method' />
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
                        <div className=" mt-10 pb-10 bg-white rounded">
                            <div className="p-10 border-b-2 rounded">
                                <h2>Invoice</h2>
                            </div>
                            <div className="p-10">
                                <div className="flex justify-between space-x-2 border-b-2 border-dashed pb-6">
                                    <h6 className="text-lg font-semibold">Item Total</h6>
                                    <div>
                                        <span className="black-color-75 text-base">{totalItems} item(s)</span>
                                        <span className="text-lg font-medium ml-2">₹ 300</span>
                                    </div>
                                </div>
                                <div className=" border-b-2 border-dashed">
                                    <div className="flex justify-between space-x-2 my-4">
                                        <h6 className="text-lg success-color font-medium">Discount</h6>
                                        <div>
                                            <span className="text-lg success-color font-medium ml-2">- ₹ 300</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-2 my-4">
                                        <h6 className="text-lg black-color font-medium">Delivery Charge</h6>
                                        <div>
                                            <span className="text-lg black-color font-medium ml-2">₹ 200</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4 border-dashed">
                                    <h2 className="text-2xl font-bold">Total Amount</h2>
                                    <h2 className="text-2xl font-bold">₹ 500</h2>
                                </div>
                            </div>
                            <div className="text-center bg-success-color-lighter success-color py-4">
                                <span className="text-base fonr-medium">Savings on Bill ₹ 300.00</span>
                            </div>
                        </div>
                        <div className="mt-20">
                            <button className="w-full py-4 white-color rounded btn-bg text-center">Proceed to Pay ₹ 500.00</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    store: state.store.shop,
    user: state.user.currentUser,
    checkout: state.checkout,

})
const mapDispatchToProps = dispatch => ({
    setBackendCart: (data) => dispatch(setBackendCartStart(data)),
    getPurchage: (id) => dispatch(getPurchageStart(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
