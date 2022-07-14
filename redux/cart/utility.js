import orderlList from "@components/Cards/orderDetail/orderList/orderlList";

export const addCartItem = (cartItems, cartItemToAdd) => {

    const extingCartItem = cartItems.find(function (cartItem) {
        if (cartItemToAdd.defaultVariantItem) {
            if (cartItem.defaultVariantItem) {
                if (cartItem.defaultVariantItem.variant_item_id == cartItemToAdd.defaultVariantItem.variant_item_id) {
                    return cartItem
                }

            }
        }
        else if (cartItem.item_id === cartItemToAdd.item_id) {
            return cartItem
        }
    });


    if (extingCartItem) {
        return cartItems.map(cartItem => (
            cartItemToAdd.defaultVariantItem && cartItem.defaultVariantItem ? cartItem.defaultVariantItem.variant_item_id == cartItemToAdd.defaultVariantItem.variant_item_id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem : cartItem.item_id === cartItemToAdd.item_id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            // cartItem.defaultVariantItem ? cartItem.defaultVariantItem.variant_item_id == cartItemToAdd.defaultVariantItem.variant_item_id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem : cartItem.item_id === cartItemToAdd.item_id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ))
    }
    else {

        return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
    }
}

export const removeFromCart = (cartItems, cartItemToRemove) => {
    // const extingCartItem = cartItems.find(cartItem => cartItem.item_id === cartItemToRemove.item_id);
    // const extingCartItem = cartItems.find(function(cartItem) {
    //     if(cartItemToRemove.defaultVariantItem){
    //         if(cartItem.defaultVariantItem){
    //             if(cartItem.defaultVariantItem.variant_item_id==cartItemToRemove.defaultVariantItem.variant_item_id){
    //                 return cartItem
    //             }

    //         }
    //     } 
    //     else if(cartItem.item_id === cartItemToRemove.item_id){
    //     return cartItem
    //     }
    // });

    // if (extingCartItem?.quantity === 1) {
    //     return cartItems.filter( function(cartItem) {
    //         if(cartItemToRemove.defaultVariantItem && cartItem.defaultVariantItem){
    //             if(cartItemToRemove.defaultVariantItem.variant_item_id==cartItem.defaultVariantItem.variant_item_id){
    //                 return false
    //             }
    //             else{
    //                 return true
    //             }

    //         }
    //         else if(cartItem.item_id !== cartItemToRemove.item_id){
    //             return false
    //         }
    //         else{
    //             return true
    //         }

    //     })
    // }


    // if (extingCartItem) {
    //     return cartItems.map(cartItem => (
    //         cartItem.defaultVariantItem?cartItem.defaultVariantItem.variant_item_id == cartItemToRemove.defaultVariantItem.variant_item_id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem  :  cartItem.item_id === cartItemToRemove.item_id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    //     ))
    // }

    const extingCartItem = cartItems.find(function (cartItem) {
        if (cartItemToRemove.defaultVariantItem) {
            if (cartItem.defaultVariantItem) {
                if (cartItem.defaultVariantItem.variant_item_id == cartItemToRemove.defaultVariantItem.variant_item_id) {
                    return cartItem
                }

            }
        }
        else if (cartItem.item_id === cartItemToRemove.item_id) {
            return cartItem
        }
    });


    if (extingCartItem?.quantity === 1) {
        return cartItems.filter(function (cartItem) {
            if (cartItemToRemove.defaultVariantItem && cartItem.defaultVariantItem) {
                if (cartItem.defaultVariantItem.variant_item_id == cartItemToRemove.defaultVariantItem.variant_item_id) {
                    return false
                }
                else {
                    return true
                }

            }
            else if (cartItem.item_id == cartItemToRemove.item_id) {
                return false
            }
            else {
                return true
            }
        })
    }

    if (extingCartItem) {
        return cartItems.map(cartItem => (
            cartItemToRemove.defaultVariantItem && cartItem.defaultVariantItem ? cartItem.defaultVariantItem.variant_item_id == cartItemToRemove.defaultVariantItem.variant_item_id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem : cartItem.item_id === cartItemToRemove.item_id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            // cartItem.defaultVariantItem ? cartItem.defaultVariantItem.variant_item_id == cartItemToRemove.defaultVariantItem.variant_item_id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem : cartItem.item_id === cartItemToRemove.item_id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        ))
    }
}

export const deleteFromCart = (cartItems, cartItemToRemove) => {
    const extingCartItem = cartItems.find(cartItem => cartItem.item_id === cartItemToRemove.item_id);
    if (extingCartItem.quantity > 0) {
        return cartItems.filter(cartItem => cartItem.item_id !== cartItemToRemove.item_id)
    }
    return cartItems;
}

export const filterCart = (cartItems, orderDetails) => {
    // const backendCart = Object.values(Object.values(orderDetails.orders)[0].orderItems).map(item => ({
    //Retriving items from Order details ***it is very mess
    let storeName = "";
    const ordersList = Object.values(orderDetails.orders)

    const backendCart = ordersList.map(item => item.orderItems).reduce((rv, item) => [...rv, ...Object.values(item)], []).map(function (item) {

        return ({
            item_id: Number(item.itemId),
            quantity: item.itemQuantity,
            category_id: item.categoryId,
            item_name: item.itemName,
            sale_price: item.discountedItemPrice,
            price: item.itemPrice,
            store_id: item.storeId,
            sub_category_id: item?.sub_category_id,
            primary_img: item.itemImg,
            item_status: item.invalidReason == 'CURRENTLY_UNAVAILABLE' ? false : true,
            is_veg: item.isVeg,
            orderId: item.orderId,
            store_name: orderDetails.orders[item.orderId]?.storeName,
            store_logo: orderDetails?.orders?.[item.orderId]?.storeLogoUrl || '/img/default.webp',
            defaultVariantItem: item.customizationDetails ? { ...item.customizationDetails } : null
        })
    }) // Item id and quantity filter
    if (backendCart.length > 0) {
        // const newCartItem = [...cartItems.length > backendCart.length ? cartItems : backendCart].map(item => {
        //     return [...cartItems.length < backendCart.length ? backendCart : cartItems].some(val => {
        //         if (item.item_id == val.item_id) {
        //             newCart.push({ ...item, quantity: val.quantity })
        //             return true;
        //         }
        //     })
        // })
        // const newCartItem = backendCart.map(item => {
        //     return cartItems.some(val => {
        //         if (item.item_id == val.item_id) {
        //             newCart.push({ ...item, quantity: val.quantity })
        //             return true;
        //         }
        //     })
        // })

        return backendCart //newCart
    } else {
        // return backendCart
        return cartItems
    }

}
// export const filterCart = (cartItems, orderDetais) => {
//     const backendCart = Object.values(Object.values(orderDetais.orders)[0].orderItems).map(item => ({
//         item_id: item.itemId,
//         quantity: item.itemQuantity,
//         category_id: item.categoryId,
//         item_name: item.itemName,
//         sale_price: item.discountedItemPrice,
//         price: item.itemPrice,
//         store_id: item.storeId,
//         sub_category_id: 98,
//         primary_img: item.itemImg,
//         is_veg: item.isVeg,
//     })) // Item id and quantity filter

//     if (backendCart.length) {
//         const newCart = []
//         const newCartItem = [...cartItems.length > backendCart.length ? cartItems : backendCart].map(item => {
//             return [...cartItems.length < backendCart.length ? backendCart : cartItems].some(val => {
//                 if (item.item_id == val.item_id) {
//                     newCart.push({ ...item, quantity: val.quantity })
//                     return true;
//                 }
//             })
//         })

//         return newCart
//     } else {
//         return cartItems
//     }

// } 