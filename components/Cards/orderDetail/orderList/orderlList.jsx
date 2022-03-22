import moment from 'moment'
import { Button } from '../../../inputs'

function orderlList({ list, storeName, orderId, createTime }) {
  return (
    <div className="w-full  my-8 border-2 rounded-lg  bg-white">
      <div className=" m-4 lg:w-full md:w-max ">
        <div className="grid grid-cols-2 place-items-end gap-4 md:flex md:gap-2 ">
          <div className="  flex ">
            {/* <div className=" mt-2 rounded h-12 w-12 bg-gray-900 shrink-0" >
              <img className="w-full h-full rounded object-cover opacity-80" src="https://b.zmtcdn.com/data/reviews_photos/1e2/19f261b43d11344ce5f483c20a0941e2_1561214851.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*" />
            </div> */}
            <div className=" md:w-max m-2 ">
              <p className="text-left font-bold text-sm md:w-max">{storeName || ""}</p>
              <p className="text-left text-sm font-medium text-gray-500 md:w-max ">Order #{orderId}</p>
            </div>
          </div>
          <div className="mt-4  lg:w-full flex justify-end align-center ">
            <p className="text-left  text-sm font-medium text-gray-500 mr-8  md:ml-4">{moment(createTime).format('lll')}</p>
          </div>
        </div>
      </div>
      <div className="py-4 px-4 md:px-0 mb-8 border-t-2  border-gray-200 border-b-2 space-y-4">
        {
          list.map((item, i) => (
            <div className="flex justify-between items-center" key={i}>
              <div className="flex justify-start">
                <div className=" lg:mx-4  md:mx-4 flex max-w-fill ">
                  <Button className=" mt-2 rounded bg-gray-900 w-20 h-20 shrink-0 block" type='link' href={`/product/${item.orderItemId}`}>
                    <img className="w-full h-full rounded object-cover opacity-80" src={item.itemImg || '/img/default.png'} />
                  </Button>
                  <div className="   my-2 mx-6 md:ml-6 ">
                    <Button type='link' href={`/product/${item.orderItemId}`}>
                      <p className="text-left font-semibold text-base text-dark mt-2 ">{item.itemName}</p>
                    </Button>
                    <p className="text-left text-sm font-medium text-gray-500 mt-2 "> Green, Small</p>
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
    </div>
  )
}

export default orderlList
