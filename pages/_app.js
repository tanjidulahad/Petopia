import Layout from '../components/layout';
import store from '../redux/store';
import { Provider } from 'react-redux';

// Global Styles
import '../styles/globals.css'
import '../styles/globals.scss'

// Components Styles
import '../styles/inputs.scss'
import '../styles/product-item.scss'
import '../styles/navbar.scss'
import '../styles/auth.scss'

// Page Styles
import '../styles/product.scss'
import '../styles/cart.scss'


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
