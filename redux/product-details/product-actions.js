import productActionType from './product-action-type'

export const productDetailsFetchStart = ({ id,seassion_id, onSuccess, onFailure }) => ({
    type: productActionType.PRODUCT_DETAILS_FETCH_START,
    payload: { id,seassion_id, onSuccess, onFailure }
})
export const productDetailsFetchSuccess = (product) => ({
    type: productActionType.PRODUCT_DETAILS_FETCH_SUCCESS,
    payload: product
})

export const similarProductFetchStart = (id) => ({
    type: productActionType.SIMILAR_PRODUCT_FETCH_START,
    payload: id
})
export const similarProductFetchSuccess = (products) => ({
    type: productActionType.SIMILAR_PRODUCT_FETCH_SUCCESS,
    payload: products // []
})
// Product specifications
export const getSpecificationsStart = (id) => ({
    type: productActionType.GET_PRODUCT_SPECIFICATINS_START,
    payload: id
})
export const getSpecificationsSuccess = (list) => ({
    type: productActionType.GET_PRODUCT_SPECIFICATINS_SUCCESS,
    payload: list // []
})
// Product Additional info
export const getAdditionalInfoStart = (id) => ({
    type: productActionType.GET_PRODUCT_ADDITIONALINFO_START,
    payload: id
})
export const getAdditionalInfoSuccess = (list) => ({
    type: productActionType.GET_PRODUCT_ADDITIONALINFO_SUCCESS,
    payload: list // []
})
// Product variant info
export const getProductVariantStart = (id) => ({
    type: productActionType.GET_PRODUCT_VARIANT_START,
    payload: id
})
export const getProductVariantSuccess = (list) => ({
    type: productActionType.GET_PRODUCT_VARIANT_SUCCESS,
    payload: list // []
})
//  Error
export const errorOnProductDetailPage = (error) => ({
    type: productActionType.ERROR_ON_PRODUCT_DETAIL_PAGE,
    payload: error
})