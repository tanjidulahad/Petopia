import checkoutActionType from "@redux/checkout/checkout-action-type";
import cartActionType from "@redux/cart/cart-action-type";

const INITIAL_STATE = {
    isDetailsLoading: false,
}

const uiReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case checkoutActionType.GET_PURCHASE_START:
        case cartActionType.ADD_TO_CART:
        case cartActionType.REMOVE_FROM_CART:
        case cartActionType.UPDATE_CART:
        case checkoutActionType.SET_BACKEND_CART_START:
        case checkoutActionType.SET_BACKEND_CART_STORE_START:
            return {
                ...state,
                isDetailsLoading: true,
            }

        case checkoutActionType.GET_PURCHASE_SUCCESS:
        case cartActionType.UPDATE_CART_SUCCESS:
        case checkoutActionType.GET_PURCHASE_FAILURE:
            return {
                ...state,
                isDetailsLoading: false,
            }

        default:
            return state;
    }
}

export default uiReducer;