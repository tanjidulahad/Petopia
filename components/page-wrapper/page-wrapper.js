import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import Auth from "@components/auth/auth";
import Loader from "@components/loading/loader";
import NavBar from "@components/navbar/navbar";
import Footer from '@components/Footer'

import {
    getShopInfoStart, getShopSeoStart, getShopSettingsStart, getSocialProfileStart, getShopDisplaySettingsStart, getPageCountStart, getBannerStart,
    getShopInfoSuccess, getShopSeoSuccess, getShopSettingsSuccess, getSocialProfileSuccess,
} from "@redux/shop/shop-action";

const verifier = ({ children, isLogin, store, getShopInfo, getShopSeo, getShopSettings, getSocialProfile, getShopDisplaySettings, getPageCount, getBanner }) => {
    const router = useRouter()
    const { displaySettings } = store
    useEffect(() => {
        const { storeId } = router.query
        if (!store.isReadyToGo && storeId) {
            getBanner(storeId)
            getShopSeo(storeId);
            getShopInfo(storeId);
            getPageCount(storeId)
            getShopSettings(storeId);
            getSocialProfile(storeId);
            getShopDisplaySettings(storeId)
        }
    }, [router])
    if (!store.isReadyToGo) {
        return <Loader />
    }
    return (
        <>
            <Head>
                <title>{store ? store.info.store_name : 'GoPlinto'}</title>
            </Head>
            <NavBar />
            <main>{children}</main>
            <Footer />
            {
                isLogin && <Auth />
            }
        </>
    )
}

const mapStateToProps = state => ({
    store: state.store,
    seo: state.store.seo,
    isReadyToGo: state.store.isReadyToGo,
    isLogin: !state.user.currentUser
})
const mapDispatchToProps = dispatch => ({
    getBanner: (shopId) => dispatch(getBannerStart(shopId)),
    getShopSeo: (shopId) => dispatch(getShopSeoStart(shopId)),
    getShopInfo: (shopId) => dispatch(getShopInfoStart(shopId)),
    getPageCount: (shopId) => dispatch(getPageCountStart(shopId)),
    getShopSettings: (shopId) => dispatch(getShopSettingsStart(shopId)),
    getSocialProfile: (shopId) => dispatch(getSocialProfileStart(shopId)),
    getShopDisplaySettings: (storeId) => dispatch(getShopDisplaySettingsStart(storeId)),
})

const HOC = connect(mapStateToProps, mapDispatchToProps)(verifier)
const PageWrapper = WrappedComponent => {

    return (props) => <HOC>
        <WrappedComponent {...props} />
    </HOC>
}
export default PageWrapper;