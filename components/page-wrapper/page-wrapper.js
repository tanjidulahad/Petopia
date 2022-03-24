import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import Auth from "@components/auth/auth";
import Loader from "@components/loading/loader";
import NavBar from "@components/navbar/navbar";
import Footer from '@components/Footer'

import {
    getShopInfoStart, getShopSeoStart, getShopSettingsStart, getSocialProfileStart, getShopDisplaySettingsStart,
    getShopInfoSuccess, getShopSeoSuccess, getShopSettingsSuccess, getSocialProfileSuccess
} from "@redux/shop/shop-action";

const verifier = ({ children, isLogin, store, getShopInfo, getShopSeo, getShopSettings, getSocialProfile, getShopDisplaySettings }) => {
    const router = useRouter()
    const { displaySettings } = store
    useEffect(() => {
        const { storeId } = router.query
        if (!store.isReadyToGo && storeId) {
            getShopInfo(storeId);
            getShopSeo(storeId);
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
    getShopInfo: (shopId) => dispatch(getShopInfoStart(shopId)),
    getShopSeo: (shopId) => dispatch(getShopSeoStart(shopId)),
    getShopSettings: (shopId) => dispatch(getShopSettingsStart(shopId)),
    getSocialProfile: (shopId) => dispatch(getSocialProfileStart(shopId)),
    getShopDisplaySettings: (storeId) => dispatch(getShopDisplaySettingsStart(storeId))
})

const HOC = connect(mapStateToProps, mapDispatchToProps)(verifier)
const PageWrapper = WrappedComponent => {

    return (props) => <HOC>
        <WrappedComponent {...props} />
    </HOC>
}
export default PageWrapper;