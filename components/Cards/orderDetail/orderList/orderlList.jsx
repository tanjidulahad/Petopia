import moment from 'moment'
import { Button } from '../../../inputs'

function orderlList({ list, storeName, status, orderId, createTime, openReturn }) {
  console.log(status)
  return (
    <div className="w-full  my-8 border-2 rounded-lg  bg-white">
      <div className="w-full px-4 sm:px-10 py-6">
        <div className=" flex justify-between items-center">
          {/* <div className="hidden md:block lg:block mt-2 rounded bg-gray-900 w-10 " style={{ height: '40px' }}>
              <img className="w-full h-full rounded object-cover opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*" />
            </div> */}
          <div className="md:w-max">
            <p className="hidden md:block lg:block  text-left font-bold text-sm md:w-max">{storeName || ""}</p>
            <p className="text-left text-sm font-medium text-gray-500 md:w-max ">Order #{orderId}</p>
          </div>
          <p className="text-left  text-sm font-medium text-gray-500 ">{moment.unix(createTime).format('Do MMM YYYY, h:mm a')}</p>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 mb-8 border-gray-200 border-t-2" >
        <div className='border-b-2 px-4 sm:px-10  py-6'>
          {
            list?.map((item, i) => (
              <div className="flex justify-between items-center" key={i}>
                <div className="flex justify-start">
                  <div className=" flex max-w-fill ">
                    <Button className=" mt-2 rounded bg-gray-900 w-20 h-20 shrink-0 block" type='link' href={`/product/${item.orderItemId}`}>
                      <img className="w-full h-full rounded object-cover opacity-80" src={item.itemImg || '/img/default.webp'} />
                    </Button>
                    <div className="   my-2 mx-6 md:ml-6 ">
                      <Button type='link' href={`/product/${item.orderItemId}`}>
                        <p className="text-left font-semibold text-base text-dark mt-2 ">{item.itemName}</p>
                      </Button>
                      {item.customizationDetails && <p>{item?.customizationDetails?.variant_item_attributes && Object.keys(item?.customizationDetails?.variant_item_attributes).map(function (key) {
                        if (key.includes('variant_value')) {
                          if (item?.customizationDetails?.variant_item_attributes[key] != null) {
                            return <span>{item?.customizationDetails?.variant_item_attributes[key].variant_value_name}, </span>
                          }
                        }


                      })}</p>}
                      {/* <p className="text-left text-sm font-medium text-gray-500 mt-2 "> Green, Small</p> */}
                    </div>
                  </div>
                </div>
                <div className=" max-w-fit my-4  ">
                  <div className="mt-8  w-full flex justify-end align-center ">
                    <p className="text-left  text-lg font-bold text-gray-900 mr-4 ">₹ {item.discountedOrderItemAmount}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {
          (status == 'ORDER_CANCELLED_BY_CUST' || status == 'CANCELLED_BY_CUSTOMER') || status == "ORDER_DECLINED_BY_RESTAURANT" || status == 'ORDER_DELIVERED_SUCCESS' ?
            null
            // <p className='flex items-center ml-2 my-4 btn-color-revers font-bold'  >Order is Cancelled</p>

            :
            <div className='pt-8 px-4 sm:px-10'>
              <span className='text-sm sm:text-lg '>Having problem with order?</span>
              <Button className='inline font-medium ml-2 text-sm sm:text-lg btn-color-revers' onClick={() => openReturn(true)} >Cancel Order</Button>
            </div>

        }
      </div>
    </div>
  )
}

export default orderlList
