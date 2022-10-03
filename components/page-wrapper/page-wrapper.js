import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { redirect } from "@components/link"

import Auth from "@components/auth/auth";
import Loader from "@components/loading/loader";
import NavBar from "@components/navbar/navbar";
import Footer from '@components/Footer'
import CartErrorPop from "@components/cart-error/cart-error-pop";

import {
    getShopInfoStart, getShopSeoStart, getShopSettingsStart, getSocialProfileStart, getShopDisplaySettingsStart, getPageCountStart, getBannerStart,
    getShopInfoSuccess, getShopSeoSuccess, getShopSettingsSuccess, getSocialProfileSuccess, getShopWidgets, getCountryCodeStart,
} from "@redux/shop/shop-action";
import Popup from "@components/popup/popup";
import { createSeasionId } from "services/pickytoClient";

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

const verifier = ({ userId, children, isLogin, store, getShopWidgets, errorInGO, getShopInfo, getShopSeo, getShopSettings, getSocialProfile, getShopDisplaySettings, getPageCount, getBanner, getCountyCode }) => {
    const router = useRouter()
    const { displaySettings, info } = store

    // useEffect(() => {
    //     if (info) {
    //         if (info.store_status == 'INACTIVE') {
    //             redirect(`/inactive`)
    //         }
    //     }
    // }, [info])

    useEffect(() => {
        const { storeId } = router.query
        if (!store.isReadyToGo && storeId) {

            var seassion_id
            if (!userId) {
                seassion_id = createSeasionId()
            } else {
                seassion_id = userId
            }

            getBanner(storeId)
            getShopSeo(storeId);
            getShopInfo({ storeId, seassion_id });
            getPageCount({ storeId })
            getShopSettings(storeId);
            getSocialProfile(storeId);
            getShopDisplaySettings(storeId);
            getShopWidgets(storeId)
            getCountyCode()
        }
    }, [router])

    useEffect(() => { // Setting store colors
        //  Primary colors for buttons, navbg
        // Secondry colors for footer
        // if (displaySettings) {

        // }
        if (typeof window !== 'undefined') {
            let themeColors = {
                // color: displaySettings.primary_color || '#fff',
                color: '#fff',
                bgColor: '#d85a5a',
                bgColor50: hexToRGB('0.13'),
                fillColor: '#d85a5a',
                navColor: '#ffffff',
                footerColor: '#000',
                btnBg: "#D85A5A"
            }
            if (displaySettings) {
                themeColors = {
                    // color: displaySettings.primary_color || '#fff',
                    color: '#fff',
                    bgColor: displaySettings.primary_color || '#d85a5a',
                    bgColor50: hexToRGB(displaySettings.primary_color, '0.13') || 'rgba(246, 75, 93, 0.13)',
                    fillColor: displaySettings.primary_color || '#d85a5a',
                    navColor: displaySettings.navbar_color || 'transparent',
                    footerColor: displaySettings.navbar_color || '#000',
                    btnBg: displaySettings?.secondary_color || "#D85A5A",
                    bgColor50: hexToRGB(displaySettings?.secondary_color || "#D85A5A", '0.13'),
                }

            }
            // const head = document.head
            const head = document.getElementById('style')
            // const style = document.createElement('style');
            // style.innerHTML = (`
            const style = (` <style>
                    .btn-border{
                        border-color: ${themeColors.btnBg};
                    }
                    .btn-bg {
                        background-color: ${themeColors.btnBg};
                    }
                    .btn-bg-revese {
                        background-color: ${themeColors.color};
                    }
                    .btn-bg-light {
                        background-color: ${themeColors.bgColor50};
                    }
                    .btn-color {
                        color: ${themeColors.color};
                    }
                    .btn-color-revese {
                        color: ${themeColors.btnBg};
                    }
                    .btn-color-revers {
                        color: ${themeColors.btnBg};
                    }
                    .btn-hover-color {
                        transition: 0.3s ease-in-out;
                    }
                    .btn-hover-color:hover {
                        color: ${themeColors.btnBg};
                    }
                    .btn-nav-color-active {
                        color: ${themeColors.btnBg};
                        fill: ${themeColors.btnBg};
                    }
                    .nav-bg{
                        background-color: ${themeColors.bgColor}!important;
                    }
                    .nav-color{
                        color : ${themeColors.navColor};
                    }
                    .footer-bg{
                        background-color: ${themeColors.bgColor}
                    }
                    .footer-color{
                        color: ${themeColors.footerColor}
                    }
                    .login-toggle{
                            border-color:${themeColors.btnBg || '#D85A5A'};
                            color : ${themeColors.btnBg || '#D85A5A'};
                            background-color: #fff;
                        }
                        .login-toggle-active{
                            border-color:${themeColors.btnBg || '#D85A5A'};
                            color : #fff;
                            background-color: ${themeColors.btnBg || '#D85A5A'};
                        }
                    .empty-cart-svg path {
                        fill : ${themeColors.fillColor}
                    }
                    .cat-active{
                        background: transparent linear-gradient(90deg, #d85a5a00 0%, ${hexToRGB(themeColors.bgColor, '0.25')} 100%) 0% 0% no-repeat padding-box;
                        border-right: ${themeColors.bgColor};
                    }
                    .cat-active{
                    }
                    .mob-cat .active{
                        border-color: ${themeColors.bgColor}
                    }
                    .border-static {
                        border-color : ${themeColors.bgColor};
                    }
                    .border-color:hover {
                        border-color : ${themeColors.bgColor}
                    }
                    input[type=radio]:checked:after {
                        background-color : ${themeColors.bgColor};
                        box-shadow : 0px 0px 0px 2px ${themeColors.bgColor};
                    }
                    input[type=checkbox]:checked:after {
                        background-color : ${themeColors.bgColor};
                        box-shadow : 0px 0px 0px 2px ${themeColors.bgColor};
                    }
                </style>`)
            head.innerHTML = style
        }
    }, [displaySettings])

    if (info) {
        if (info.store_status == 'INACTIVE') {
            redirect(`/inactive`)
            return <>
                <Loader message="Store is getting ready for you...!" />
            </>
        }
    }

    if (!store.isReadyToGo) {
        return (
            <>
                {
                    errorInGO ?
                        <Loader message="Unable to get store...!" >
                            <img className="w-full" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgaGVpZ2h0PSIzMiIgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7ZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMiIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxnIGlkPSJFcnJvcl8xXyI+PGcgaWQ9IkVycm9yIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiBpZD0iQkciIHI9IjE2IiBzdHlsZT0iZmlsbDojRDcyODI4OyIvPjxwYXRoIGQ9Ik0xNC41LDI1aDN2LTNoLTNWMjV6IE0xNC41LDZ2MTNoM1Y2SDE0LjV6IiBpZD0iRXhjbGFtYXRvcnlfeDVGX1NpZ24iIHN0eWxlPSJmaWxsOiNFNkU2RTY7Ii8+PC9nPjwvZz48L2c+PC9zdmc+" alt="error" />
                        </Loader>
                        :
                        <Loader message="Store is getting ready for you...!" />
                }
            </>
        )

    }

    return (
        <>
            <Head>
                <title>{store ? store.info.store_name : 'GoPlinto'}</title>
                <link rel="shortcut icon" href={displaySettings ? displaySettings?.favicon_img_url?displaySettings.favicon_img_url : info ? info?.logo_img_url?info.logo_img_url : '/img/goplinto_favicon.ico':'/img/goplinto_favicon.ico':'/img/goplinto_favicon.ico'} type="image/x-icon" />
            </Head>
            <NavBar />
            <main>{children}</main>
            <Footer />
            {
                isLogin && <Auth />
            }
            <Popup />
            <CartErrorPop />
        </>
    )
}

const mapStateToProps = state => ({
    store: state.store,
    seo: state.store.seo,
    // displaySettings: state.store.displaySettings,
    isReadyToGo: state.store.isReadyToGo,
    errorInGO: state.store.error,
    isLogin: !state.user.currentUser,
    userId: state.user.currentUser?.customer_id,
})
const mapDispatchToProps = dispatch => ({
    getBanner: (shopId) => dispatch(getBannerStart(shopId)),
    getShopSeo: (shopId) => dispatch(getShopSeoStart(shopId)),
    getShopInfo: (shopId) => dispatch(getShopInfoStart(shopId)),
    getPageCount: (shopId) => dispatch(getPageCountStart(shopId)),
    getShopSettings: (shopId) => dispatch(getShopSettingsStart(shopId)),
    getSocialProfile: (shopId) => dispatch(getSocialProfileStart(shopId)),
    getShopDisplaySettings: (storeId) => dispatch(getShopDisplaySettingsStart(storeId)),
    getShopWidgets: (data) => dispatch(getShopWidgets(data)),
    getCountyCode: () => dispatch(getCountryCodeStart())
})

const HOC = connect(mapStateToProps, mapDispatchToProps)(verifier)
const PageWrapper = WrappedComponent => {

    return (props) => <HOC>
        <WrappedComponent {...props} />
    </HOC>
}
export default PageWrapper;
