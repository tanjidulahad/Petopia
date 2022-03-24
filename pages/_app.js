import Layout from '../components/layout';
import store from '../redux/store';
import { Provider } from 'react-redux';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'


// Global Styles
import '../styles/globals.css'
import '../styles/globals.scss'

// Components Styles
import '../styles/inputs.scss'
import '../styles/product-item.scss'
import '../styles/navbar.scss'
import '../styles/auth.scss'
import '../styles/pdp-image.scss'

// Page Styles
import '../styles/product.scss'
import '../styles/cart.scss'


//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
