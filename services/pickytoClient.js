import fetcher from "../redux/utility"

export const getVariantItemByItemId=(itemid,variantvalueid)=>{
    return fetcher('POST',`?r=catalog/get-variant-items-by-item-id&itemId=${itemid}`,variantvalueid)
}