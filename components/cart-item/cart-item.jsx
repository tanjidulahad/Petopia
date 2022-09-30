import { connect } from "react-redux";
import Link from "@components/link";
import { addToCart, removeFromCart, deleteItemFromCart } from "@redux/cart/cart-actions";
import { Button, QuantityID } from "../inputs";
const CartItem = ({ addToCart, deleteFromCart, removeFromCart, data, isDetailsLoading,info }) => {
    return (
        <div className="w-100 block ">
            <div className="grid grid-cols-12 gap-4 ">
                <div className="col-span-8 sm:col-span-7 flex sm:space-x-4">
                    <Link href={`/product/${data.item_id}`}>
                        <a className="cart-item-img hidden sm:block">
                            {/* <div className="cart-item-img"> */}
                            <img className="object-cover bg-slate-200 rounded-md" src={data.primary_img || '/img/default.webp'} alt="product" />
                            {/* </div> */}

                        </a>
                    </Link>
                    <div className="flex flex-col justify-between">
                        <Link href={`/product/${data.item_id}`}>
                            <a className="block">
                                <h3 className=" text-base sm:text-xl capitalize cart-item-title">{data?.item_name?.toLowerCase()}</h3>
                            </a>
                        </Link>
                        {data.defaultVariantItem && <p>{Object.keys(data.defaultVariantItem).map(function (key) {
                            if (key.includes('variant_value')) {
                                if (data.defaultVariantItem[key] != null) {
                                    return <span>{data.defaultVariantItem[key].variant_value_name}, </span>
                                }
                            }


                        })}</p>}
                        <div>
                            <span className="font-medium black-color-75  text-base sm:text-xl inline-block sm:mr-2">{info.currency_symbol}{data.sale_price}</span>
                            {
                                data.sale_price != data.price &&
                                <span className=" text-base sm:text-base black-color-50 line-through ml-4 lg:ml-0 xl:ml-4 inline-block">{info.currency_symbol}{data.price}</span>
                            }
                            {
                                (data.price - data.sale_price) &&
                                <span className=" text-base sm:text-base success-color ml-4 lg:ml-0 xl:ml-4 inline-block">Save {info.currency_symbol} {data.price - data.sale_price}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-span-4 sm:col-span-5">
                    <div className="flex flex-col sm:flex-row justify-between w-full h-full items-end sm:items-center space-y-3">
                        <div>
                            {
                                // data?.item_status is dependent on orderDetails api's {invalidReason: "CURRENTLY_UNAVAILABLE"} data
                                data?.item_status == false && data?.item_status != undefined ?
                                    < div >
                                        <Button className="text-sm red-color font-bold" onClick={() => deleteFromCart(data)} >Remove</Button>
                                    </div>
                                    :
                                    <QuantityID value={data.quantity} disabled={isDetailsLoading} disabledPlush={(() => {
                                        if (data.inventoryDetails) {
                                            return data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity
                                        }
                                        return false
                                    })()}
                                        onPlush={() => addToCart(data)} onMinus={() => removeFromCart(data)} />
                            }
                        </div>
                        <div>
                            <h2 className="font-bold black-color text-base sm:text-2xl block w-full">{info.currency_symbol}{data.quantity * data.sale_price}</h2>
                        </div>
                    </div>
                </div>
            </div>
            {
                data?.item_status == false && data?.item_status != undefined &&
                < div >
                    <span className=" text-xs sm:text-sm red-color">*Sorry, This product is currently unavailable.</span>
                </div>
            }
            {
                !!data.inventoryDetails && (data?.item_status == true || data?.item_status == undefined) && <>
                    {
                        data.inventoryDetails.min_order_quantity > 1 &&
                        <div className="">
                            <span className="text-xs sm:text-sm red-color">*Minimum order quantity is {data.inventoryDetails.min_order_quantity}.</span>
                        </div>
                    } {
                        data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity &&
                        <div className="">
                            <span className="text-xs sm:text-sm success-color">*You reached to maximum order quantity.</span>
                        </div>
                    }
                </>
            }
        </div >
    )
}

const mapStateToProps = state => ({
    isDetailsLoading: state.ui.isDetailsLoading,
    info:state.store.info
})

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    deleteFromCart: (item) => dispatch(deleteItemFromCart(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);