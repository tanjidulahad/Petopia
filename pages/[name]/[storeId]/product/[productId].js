import { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import ReactPlayer from 'react-player'
import { connect } from "react-redux";
import Head from "next/head";
import { Tooltip } from 'antd';
import ReactTooltip from 'react-tooltip';


// Component
import { QuantityID } from '@components/inputs'
// import Loader from "@components/loading/loader";
import currency from '@utils/currency'
import { Button } from "@components/inputs";
import PdpImage from "@components/pdp-image/pdp-image";
import ErrorPage from '@components/error/index'
import Loader from "@components/loading/loader";
import SimilaProductList from "@components/simila-product-list/similar-product-list";
// actions
import { addToCart, removeFromCart } from "@redux/cart/cart-actions";
// import { authShowToggle } from "@redux/user/user-action";
// import { addWishlistStart, removeWishlistStart } from '@redux/wishlist/wishlist-action'
import { productDetailsFetchStart, similarProductFetchStart, getAdditionalInfoStart, getSpecificationsStart, getProductVariantStart } from "@redux/product-details/product-actions";
// Components
import Rating from "@components/rating-stars/rating";
import PageWrapper from "@components/page-wrapper/page-wrapper";
import { getVariantItemByItemId } from "services/pickytoClient";

const visualsStructure = {
    view: false, // true if want to view on page otherwise false till product details are not fiiled in this object
    name: '',
    id: 0,
    categoryId: null,
    subCategoryId: null,
    storeId: null,
    defaultVariantItem: null,
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
    fetchProductDetails, fetchSimilarProducts, getAdditionalInfo, getSpecifications, fetchProductVariants }) => {
    const [success, onSuccess] = useState({})
    const [failure, onFailure] = useState(null)
    const [additionalinfo, setAdditionalInfo] = useState([])
    const [specifications, setSpecifications] = useState([])
    const [similarProducts, setSimilarProducts] = useState([])
    const [allVariants, setAllVariants] = useState([])
    const [defaultVariant, setDefaultVarian] = useState([])
    const [descriptions, setDescriptions] = useState('')
    const [viewdscmore, setViewdscmore] = useState(false)
    const [selectedVarientStyle, setSelectedVarientStyle] = useState([])
    const [keepVarients, setKeepVariants] = useState([])


    const colorVarients = ["COLOUR",
        "COLOURS",
        "COLOR",
        "COLORS",
        "SHADE",
        "SHADES",
        "Colr",
        "Color",
        "color"
    ]

    // Information for this page
    const [visuals, setVisuals] = useState(visualsStructure)
    const router = useRouter()
    useEffect(() => {
        const { productId } = router.query
        if (!productId) return;
        fetchProductDetails({ id: productId, onSuccess, onFailure })
        getAdditionalInfo({ setAdditionalInfo, id: productId })
        getSpecifications({ setSpecifications, id: productId })
        fetchSimilarProducts({ setSimilarProducts, id: productId })
        fetchProductVariants({ setAllVariants, id: productId })
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
        const images = [success.primary_img || '/img/default.webp']
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
            defaultVariantItem: success.defaultVariantItem,
            name: success.item_name,
            images: [...images],
            desc: success.item_desc || '',
            rating: { value: 4.5, count: 5.0 },
            price: {
                price: Number(success.price).toFixed(2),
                sale_price: Number(success.sale_price).toFixed(2),
                currency: currency['INR']
            },
            inventoryDetails: success.inventoryDetails,
            // specifications: [...defaultVariant.map((item) => ({ name: item.variant_group_name, value: item.variant_value_name }))],
            specifications: [...specifications],
            similarProducts: [...similarProducts],
            additionalinfo: [...additionalinfo],
            item: success
        })
    }, [success, similarProducts, additionalinfo, specifications])

    // marking default variant
    useEffect(() => {
        if (visuals.defaultVariantItem) {
            console.log("selectedVariantItem", visuals.defaultVariantItem)
            const defaultVar = Object.keys(visuals.defaultVariantItem).map(key => {
                if (key.includes("variant_value")) {
                    return visuals.defaultVariantItem[key]
                }
            }).filter(Boolean)
            // console.log("defaultV", defaultVar)
            const selectedDefaultVariant = defaultVar.map(e => e.variant_value_id)
            console.log("selectedDefaultVariant", selectedDefaultVariant)
            setSelectedVarientStyle(selectedDefaultVariant)

        }
    }, [visuals])

    // fetch item all variant combination
    const fetchVarientItemById = async (itemid, variantvalueid) => {
        setVisuals({
            ...visuals,
            view: false,
        })
        // console.log(itemid, variantvalueid)
        const res = await getVariantItemByItemId(itemid, variantvalueid)
        setVisuals({
            ...visuals,
            view: true,
        })
        return res.data;
    }

    // handle variant change
    const handleVarientOnChange = async (indices, groupName, imagedata, varientValueId) => {
        let images = visuals.images
        if (imagedata) {
            images = Object.values(imagedata).filter(Boolean)
        }

        selectedVarientStyle[indices - 1] = varientValueId
        let varientvalue = {}
        varientvalue[`variant_value_${indices}`] = varientValueId
        const allVariantsComb = await fetchVarientItemById(success.item_id, varientvalue);
        const shouldbeselect = getListedVarants(allVariantsComb, selectedVarientStyle)
        console.log("should be select", shouldbeselect)
        vanishVarients(indices, allVariantsComb)

        if (shouldbeselect) {
            // setDefaultItem(shouldbeselect);
            setVisuals({
                ...visuals,
                images: [...images],
                defaultVariantItem: shouldbeselect
            })
        }
        else {
            const defaultOnChange = allVariantsComb[Object.keys(allVariantsComb)[0]]
            if (defaultOnChange) {
                // setDefaultItem(defaultOnChange);
                setVisuals({
                    ...visuals,
                    images: [...images],
                    defaultVariantItem: defaultOnChange
                })
            }
        }

        // if (!imagedata) {
        //     return
        // }
        // else {
        //     const images = Object.values(imagedata).filter(Boolean)
        //     setVisuals({
        //         ...visuals,
        //         images: [...images],
        //     })
        // }

    }


    // get available variant after click if exist
    const getListedVarants = (object = {}, list = []) => {
        let variant = {};
        const giantList = Object.values(object)
        for (let i = 0; i < giantList.length; i++) {
            const x = giantList[i]
            let vari = []
            let flag = 0
            if (x.is_displayable == "Y") {
                for (let i = 0; i < list.length; i++) {
                    if (x[`variant_value_${i + 1}`]) {
                        // vari.push(x[`variant_value_${i + 1}`])
                        const variantx = x[`variant_value_${i + 1}`]
                        if (variantx?.variant_value_id == list[i]) {
                            flag = flag + 1
                        }
                    }
                }
            }
            if (flag == list.length) {
                return x
            }
            // variant.push(vari)
        }
        // let result = null
        // variant.forEach(element => {
        //     if (element.some(item => list.includes(item?.variant_value_id))) {
        //         result = element
        //     }
        // });
        // return result
        return null;
    }


    // vanish variant
    const vanishVarients = (indices, object) => {
        const keepVarient = allVariants.filter(item => item.indices == indices)
        const keep = keepVarient.map(element => element.variant_values)
        // const keep=keepProp.map(item=>item.variant_value_id)
        let result
        if (keepVarients.length) {
            result = keep[0].map(function (item) {
                if (keepVarients.includes(item.variant_value_id)) {
                    return item.variant_value_id
                }
            })
        }
        else {
            result = keep[0].map(a => a.variant_value_id);
        }
        // let result = keep[0].map(a => a.variant_value_id);
        console.log("keep clicked id", result)
        // setKeepVariants(result)
        let not_displayable = []
        let finalResult = []
        const giantList = Object.values(object)
        for (let i = 0; i < giantList.length; i++) {
            const x = giantList[i]
            let vari = []
            let flag = 0


            if (x["is_displayable"] == "N") {
                for (let i = 1; i <= 5; i++) {
                    if (x[`variant_value_${i}`]) {
                        // vari.push(x[`variant_value_${i + 1}`])
                        const variantx = x[`variant_value_${i}`]
                        if (variantx?.variant_value_id) {
                            // flag=flag+1
                            not_displayable.indexOf(variantx?.variant_value_id) == -1 ? not_displayable.push(variantx?.variant_value_id) : ""
                        }
                    }
                }
            }

            console.log("need not to display", not_displayable)

            if (x["is_displayable"] != "N") {
                for (let i = 1; i <= 5; i++) {
                    if (x[`variant_value_${i}`]) {
                        // vari.push(x[`variant_value_${i + 1}`])
                        const variantx = x[`variant_value_${i}`]
                        if (variantx?.variant_value_id) {
                            // flag=flag+1
                            result.indexOf(variantx?.variant_value_id) == -1 ? result.push(variantx?.variant_value_id) : ""
                        }
                    }
                }
            }

            // if(flag==list.length){
            //     return x
            // }
            // variant.push(vari)
        }
        if (not_displayable.length) {
            for (let i = 0; i < not_displayable.length; i++) {
                if (selectedVarientStyle[i] != not_displayable[i]) {
                    finalResult = result.filter(item => item != not_displayable[i])
                }
            }
            setKeepVariants(finalResult)
        }
        else {
            // console.log("need not to display",not_displayable)
            // console.log("now Displaying",result)
            setKeepVariants(result)
        }

    }

    console.log("final remaining", keepVarients)

    useEffect(() => { // SEO
        const dsc = success.item_name + ', ' + success.item_desc
        setDescriptions(dsc)
    }, [success])

    const itemAddToCart = () => {
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
            defaultVariantItem: visuals.defaultVariantItem
        }

        addToCart(productDataForCart)
    }

    const itemRemoveFromCart=()=>{
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
            defaultVariantItem: visuals.defaultVariantItem
        }
        removeFromCart(productDataForCart)
    }
    const quantityInCart = cart.filter(function (item) {
        if (visuals.defaultVariantItem) {
            if (item.defaultVariantItem) {
                if (item.defaultVariantItem.variant_item_id == visuals.defaultVariantItem.variant_item_id) {
                    return item
                }
            }
        }
        else if (item.item_id == visuals.id) {
            return item
        }
    })[0]?.quantity
    // console.log(quantityInCart, failure);
    console.log(specifications);
    console.log("product specification", allVariants)

    console.log("cart", cart)
    return (
        <>
            <Head>
                <title>{visuals.name}</title>
                <meta name="description" content={`${descriptions}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
                <meta property="og:description"
                    content={`${descriptions}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
                <meta name="keywords" content={`${descriptions} , Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />
            </Head>
            <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
                <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </button>
                <span className='text-base font-semibold'>Product</span>
            </div>
            {
                visuals.view ?
                    <section className="bg-black-color-lighter pdp">
                        <div className="w-full bg-white relative">
                            <div className="wrapper mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 py-20 px-4 sm:px-4 overflow-x-hidden">
                                    <div className="w-full ">
                                        {/* <img src={visuals.images[0]} alt={visuals.name} /> */}
                                        <PdpImage name={visuals.name} list={visuals.images} />
                                    </div>
                                    <div className="relative overflow-auto no-scrollbar w-full h-full">
                                        <div className=" lg:absolute w-full top-0">
                                            <span className="text-sm md:text-lg black-color-75 capitalize ">{visuals.item.item_status.toLowerCase()}</span>
                                            <h1 className="text-base md:text-lg xl:text-3xl my-6 font-semibold md:font-bold capitalize">{visuals.name.toLowerCase()}</h1>
                                            <div>
                                                <Rating />
                                            </div>
                                            <div className="my-4 md:my-6">
                                                <span className="text-lg md:text-xl my-6 black-color font-semibold">₹{visuals.defaultVariantItem ? visuals.defaultVariantItem.sale_price : visuals.price.sale_price}</span>
                                                {
                                                    visuals.price.sale_price != visuals.price.price &&
                                                    <span className="mx-2 md:mx-6 black-color-75 text-sm md:text-lg font-light line-through">₹{visuals.defaultVariantItem ? visuals.defaultVariantItem.list_price : visuals.price.price}</span>
                                                }
                                                {
                                                    visuals.defaultVariantItem ?
                                                        Boolean(visuals.defaultVariantItem.list_price - visuals.defaultVariantItem.sale_price) &&
                                                        <span className="mx-2 md:mx-6 success-color text-sm md:text-lg font-light">save ₹{visuals.defaultVariantItem.list_price - visuals.defaultVariantItem.sale_price}</span>
                                                        :
                                                        Boolean(visuals.price.price - visuals.price.sale_price) &&
                                                        <span className="mx-2 md:mx-6 success-color text-sm md:text-lg font-light">save ₹{visuals.price.price - visuals.price.sale_price}</span>
                                                }
                                            </div>
                                            <div className="my-6">
                                                <p className={`text-sm md:text-base black-color-75 text-justify md:text-left font-normal normal-case ${!viewdscmore && visuals.desc.length > 200 && 'product-truncate'} transition`}>
                                                    {visuals.desc}
                                                </p>
                                                {
                                                    visuals.desc.length > 200 &&
                                                    <Button className="btn-color-revers" onClick={() => setViewdscmore(!viewdscmore)}>{viewdscmore ? 'hide' : 'more'}.</Button>
                                                }
                                            </div>


                                            {/* varients */}
                                            {allVariants ? allVariants.map((item, idx) => <div key={idx} className="my-6">
                                                <p className="font-montMedium mb-2">{item.variant_group_name}</p>
                                                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                                                    {colorVarients.includes(item.variant_group_name) ? item.variant_values.map((varient, idx) => <li key={idx} className="mr-2">
                                                        <div onClick={() => handleVarientOnChange(item.indices, item.variant_group_name, varient.variant_value_images, varient.variant_value_id)} data-tip={varient.variant_value_name} className={`inline-block py-3 px-3 text-white rounded-full border-2 cursor-pointer ${selectedVarientStyle.includes(varient.variant_value_id) ? "btn-border" : ""}`} style={{ background: `${varient.variant_value_metadata ? varient.variant_value_metadata.color_hexcode : varient.variant_value_name}`, display: `${keepVarients.length && !keepVarients.includes(varient.variant_value_id) ? "none" : ""}` }}></div>
                                                        <ReactTooltip />
                                                    </li>)
                                                        :
                                                        item.variant_values.map((varient, idx) => <li key={idx} className="mr-2">
                                                            <div onClick={() => handleVarientOnChange(item.indices, item.variant_group_name, varient.variant_value_images, varient.variant_value_id)} className={`inline-block py-3 px-4 text-gray-500 border-2 border-gray-300 rounded-lg cursor-pointer ${selectedVarientStyle.includes(varient.variant_value_id) ? "btn-border" : ""}`}
                                                                style={{ display: `${keepVarients.length && !keepVarients.includes(varient.variant_value_id) ? "none" : ""}` }}
                                                            >{varient.variant_value_name}</div>
                                                        </li>
                                                        )
                                                    }
                                                </ul>


                                            </div>)
                                                : ""
                                            }


                                            <div>
                                                {visuals.defaultVariantItem && visuals.defaultVariantItem.variant_item_status == "UNAVAILABLE" ? <Button className="w-full md:w-auto py-3 px-12 text-base border-2 border-slate-300 text-slate-400 rounded font-bold cursor-not-allowed" >Unavailable</Button>
                                                    :
                                                    quantityInCart ?
                                                        <QuantityID value={quantityInCart} disabledPlush={(() => {
                                                            if (visuals.inventoryDetails) {
                                                                return visuals.inventoryDetails.max_order_quantity == quantityInCart && visuals.inventoryDetails.max_order_quantity > 0 || visuals.inventoryDetails.inventory_quantity <= quantityInCart
                                                            }
                                                            return false
                                                        })()}
                                                            onPlush={itemAddToCart} onMinus={itemRemoveFromCart} />
                                                        :
                                                        <Button className="w-full md:w-auto py-3 px-12 text-base btn-bg btn-color rounded" onClick={itemAddToCart} >Add</Button>
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
                                                    //     <h6 className="text-base font-semibold md:text-xl md:font-medium">Size</h6>
                                                    //     <div className="flex mt-6">
                                                    //         {
                                                    //             varient.map(() => (
                                                    //                 <div className="mr-6 size-tab-active rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    //                     <span className="text-base md:text-xl font-medium">S</span>
                                                    //                 </div>

                                                    //             ))
                                                    //         }
                                                    //     </div>
                                                    // </>))
                                                }
                                                {/* <h6 className="text-base font-semibold md:text-xl md:font-medium">Size</h6>
                                            <div className="flex mt-6">
                                                <div className="mr-6 size-tab rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    <span className="text-base md:text-xl font-medium">M</span>
                                                </div>
                                                <div className="mr-6 size-tab rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    <span className="text-base md:text-xl font-medium">L</span>
                                                </div>
                                                <div className="mr-6 size-tab rounded flex items-center justify-center border-2 w-12 h-12 ">
                                                    <span className="text-base md:text-xl font-medium">XL</span>
                                                </div>
                                            </div> */}
                                            </div>
                                            {
                                                !!visuals.specifications.length &&
                                                <div className="mt-14">
                                                    <div className="border-l-8 border-static additional-info mb-8">
                                                        <h3 className="ml-4 md:ml-8 text-base md:text-xl">
                                                            Product Specification
                                                        </h3>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {
                                                            visuals.specifications.map((item, i) => (
                                                                <div className="py-3 border-b-2 " key={i}>
                                                                    <h6 className="text-sm font-semibold black-color-75">{item.attribute_key}</h6>
                                                                    <h3 className="text-base font-semibold black-color mt-1">{item.attribute_value}</h3>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div></div>
                                </div>
                            </div>
                        </div>
                        {
                            visuals.additionalinfo.length ?
                                <div className="w-full mt-3 bg-white ">
                                    <div className="wrapper mx-auto">
                                        <div className="py-20  px-4 sm:px-4">
                                            <div className="border-l-8 border-static additional-info">
                                                <h3 className="ml-4 md:ml-8 text-base md:text-xl">
                                                    Additional Info
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 mt-10  gap-y-10 gap-x-4 md:gap-8 lg:gap-x-16 xl:gap-x-24">
                                                {/* // <div className="grid grid-cols-2 mt-10 gap-y-10 gap-x-36"> */}
                                                {
                                                    visuals.additionalinfo.map((item, i) => (
                                                        <div className="w-full" key={i} >
                                                            <div className="w-full product-addinfo-img-c border rounded">
                                                                {
                                                                    item.media_type == "IMAGE" ?
                                                                        <img className="w-full h-full object-fill" src={item.media_url} alt='...' />
                                                                        :
                                                                        <ReactPlayer height={'100%'} width={'100%'} url={item.media_url} />
                                                                }
                                                            </div>
                                                            <div className="mt-8">
                                                                <h2 className="text-base md:text-xl font-semibold capitalize">{item.title}{item.title.toLowerCase()}</h2>
                                                                <p className="mt-6 text-sm md:text-lg black-color-75 leading-7 tracking-tight normal-case">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        }
                        {
                            !!visuals.similarProducts.length &&
                            <div className="w-full mt-3 bg-white ">
                                <div className="wrapper mx-auto">
                                    <div className="py-20  px-4 sm:px-4 carousel-container space-y-8">
                                        <div className="border-l-8 border-static additional-info">
                                            <h3 className="ml-4 md:ml-8 text-base md:text-xl">
                                                Similar Products
                                            </h3>
                                        </div>
                                        <SimilaProductList list={visuals.similarProducts} />
                                    </div>
                                </div>
                            </div>
                        }
                    </section >
                    : failure
                        ?
                        <ErrorPage message={failure.message || 'Something went wrong!'} />
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
    fetchProductVariants: (payload) => dispatch(getProductVariantStart(payload)),
    fetchSimilarProducts: (payload) => dispatch(similarProductFetchStart(payload)),
    getAdditionalInfo: (payload) => dispatch(getAdditionalInfoStart(payload)),
    getSpecifications: (payload) => dispatch(getSpecificationsStart(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(ProductDetails));




