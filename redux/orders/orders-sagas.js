import { put, call, fork, all, takeEvery, takeLatest } from "redux-saga/effects";
import fetcher from "../utility";
import ordersActionType from "./orders-action-type";
import Router from 'next/router'
import { riseError } from "../global-error-handler/global-error-handler-action.ts";

function* onGetOrderDetailsStart() {
    yield takeLatest(ordersActionType.GET_ORDER_DETAILS_START, function* ({ payload }) {
        const { orderId, setOrderDetails } = payload
        try {
            const res = yield fetcher('GET', `?r=my-orders/read-order&orderId=${orderId}`)
            if (res.data.storeId) {
                setOrderDetails(res.data);
            }
        } catch (error) {
            if (error.message == 'Network Error') {
                yield put(riseError({ name: 'No Interner', message: "Please connect device to Internet!", onOk: () => { Router.reload() }, onOkName: "Reload" }))
            } else {
                yield put(riseError({ name: error.name, message: "Unable to get Order!", onOk: () => { return }, onOkName: "Close" }))
            }
        }
    })
}

function* onGetCurrentOrdersListStart() {
    yield takeLatest(ordersActionType.GET_CURRENT_ORDERS_LIST_START, function* ({ payload }) {
        const { userId, setOrderList, setError } = payload
        try {
            const res = yield fetcher('GET', `?r=my-orders/get-orders-by-customer-id&customerId=${userId}&orderStatusGroup=CURRENT`)
            if (res.data) {
                setOrderList(res.data);
            }
        } catch (error) {
            // console.log(error);
            setError(error.message)
        }
    })
}

export default function* ordersSagas() {
    yield all([call(onGetOrderDetailsStart), call(onGetCurrentOrdersListStart)])
}