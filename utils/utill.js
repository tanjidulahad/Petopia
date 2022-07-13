export const getStaticPropsHandler = async (context) => {
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

export const productDataForCart = (data = {}) => {
    return {
        item_id: Number(data?.item_id),
        store_id: data?.store_id,
        category_id: data?.category_id,
        item_name: data?.item_name,
        sale_price: data?.sale_price,
        price: data?.price,
        sub_category_id: data?.sub_category_id,
        primary_img: data?.primary_img,
        is_veg: data?.is_veg,
        item_status: true,
        inventoryDetails: data?.inventoryDetails,
        store_name: data?.storeName || '',
        store_logo: data?.storeLogoUrl || '/img/default.webp'
    }
}