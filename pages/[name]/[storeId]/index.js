import { useEffect, useState, useRef, useCallback, memo } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { useRouter } from "next/dist/client/router";
import { useMediaQuery } from 'react-responsive';

import ProductListPage from '@components/Products/index'
import CatList from '@components/catgegory/cat'
import { Button } from '@components/inputs';
import HomeCartItem from '@components/cart-item/home-cart-item';
import { redirect } from '@components/link';
import { Input } from '@components/inputs';

// Actions
import { getCategoryStart, getShopProductsStart, getCategoryProductsStart, getSearchProductsStart, getPageCountStart, clearProductList } from "@redux/shop/shop-action";
import { setSearchHandler } from '@redux/search/seatch-actions'
import PageWrapper from '@components/page-wrapper/page-wrapper';
import EmptyCart from '@components/empty-cart';

// Functions
import { groupBy } from '@utils/utill';
import { clearCart } from '@redux/cart/cart-actions';
import { clearCheckout } from '@redux/checkout/checkout-action';


const Home = ({ products, banner, info, cart, pageCount, clearProductList, displaySettings, checkout, categories, getCategoryStart, getPageCount, getCategoryProducts, getShopProducts, getSearchProducts, setSearchHandler, clearCart, clearCheckout }) => {
  const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
  const purchaseDetails = checkout.purchaseDetails;
  // const storeId = process.env.NEXT_PUBLIC_DEFAULT_STORE_ID;
  const storeId = info.store_id;
  const [searchResult, setSearchResult] = useState([])
  const Router = useRouter();
  const { category, subCategory, search, name } = Router.query;
  // let { page } = Router.query;
  const [status, setStatus] = useState('loading') //status == loading || failed || success
  const [q, setq] = useState(search ? search : '');
  // UI Vars
  const [scrollPosition, setScrollPosition] = useState(0);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 })
  const isSmDevice = useMediaQuery({ minWidth: 640 })
  const [navHeight, setNavHeight] = useState(156)
  const [restHeight, setRestHeight] = useState(78) // in vh
  const [plpc, setPlpc] = useState(775) // in vh
  const [description, setDescription] = useState("")
  const [page, setPage] = useState(1)
  // console.log(Router);

  // Pagination
  const observer = useRef()
  const listLastElement = useCallback(node => {
    if (status == 'loading') return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pageCount) {
        console.log("visible");
        console.log(page + 1);
        console.log(Router);
        console.log(status);
        if (page < pageCount && !search) {
          setPage(page + 1)
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [status, pageCount])
  useEffect(() => { // Componentdidmount
    if (!categories.length) getCategoryStart(storeId);
    setSearchHandler((e) => {
      const { value } = e.target;
      if (value.trim().length > 0) {
        setStatus('loading')
        redirect(`/?search=${value}`)
      } else {
        setSearchResult([])
        redirect(`/`)
      }
      setq(value)
    })
  }, [])

  useEffect(() => {
    if (search) {
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      getSearchProducts({ storeId, q: q.trim(), setSearchResult, setStatus })

    } else if (category) {
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      getCategoryProducts({ storeId, categoryId: category, subCategoryId: subCategory, page, setStatus })
      // getPageCount({ storeId, categoryId: category })

      // setq('') // Cleaning query string of search
    } else {
      setStatus('loading') // Set to success default Because its run whene All  products are fetching
      getShopProducts({ storeId, page, setStatus })
      // getPageCount({ storeId, categoryId: category })
      // setq('') // Cleaning query string of search
    }
  }, [Router.query, page])
  useEffect(() => {

    if (category) {
      getPageCount({ storeId, categoryId: category })
    } else {
      getPageCount({ storeId })
    }
    setPage(1)
    clearProductList()
  }, [category, search])

  useEffect(() => { // UI function

    if (typeof window !== 'undefined') {
      const objerver = new ResizeObserver(function (e) {
        const ele = document.getElementById('big-navbar')
        const plpc = document.getElementById('plp-container')
        if (!!ele) {
          if (ele.offsetHeight != navHeight && navHeight != 0) {
            const totalH = ele.offsetHeight
            setNavHeight(totalH)
            setRestHeight(100 - (totalH * 100 / document.documentElement.clientHeight));
          }
        }
        if (!!plpc) {
          if (plpc.offsetHeight != navHeight && navHeight != 0) {
            const totalH = plpc.offsetWidth
            setPlpc(totalH)
          }
        }
      })
      objerver.observe(document.body)
    }
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      // console.log(position);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [])
  // SEO
  useEffect(() => {
    const dsc = products.reduce((dsc, item) => dsc + ", " + item.item_name + ', ' + item.item_desc, "")
    setDescription(dsc)
    console.log(products.length);
  }, [products])
  // Pagination

  const searchHandler = (e) => {
    const { value } = e.target;
    if (value.trim().length > 0) {
      setStatus('loading')
      redirect(`/?search=${value}`)
    } else {
      setSearchResult([])
      redirect(`/`)
    }
    setq(value)

  }
  const cartGroups = groupBy(cart, 'store_id')
  return (
    <div >
      <Head>
        <meta name="description" content={`${description} ${info.name}, Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
        <meta property="og:description"
          content={`${description} ${info.name}, The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
        <meta name="keywords" content={`${description} ${info.name}, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />

      </Head>
      {/* <Navbar /> */}
      <section>
        <div className='wrapper mx-auto'>
          <div className=" grid grid-cols-1 sm:grid-cols-12 gap-6">
            <div className="md:mt-10  col-span-full md:col-span-3 xl:col-span-2 border-gray-300 z-10 bg-white
            md:overflow-y-auto
            md:flex sticky top-12
            no-scrollbar"
              style={{ top: isSmDevice && navHeight, ...isDesktopOrLaptop && { height: `${restHeight}vh` } }}
            >
              <CatList list={categories.length > 0 && categories} />
            </div>
            <div className="md:pt-8 md:py-6 col-span-full md:col-span-9 xl:col-span-7 sm:col-span-12  pt-6 md:border-l xl:border-r
            ">
              {/* md:overflow-y-auto
            md:flex flex-col sticky
            no-scrollbar"
              style={{ top: navHeight, ...isDesktopOrLaptop && { height: `${restHeight}vh` } }}
            > */}
              {/* <div className='text-base w-full px-4 md:px-8 serach-bar fixed flex flex-col -mt-6 md:-mt-8 xl:-mt-6 -ml-4 xl:ml-0' style={{ maxWidth: '775px', top: navHeight }}> */}
              {/* <div className='text-base w-full px-4 md:px-8 serach-bar fixed flex flex-col -mt-6 md:-mt-8 xl:-mt-6 xl:ml-0' style={{ maxWidth: plpc, top: navHeight }}> */}
              <div className={` transition-all text-base w-full px-4 md:px-8 serach-bar ${(scrollPosition >= navHeight) && !isSmDevice ? 'fixed bg-white  px-2 pt-2' : 'absolute -mt-6'} sm:fixed flex flex-col md:-mt-8 xl:-mt-6 xl:ml-0`} style={{ maxWidth: plpc, top: (scrollPosition >= navHeight - 10) && !isSmDevice ? '0px' : navHeight }}>
                <div className='relative'>
                  <Input className='py-2.5 md:py-2 bg-gray-100 md:bg-white pl-8 md:pl-3 border-0 md:border border-gray-100 md:shadow-md' style={{ top: navHeight }} onChange={searchHandler} placeholder='Search for items' ></Input>
                  <div className='absolute top-1/2 -translate-y-1/2 pl-2 w-20 md:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.811" height="17.811" viewBox="0 0 17.811 17.811">
                      <g id="search" transform="translate(0.75 0.75)">
                        <circle id="Ellipse_8" data-name="Ellipse 8" cx="7" cy="7" r="7" fill="none" stroke="rgba(36,36,36,0.5)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                        <line id="Line_41" data-name="Line 41" x1="3.916" y1="3.916" transform="translate(12.084 12.084)" fill="none" stroke="rgba(36,36,36,0.5)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div id='plp-container' className='md:overflow-y-auto md:flex flex-col md:sticky no-scrollba ' style={{ top: navHeight, ...isDesktopOrLaptop && { height: `${restHeight}vh` } }}>
                <ProductListPage lastEleRef={listLastElement} storeName={info?.store_name} products={products} status={status} banner={banner} />
              </div>
            </div>
            <div className="md:pt-8 md:py-6 hidden xl:col-span-3 mt-0 xl:block  space-y-6">
              <div className='flex justify-between pb-6 border-b-2 bg-white z-10'>
                <h2 className=' black-color font-extrabold text-xl'>My Cart</h2>
                {
                  !!cart.length &&
                  <Button className='btn-color-revers text-base font-extrabold' onClick={() => { clearCart(); clearCheckout() }}>Clear Cart</Button>
                }
              </div>
              {
                !!cart.length ? <>
                  {
                    Object.values(cartGroups).map((item, i) => (
                      <div className='w-full border-b-4 border-gray-100 pb-8' key={i}>
                        <div className="flex items-center w-full mb-4">
                          <div className="h-10 w-10 ">
                            <img className="w-full h-full rounded" src={item[0].store_logo || `/img/default.webp`} alt="..." />
                          </div>
                          <div className="w-full flex flex-col justify-start ">
                            <h4 className=" text-sm sm:text-lg inline ml-4">{item[0].store_name || ""}</h4>
                            <div className="text-xs font-medium black-color-75 ml-4">{item.length} items</div>
                          </div>
                        </div>
                        <div className=' space-y-2'>
                          {
                            item.map((data, j) => (
                              <div className='pt-4' key={j} >
                                <HomeCartItem data={data} />
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }
                  <div>
                    {
                      !!purchaseDetails ?
                        <>
                          <div className='py-6 flex justify-between items-center' >
                            <h1 className='text-2xl w-full'>Item Total</h1>
                            <div>
                              <span className='text-base font-medium'>{totalItems} item(s) </span>
                              <span className='text-2xl font-semibold'> ₹ {Number(purchaseDetails.calculatedPurchaseTotal).toFixed(2)}</span>
                            </div>
                          </div>
                          <Button type='link' href='/cart' className='block btn-color btn-bg w-full text-center rounded  py-4'>Proceed To Checkout</Button>
                        </>
                        :
                        <>
                          <div className='py-6 flex justify-between items-end' >
                            <h1 className='text-xl'>Item Total</h1>
                            <div >
                              <span className='text-base font-medium inline-block'>{totalItems} item(s) </span>
                              <span className='text-xl font-semibold inline-block'> ₹ {cart.reduce((acc, item) => parseFloat(item.sale_price) + acc, 0)}</span>
                            </div>
                          </div>
                          <Button className='block btn-color btn-bg w-full text-center rounded  py-4' type='link' href='/cart'>Proceed To Checkout</Button>
                        </>
                    }
                  </div>
                </>
                  : <div className="h-64 w-full text-center flex justify-center items-center" style={{ borderRadius: '50%' }}>
                    <div>
                      <EmptyCart />
                      <h4 className=' mt-6'>Your Cart is Empty!</h4>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div >
      </section >
    </div >
  )
}
const mapStateToProps = state => ({
  cart: state.cart,
  info: state.store.info,
  products: state.store.products,
  categories: state.store.categories,
  checkout: state.checkout,
  banner: state.store.banners,
  pageCount: state.store.pageCount
})
const mapDispatchToProps = dispatch => ({
  getPageCount: (payload) => dispatch(getPageCountStart(payload)),
  clearProductList: (payload) => dispatch(clearProductList()),
  getShopProducts: (storeId) => dispatch(getShopProductsStart(storeId)),
  getCategoryProducts: (data) => dispatch(getCategoryProductsStart(data)),
  getCategoryStart: (storeId) => dispatch(getCategoryStart(storeId)),
  getSearchProducts: (payload) => dispatch(getSearchProductsStart(payload)),
  setSearchHandler: (payload) => dispatch(setSearchHandler(payload)),
  clearCart: () => dispatch(clearCart()),
  clearCheckout: () => dispatch(clearCheckout())
})
export default connect(mapStateToProps, mapDispatchToProps)(memo(PageWrapper(Home)))

