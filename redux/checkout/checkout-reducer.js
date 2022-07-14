import checkoutActionType from "./checkout-action-type";

const INITIAL_STATE = {

    purchase: null,
    purchaseDetails: null, //{},
    isDetailsLoading: false,
    cartError: null, // {}
    purchaseError: null
}


const checkoutReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {

        case checkoutActionType.GET_PURCHASE_START:
            return {
                ...state,
                isDetailsLoading: true,
                cartError: null,
                purchaseError: null
            }
        case checkoutActionType.GET_PURCHASE_SUCCESS:
            return {
                ...state,
                isDetailsLoading: false,
                purchaseDetails: payload,
                cartError: null,
                purchaseError: null
            }
        case checkoutActionType.GET_PURCHASE_FAILURE:
            return {
                ...state,
                isDetailsLoading: false,
                purchaseError: payload,
                cartError: null,
            }
        case checkoutActionType.SET_BACKEND_CART_SUCCESS:
            return {
                ...state,
                purchase: payload,
                cartError: null,
                purchaseError: null
            }
        case checkoutActionType.SET_CART_ERROR:
            return {
                ...state,
                isDetailsLoading: false,
                cartError: payload,
                purchaseError: null
            }
        case checkoutActionType.CLEARE_CART_ERROR:
            return {
                ...state,
                isDetailsLoading: false,
                cartError: null,
                purchaseError: null
            }
        case checkoutActionType.CLEARE_CHECKOUT:
            return INITIAL_STATE

        default:
            return state;
    }
}

export default checkoutReducer;
