import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/MobHeader/index'

import withAuth from '../../components/auth/withAuth'
import OrderCard from '../../components/Cards/Order/orderCard/orderCard'
import accountLayout from '../../components/layout/account-layout'
import Loader from '../../components/loading/loader'
import ErrorPage from '../../components/error'
// Actions
import { getCurrentOrdersListStart, getPastOrdersListStart } from '../../redux/orders/orders-action'

function Myorders({ user, getCurrentOrders, getPastOrders }) {
  const [orderList, setOrderList] = useState([]);
  const [orderListPast, setOrderListPast] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentOrders({ userId: user.customer_id, setOrderList, setError })
    getPastOrders({ userId: user.customer_id, setOrderList: setOrderListPast, setError })
  }, [])

  useEffect(() => {
    setIsLoading((orderList.length || orderListPast.length) && true)
  }, [orderList, orderListPast])
  
  return (
    <>
      {
        !isLoading && !error ?
          <Loader />
          : error ?
            <ErrorPage message={error.message} statusCode={error?.response?.status || error?.statusCode} />
            :
            <>
               <Header display={true} topic="My Orders" />

<p className="text-xl mx-2 mt-4 md:mt-0 lg:mt-0 md:mx-0 lg:mx-0 text-gray-900 font-bold">
                {' '}
                Current Orders
              </p>
              <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
                {
                  orderList.map((item, i) => (
                    <div className="w-full rounded-lg shadow " key={i}>
                      <OrderCard data={item} />
                    </div>
                  ))
                }
              </div>
              {
                !!orderListPast.length && <>
                 <p className="text-xl mx-2 mt-4 md:mt-0 lg:mt-0 md:mx-0 lg:mx-0 text-gray-900 font-bold"> Past Orders</p>
                  <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
                    {
                      orderListPast.map((item, i) => (
                        <div className="w-full rounded-lg shadow" key={i}>
                          <OrderCard data={item} status={'past'} message={'Delivery Success'} />
                        </div>
                      ))
                    }
                  </div>
                </>
              }
            </>
      }
    </>
  )
}


const mapDispatchToProps = dispatch => ({
  getCurrentOrders: (payload) => dispatch(getCurrentOrdersListStart(payload)),
  getPastOrders: (payload) => dispatch(getPastOrdersListStart(payload))
})

export default connect(null, mapDispatchToProps)(withAuth(accountLayout(Myorders)))
