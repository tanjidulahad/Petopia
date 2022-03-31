export const getStaticPropsHandler = async (context) => {
    console.log(context, 'fromHere');
    return {
        props: {}
    }
}

export const groupBy = function (arr, key) {
    return arr.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const readyCartData = function (arr) {
    const key = 'store_id'
    return arr.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push({
            item_id: x.item_id,
            barcode_id: null,
            quantity: x.quantity,
            variant_item_id: x.defaultVariantItem?.variant_item_id | null,
        });
        return rv;
    }, {});
};