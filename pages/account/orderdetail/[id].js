import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import Ordertracker from '../../../components/Cards/orderDetail/orderTracker/ordertracker'
import List from '../../../components/Cards/orderDetail/orderList/orderlList'
import Address from '../../../components/Cards/orderDetail/address/adress'
import Loader from '../../../components/loading/loader'

// Actions
import { getOrderDetailsStart } from '../../../redux/orders/orders-action'
import ErrorPage from '../../../components/error'


function orderDetail({ getOrderDetails }) {

  const [orderDetails, setOrderDetails] = useState(null) // {}
  const [error, setError] = useState(null)
  const [address, setAddress] = useState(null) // {}
  const router = useRouter()

  useEffect(() => {
    const { id } = router.query
    if (id) {
      getOrderDetails({ orderId: id, setOrderDetails, setError })
    }
  }, [router.isReady])
  useEffect(() => {
    if (orderDetails) {
      setAddress(orderDetails.deliveryAddressDetails)
    }
  })
  console.log(orderDetails);
  return (
    <section className="bg-gray-100 w-full ">
      <div className='wrapper mx-auto'>
        {
          !orderDetails && !error ?
            <Loader />
            : error ?
              <ErrorPage message={error.message} statusCode={error?.response?.status || error?.statusCode} />
              :
              <div className="grid grid-cols-12 ">
                <div className="col-span-8  my-10 ">
                  <Ordertracker data={{ orderId: orderDetails.orderId }} />
                  <List orderId={orderDetails.orderId} storeName={orderDetails.storeName} createTime={orderDetails.createTime} list={Object.values(orderDetails.orderItems)} />
                  {
                    !!address &&
                    <Address address={address} />
                  }
                </div>
                <div className="  col-span-4 mx-8 ">
                  <div className="mt-10 pb-10 bg-white rounded">
                    <div className="px-3 py-8 sm:px-10 border-b-2 rounded">
                      <h2>Invoice</h2>
                    </div>
                    {
                      !!orderDetails &&
                      <>
                        <div className="px-3 py-10 sm:px-10">
                          <div className="flex justify-between space-x-2 border-b-2 border-dashed pb-6">
                            <h6 className="text-lg font-semibold">Item Total</h6>
                            <div>
                              <span className="black-color-75 text-base">{orderDetails.itemCount} item(s)</span>
                              <span className="text-lg font-medium ml-2">₹ {Number(orderDetails.orderAmount).toFixed(2)}</span>
                            </div>
                          </div>
                          <div className=" border-b-2 border-dashed">

                            <div className="flex justify-between space-x-2 my-4">
                              <h6 className="text-lg black-color font-medium">Delivery Charge</h6>
                              <div>
                                <span className="text-lg black-color font-medium ml-2">{parseFloat(orderDetails.deliveryCharge) ? `₹${Number(orderDetails.deliveryCharge).toFixed(2)}` : 'Free'}</span>
                              </div>
                            </div>

                            <div className="flex justify-between space-x-2 my-4">
                              <h6 className="text-lg black-color font-medium">Tax</h6>
                              <div>
                                <span className="text-lg black-color font-medium ml-2">₹ {Number(orderDetails.taxAmount).toFixed(2)}</span>
                              </div>
                            </div>
                            {
                              orderDetails.convenienceFee ?
                                <div className="flex justify-between space-x-2 my-4">
                                  <h6 className="text-lg black-color font-medium">Convenience Charge</h6>
                                  <div>
                                    <span className="text-lg black-color font-medium ml-2">₹ {Number(orderDetails.convenienceFee).toFixed(2)}</span>
                                  </div>
                                </div>
                                : null
                            }
                            <div className="flex justify-between space-x-2 my-4">
                              <h6 className="text-lg black-color font-medium">Coupon Applied</h6>
                              <div>
                                <span className="text-lg black-color font-medium ml-2">₹ {Number(orderDetails.couponSavingsAmount).toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-2 my-4">
                              <h6 className="text-lg success-color font-medium">Discount</h6>
                              <div>
                                <span className="text-lg success-color font-medium ml-2">- ₹ {Number(orderDetails.savingsAmount).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-4 border-dashed">
                            <h2 className="text-2xl font-bold">Total Amount</h2>
                            <h2 className="text-2xl font-bold">₹ {Number(orderDetails.calculatedOrderTotal).toFixed(2)}</h2>
                          </div>

                        </div>
                        <div className="text-center bg-success-color-lighter success-color py-4">
                          <span className="text-base fonr-medium">Savings on Bill ₹ {Number(orderDetails.savingsAmount).toFixed(2)}</span>
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
        }
      </div>

    </section>
  )
}

const mapDispatchToProps = dispatch => ({
  getOrderDetails: (payload) => dispatch(getOrderDetailsStart(payload))
})

export default connect(null, mapDispatchToProps)(orderDetail)
