import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import withAuth from '../../components/auth/withAuth'
import OrderCard from '../../components/Cards/Order/orderCard/orderCard'
import SideProfile from '../../components/Cards/Order/Profile-card'
import WishItem from '../../components/Cards/Order/wishlist'
import Address from '../../components/Cards/Order/address'
import { BsPlusCircle } from 'react-icons/bs'
import Wallet from '../../components/Cards/Order/wallet';
import Transaction from '../../components/Cards/Order/wallet/transaction.jsx';
import Subscription from '../../components/Cards/Order/subscription'

import accountLayout from '../../components/layout/account-layout'

// Actions
import { getCurrentOrdersListStart, getPastOrdersListStart } from '../../redux/orders/orders-action'

function Myorder({ user, getCurrentOrders, getPastOrders }) {
  const [orderList, setOrderList] = useState([]);
  const [orderListPast, setOrderListPast] = useState([]);
  const [error, setError] = useState("");

  const [counter, setcounter] = useState(0)
  const [render, setrender] = useState('')

  useEffect(() => {
    getCurrentOrders({ userId: user.customer_id, setOrderList, setError })
    getPastOrders({ userId: user.customer_id, setOrderList: setOrderListPast, setError })
  }, [])

  console.log(orderList, orderListPast);
  return (
    <>
      <p className="text-xl text-gray-900 font-bold">
        {' '}
        Current Orders
      </p>
      <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
        <div className="w-full rounded-lg shadow">
          <OrderCard />
        </div>
      </div>

      <p className="text-xl text-gray-900 font-bold"> Past Orders</p>
      <div className="grid lg:grid-cols-2 md-grid-cols-1  gap-6 my-5">
        <div className="w-full rounded-lg shadow">
          <OrderCard status={'past'} message={'Delivery Success'} />
        </div>
        {/* <!-- ... --> */}
        <div className="w-full rounded-lg shadow">
          <OrderCard stayus={'past'} message={'Order Cancelled'} />
        </div>
        <div className="w-full rounded-lg shadow">
          <OrderCard status={'past'} message={'Order Cancelled'} />
        </div>
      </div>
    </>
  )
}


const mapDispatchToProps = dispatch => ({
  getCurrentOrders: (payload) => dispatch(getCurrentOrdersListStart(payload)),
  getPastOrders: (payload) => dispatch(getPastOrdersListStart(payload))
})

export default connect(null, mapDispatchToProps)(withAuth(accountLayout(Myorder)))
