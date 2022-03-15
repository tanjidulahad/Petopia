import storeActionType from "./shop-action-type";
import { structureCat, insertSubcat } from "./utill";

const INITIAL_STATE = {
    // About store & settings
    shop: null,// {}
    seo: null,// {}
    settings: null,// {}
    displaySettings: null,// {}
    socialProfile: [],
    isReadyToGo: false,// true || false
    // About products
    products: [],
    categories: []
}

const isReady = ({ shop, seo, settings }) => {
    if (shop && settings) return true;
    return false
}

const shopReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case storeActionType.GET_SHOP_INFO_SUCCESS:
            return {
                ...state,
                shop: payload,
                isReadyToGo: isReady({ ...state, shop: true })
            }

        case storeActionType.GET_SHOP_SEO_SUCCESS:
            return {
                ...state,
                seo: payload,
                // isReadyToGo: isReady({ ...state, seo: true })
            }
        case storeActionType.GET_SHOP_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: payload,
                isReadyToGo: isReady({ ...state, settings: true })
            }
        case storeActionType.GET_SHOP_DISPLAY_SETTINGS_SUCCESS:
            return {
                ...state,
                displaySettings: payload,
                // isReadyToGo: isReady({ ...state, settings: true })
            }
        case storeActionType.GET_SEARCH_SUCCESS:
        case storeActionType.GET_CATEGORY_PRODUCTS_SUCCESS:
        case storeActionType.GET_SHOP_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload,
            }
        case storeActionType.GET_SHOP_SOCIAL_PROFILE_SUCCESS:
            return {
                ...state,
                socialProfile: [...payload]
            }
        case storeActionType.GET_SHOP_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: structureCat(payload)
            }
        case storeActionType.GET_SHOP_SUB_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: insertSubcat(state, payload)
            }

        default:
            return state;
    }
}

export default shopReducer;