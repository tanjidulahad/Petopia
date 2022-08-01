
import getConfig from 'next/config';

import { useEffect, useState } from 'react';
import Layout from '@components/layout';
import store from '@redux/store';
import { Provider } from 'react-redux';
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'; //nprogress module
import GoogleAnalytics from '@components/GoogleAnalytics/GoogleAnalytics';
import 'nprogress/nprogress.css'

// Global Styles
import '@styles/globals.css'
import '@styles/globals.scss'

// Components Styles
import '@styles/inputs.scss'
import '@styles/product-item.scss'
import '@styles/navbar.scss'
import '@styles/auth.scss'
import '@styles/pdp-image.scss'
import '@styles/mob-cat.scss'
import '@styles/cat.scss'

// Page Styles
import '@styles/product.scss'
import '@styles/cart.scss'
import '@styles/saved-places.scss'
import { IoContractOutline } from 'react-icons/io5';


//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const { publicRuntimeConfig } = getConfig();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [redirected, setRedirected] = useState(false);



  useEffect(() => {
    const path = router.asPath;
    if (path != '/' && !path.includes('[')) {
      router.replace(path);
      setRedirected(true)
    }
  }, [router.isReady])



  return (
    <Provider store={store}>
      <Layout>
        <GoogleAnalytics />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
