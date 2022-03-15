import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import Head from "next/head";
import { connect } from "react-redux";

// Component
import { QuantityID } from '../../components/inputs'
import Loader from "../../components/loading/loader";
import currency from '../../utils/currency'

// actions
import { addToCart, removeFromCart } from "../../redux/cart/cart-actions";
// import { authShowToggle } from "../../redux/user/user-action";
// import { addWishlistStart, removeWishlistStart } from '../../redux/wishlist/wishlist-action'
import { productDetailsFetchStart, similarProductFetchStart, getAdditionalInfoStart, getSpecificationsStart } from "../../redux/product-details/product-actions";
// Components
import Rating from "../../components/rating-stars/rating";
import { route } from "next/dist/server/router";

const visualsStructure = {
    view: false, // true if want to view on page otherwise false till product details are not fiiled in this object
    name: '',
    id: 0,
    categoryId: null,
    subCategoryId: null,
    storeId: null,
    images: [], // First element will be primary image
    desc: '',
    rating: { value: 4.5, count: 5.0 },
    price: {
        price: Number(0).toFixed(2), //499.90
        sale_price: Number().toFixed(2), //399.99
        currency: currency['INR'] // INR == ₹ USD == $
    },
    inventoryDetails: null,
    specifications: [],
    additionalinfo: [],
    similarProducts: []  //[...similarProducts]
}

const ProductDetails = ({
    cart, addToCart, removeFromCart,
    fetchProductDetails, fetchSimilarProducts, getAdditionalInfo, getSpecifications }) => {
    const [success, onSuccess] = useState({})
    const [failure, onFailure] = useState(null)
    const [additionalinfo, setAdditionalInfo] = useState([])
    const [specifications, setSpecifications] = useState([])
    const [similarProducts, setSimilarProducts] = useState([])
    const [defaultVariant, setDefaultVarian] = useState([])
    // Information for this page
    const [visuals, setVisuals] = useState(visualsStructure)
    const router = useRouter()
    useEffect(() => {
        const { productId } = router.query
        if (!productId) return;
        fetchProductDetails({ id: productId, onSuccess, onFailure })
        getAdditionalInfo({ setAdditionalInfo, id: productId })
        getSpecifications({ setSpecifications, id: productId })
        // fetchSimilarProducts({ setSimilarProducts, id: productId })
    }, [router.isReady])
    useEffect(() => {
        // Run with Product change
        if (!Object.keys(success).length || !success) {
            return
        }
        // Setting Up varient
        const getVariant = []
        if (success.is_customizable == "Y" && success.defaultVariantItem) {
            const setGetVariant = (item => {
                for (let i = 0; i < getVariant.length; i++) {
                    const variant = getVariant[i]
                    if (variant[0].variant_group_id != item.variant_group_id) continue;
                    getVariant[i].push(item)
                    return
                }
                getVariant.push([item]);
            })
            const totalVariant = []
            const defaultVariant = success.defaultVariantItem;
            for (let i = 1; i <= 5; i++) {
                if (defaultVariant[`variant_value_${i}`]) {
                    setGetVariant(defaultVariant[`variant_value_${i}`])
                }
            }
            // console.log(getVariant);
            setDefaultVarian(getVariant)
        }
        // SetingUp images
        const images = [success.primary_img || '/img/default.png']
        for (let i = 1; i <= 5; i++) {
            if (success[`img_url_${i}`]) {
                images.push(success[`img_url_${i}`])
            }
        }
        setVisuals({
            ...visuals,
            view: true,
            id: success.item_id,
            categoryId: success.category_id,
            subCategoryId: success.sub_category_id,
            storeId: success.store_id,
            variantId: success.defaultVariantItem?.variant_item_id,
            name: success.item_name,
            images: [...images],
            desc: success.item_desc,
            rating: { value: 4.5, count: 5.0 },
            price: {
                price: Number(success.price).toFixed(2),
                sale_price: Number(success.sale_price).toFixed(2),
                currency: currency['INR']
            },
            inventoryDetails: success.inventoryDetails,
            specifications: [...defaultVariant.map((item) => ({ name: item.variant_group_name, value: item.variant_value_name }))],
            // specifications: [...specifications],
            similarProducts: [...similarProducts],
            additionalinfo: [...additionalinfo],
            item: success
        })
    }, [success, similarProducts, additionalinfo, specifications])
    const productDataForCart = {
        item_id: visuals.id,
        store_id: visuals.storeId,
        category_id: visuals.categoryId,
        item_name: visuals.name,
        sale_price: visuals.price.sale_price,
        price: visuals.price.price,
        sub_category_id: visuals.subCategoryId,
        primary_img: visuals.images[0],
        is_veg: visuals.item?.is_veg,
        inventoryDetails: visuals.inventoryDetails,
    }
    const quantityInCart = cart.filter((item) => item.item_id == visuals.id)[0]?.quantity
    console.log(quantityInCart);
    return (
        <>
            {
                visuals.view ?
                    <section className="bg-black-color-lighter pdp">
                        <div className="w-full bg-white">
                            <div className="wrapper mx-auto">
                                <div className="grid grid-cols-2 gap-10 py-20">
                                    <div className="w-100 ">
                                        <img src={visuals.images[0]} alt={visuals.name} />
                                    </div>
                                    <div>
                                        <span className="text-lg black-color-75 capitalize ">{visuals.item.item_status.toLowerCase()}</span>
                                        <h1 className="text-3xl my-6 font-bold capitalize">{visuals.name.toLowerCase()}</h1>
                                        <div>
                                            <Rating />
                                        </div>
                                        <div className="my-6">
                                            <span className="text-xl my-6 black-color font-semibold">₹{visuals.price.sale_price}</span>
                                            {
                                                visuals.price.sale_price != visuals.price.price &&
                                                <span className="mx-6 black-color-75 text-lg font-light line-through">₹{visuals.price.price}</span>
                                            }
                                            {
                                                Boolean(visuals.price.price - visuals.price.sale_price) &&
                                                <span className="mx-6 success-color text-lg font-light">save ₹{visuals.price.price - visuals.price.sale_price}</span>
                                            }
                                        </div>
                                        <div className="my-6">
                                            <span className="text-xl black-color-75 font-normal normal-case">
                                                {visuals.item_desc}
                                            </span>
                                        </div>
                                        <div>
                                            {
                                                quantityInCart ?
                                                    <QuantityID value={quantityInCart} disabledPlush={(() => {
                                                        if (visuals.inventoryDetails) {
                                                            return visuals.inventoryDetails.max_order_quantity == quantityInCart && visuals.inventoryDetails.max_order_quantity > 0 || visuals.inventoryDetails.inventory_quantity <= quantityInCart
                                                        }
                                                        return false
                                                    })()}
                                                        onPlush={() => addToCart(productDataForCart)} onMinus={() => removeFromCart(productDataForCart)} />
                                                    :
                                                    <button className="py-3 px-14 text-2xl bg-red-color white-color rounded" onClick={() => addToCart(productDataForCart)} >Add</button>
                                            }
                                        </div>
                                        {
                                            visuals.inventoryDetails ?
                                                <>
                                                    {
                                                        visuals.inventoryDetails.min_order_quantity > 0 &&
                                                        <div className="">
                                                            <span className="text-sm black-color-75">*Minimum order quantity is {visuals.inventoryDetails.min_order_quantity}.</span>
                                                        </div>
                                                    } {
                                                        (visuals.inventoryDetails.max_order_quantity == quantityInCart && visuals.inventoryDetails.max_order_quantity > 0) || visuals.inventoryDetails.inventory_quantity == quantityInCart &&
                                                        <div className="">
                                                            <span className="text-sm success-color">*You reached to maximum order quantity {visuals.inventoryDetails.max_order_quantity}.</span>
                                                        </div>
                                                    }
                                                </>
                                                : <></>
                                        }
                                        <div className="my-6">
                                            {
                                                console.log(defaultVariant)
                                                // defaultVariant.map(varient => (<>
                                                //     <h6 className="text-xl font-medium">Size</h6>
                                                //     <div className="flex mt-6">
                                                //         {
                                                //             varient.map(() => (
                                                //                 <div className="mr-6 size-tab-active rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                //                     <span className="mr- text-xl font-medium">S</span>
                                                //                 </div>

                                                //             ))
                                                //         }
                                                //     </div>
                                                // </>))
                                            }
                                            {/* <h6 className="text-xl font-medium">Size</h6>
                                            <div className="flex mt-6">
                                                <div className="mr-6 size-tab rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    <span className="text-xl font-medium">M</span>
                                                </div>
                                                <div className="mr-6 size-tab rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    <span className="text-xl font-medium">L</span>
                                                </div>
                                                <div className="mr-6 size-tab rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    <span className="text-xl font-medium">XL</span>
                                                </div>
                                            </div> */}
                                        </div>
                                        {
                                            !!visuals.specifications.length &&
                                            <div className="mt-14">
                                                <div className="border-l-8 additional-info mb-8">
                                                    <h3 className="ml-8 text-xl">
                                                        Additional Info
                                                    </h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {
                                                        visuals.specifications.map((item, i) => (
                                                            <div className="py-3 border-b-2 " key={i}>
                                                                <h6 className="text-xs font-semibold black-color-75">{item.attribute_key}</h6>
                                                                <h3 className="text-base font-semibold black-color mt-1">{item.attribute_value}</h3>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            visuals.additionalinfo.lenght ?
                                <div className="w-full mt-3 bg-white ">
                                    <div className="wrapper mx-auto">
                                        <div className="py-20">
                                            <div className="border-l-8 additional-info">
                                                <h2 className="ml-8 text-2xl">
                                                    Additional Info
                                                </h2>
                                            </div>
                                            <div className="grid grid-cols-2 mt-10 gap-y-10 gap-x-36">
                                                {
                                                    visuals.additionalinfo.map((item, i) => (
                                                        <div className="grid grid-cols-2 mt-10 gap-y-10 gap-x-36">
                                                            <div className="w-full" >
                                                                <div className="w-full">
                                                                    <img src={itme.media_url} alt='...' />
                                                                </div>
                                                                <div className="mt-8">
                                                                    <h2 className="text-xl font-semibold capitalize">{item.title}{item.title.toLowerCase()}</h2>
                                                                    <p className="mt-6 text-lg black-color-75 leading-7 tracking-tight normal-case">
                                                                        {
                                                                            item.description
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        }
                    </section >
                    : failure
                        ?
                        <div>{failure.message}</div>
                        :
                        <Loader />

            }
        </>
    )
}

const mapStateToProps = state => ({
    // Other States
    cart: state.cart,
    wishlist: state.wishlist.list,
})
const mapDispatchToProps = dispatch => ({
    // Cart Dispatch
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    // addToWishlist: (item) => dispatch(addWishlistStart(item)),
    // removeFromWishlist: (item) => dispatch(removeWishlistStart(item)),
    // openAuth: () => dispatch(authShowToggle()),
    // Product Dispatch
    fetchProductDetails: (payload) => dispatch(productDetailsFetchStart(payload)),
    fetchSimilarProducts: (payload) => dispatch(similarProductFetchStart(payload)),
    getAdditionalInfo: (payload) => dispatch(getAdditionalInfoStart(payload)),
    getSpecifications: (payload) => dispatch(getSpecificationsStart(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);




