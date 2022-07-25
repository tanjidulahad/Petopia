import { put, call, all, takeLatest } from "redux-saga/effects";

import Reducstore from '../store'
import cartActionType from "./cart-action-type";
import { readyCartData } from "@utils/utill";

// Actions
import { getPurchageStart, setBackendCartStart, setBackendCartStoreStart, addItemTopurchaseStart, updateQuantityToPurchaseStart, deleteFromPurchaseStart, setCartError } from "../checkout/checkout-action";
import { getOrderDetailsStart } from "@redux/orders/orders-action";
import { updateCartSuccess } from "./cart-actions";

function* purchaseItemUpdator({ action, payload }) {

    const state = Reducstore.getState()
    const cart = state.cart;
    const purchase = state.checkout.purchase
    const purchaseDetails = state.checkout.purchaseDetails
    const user = state.user.currentUser;
    const store = state.store.info;
    if (!user || !store) {
        yield put(updateCartSuccess())
        return
    };
    const data = readyCartData(cart)
    // const data = {
    //     [store.store_id]: [{
    //         item_id: payload.item_id,
    //         barcode_id: null,
    //         quantity: payload.quantity || 1,
    //         variant_item_id: payload.defaultVariantItem?.variant_item_id | null,
    //     }
    //     ]
    // }
    if (!purchase) { // null => true
        // Create a purchase
        // yield put(setBackendCartStart({ userId: user.customer_id, customerId: user.customer_id, groupId: store.group_id, data }))
    } else {
        if (purchaseDetails) {
            // Tasks 
            // 0. Check group Id is same as Purchase Detail's store Id
            // 1. Check purchage Id exist to user
            // 2. Add or Remove New item
            // 3. Update Quantity if exist in order
            if (purchaseDetails?.storeGroupId != store.group_id, action == cartActionType.REMOVE_FROM_CART) {
                yield put(setCartError({ message: "You trying to add items from a different StoreCourt", payload }))
                yield put(updateCartSuccess())
                return;
            }
            const isStoreOrderIdExist = purchase.orders.some(item => (Object.keys(item)[0] == store.store_id))
            if (isStoreOrderIdExist) {
                // const orderId = purchase.orders[0][store.store_id].order_id; [].
                const orderId = purchase.orders.find(item => Object.keys(item)[0] == store.store_id)[store.store_id].order_id
                const isOrderIdExist = Object.keys(purchaseDetails.orders).includes(`${orderId}`)

                if (!isOrderIdExist) {
                    yield put(getPurchageStart(purchase.purchase_id))
                    return;
                }
                const isExist = Object.values(purchaseDetails.orders[orderId].orderItems).find(function (item) {

                    if (item.itemId == payload.item_id) {
                        if (payload.defaultVariantItem) {
                            if (item.customizationDetails?.variant_item_id == payload.defaultVariantItem?.variant_item_id) {
                                return true
                            }
                            else {
                                return false
                            }
                        }
                        else {
                            return true
                        }
                    }
                    else {
                        return false
                    }
                }) || null

                if (isExist) {
                    const { quantity } = cart.find(function (item) {
                        if (item.item_id == payload.item_id) {
                            if (payload.defaultVariantItem) {
                                if (item.defaultVariantItem.variant_item_id == payload.defaultVariantItem.variant_item_id) {
                                    return item
                                }
                                else {
                                    return false
                                }
                            }
                            else {
                                return item
                            }
                        }
                        else {
                            return false
                        }
                    }) || { quantity: 0 }
                    const { orderItemId } = isExist;
                    if (quantity > 0) { // quantity > 0
                        // yield put(updateQuantityToPurchaseStart({ quantity, orderItemId, purchaseId: purchase?.purchase_id }))
                    } else {
                        yield put(deleteFromPurchaseStart({ quantity, orderItemId, purchaseId: purchase?.purchase_id }))
                    }
                } else {
                    // const identity = { purchaseId: purchase.purchase_id, groupId: store.group_id, userId: user.customer_id, storeId: store.store_id, itemId: payload.item_id, orderId, customerId: user.customer_id, variantItemId: payload.defaultVariantItem?.variant_item_id }
                    // yield put(setBackendCartStoreStart({ userId: user.customer_id, groupId: store.group_id, purchaseId: purchase?.purchase_id, data }))
                    // yield put(addItemTopurchaseStart(identity))
                }

            } else {
                // yield put(setBackendCartStoreStart({ userId: user.customer_id, groupId: store.group_id, purchaseId: purchase?.purchase_id, data }))
            }
        }
    }

}


// function* onAddToCartStart() {
//     yield takeLatest(cartActionType.ADD_TO_CART, purchaseItemUpdator)
// }
// function* onRemoveFromCartStart() {
//     yield takeLatest(cartActionType.REMOVE_FROM_CART, purchaseItemUpdator)
// }
// function* onDeleteFromCartStart() {
//     yield takeLatest(cartActionType.DELETE_FROM_CART, purchaseItemUpdator)
// }

function* onRemoveFromCartStart() {
    yield takeLatest(cartActionType.REMOVE_FROM_CART, function* () {
        const state = Reducstore.getState()
        const cart = state.cart;
        if (cart.length == 0) {
            yield put(clearCheckout())
        }
    })
}
function* onDeleteFromCartStart() {
    yield takeLatest(cartActionType.DELETE_FROM_CART, function* () {
        const state = Reducstore.getState()
        const cart = state.cart;
        if (cart.length == 0) {
            yield put(clearCheckout())
        }
    })
}



// Cart root sagas
export default function* cartSagas() {
    yield all([
        // call(onAddToCartStart),
        call(onRemoveFromCartStart),
        call(onDeleteFromCartStart)
    ]);
}



// [store.store_id]: [
//     ...cart.map(item => ({
//         item_id: item.item_id,
//         barcode_id: null,
//         quantity: item.quantity,
//         variant_item_id: item.defaultVariantItem?.variant_item_id | null,
//     }





