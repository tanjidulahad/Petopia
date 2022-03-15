import checkoutActionType from "./checkout-action-type";

const INITIAL_STATE = {
    addressId: null, // Address id
    shipment: "",   // Delivery = Y or Pick-up = N
    payment: '',    // Pay online = Y or COD = N
    purchase: null, // {
    //     "purchase_id": "10914",
    //     "orders": [
    //     ]
    // }
    purchaseDetails: null, //{},
    isDetailsLoading: false,
    confirmOrder: {
        confirm: null,
        error: null
    },
    rzpOrder: null  //{


}


const checkoutReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case checkoutActionType.SET_DELVERY_ADDRESS:
            return {
                ...state,
                addressId: payload
            }
        case checkoutActionType.GET_PURCHASE_START:
            return {
                ...state,
                isDetailsLoading: true
            }
        case checkoutActionType.GET_PURCHASE_SUCCESS:
            return {
                ...state,
                isDetailsLoading: false,
                purchaseDetails: payload,
            }
        case checkoutActionType.GET_PURCHASE_FAILURE:
            return {
                ...state,
                isDetailsLoading: false
            }

        case checkoutActionType.SET_SHIPMENT_METHOD:
            return {
                ...state,
                shipment: payload.flag
            }
        case checkoutActionType.SET_PAYMENT_METHOD:
            return {
                ...state,
                payment: payload.flag
            }
        case checkoutActionType.SET_BACKEND_CART_SUCCESS:
            return {
                ...state,
                purchase: payload
            }
        case checkoutActionType.ORDER_PAYMENT_CONFIRM_SUCCESS:
            return {
                ...state,
                confirmOrder: {
                    confirm: payload,
                    error: null
                }
            }
        case checkoutActionType.CREATE_NEW_RZP_ORDER_SUCCESS:
            return {
                ...state,
                rzpOrder: payload
            }

        case checkoutActionType.CLEARE_CHECKOUT:
            return INITIAL_STATE

        default:
            return state;
    }
}

export default checkoutReducer;
