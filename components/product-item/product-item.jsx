import { QuantityID, Button } from "../inputs";
import Rating from '../rating-stars/rating'

const ProductItem = ({ data }) => {
    return (
        <>
            {
                !!data ?
                    <div className="w-100 block product-item">
                        <div className="flex flex-row justify-between space-x-4 w-full">
                            <div>
                                <div className="flex w-full">
                                    <Button className="block product-item-img w-40 h-40 shrink-0" type="link" href={`/product/${data.item_id}`}>
                                        <img className="rounded-md w-full h-full object-cover" src={`${data.primary_img || '/img/default.png'}`} alt={`${data.item_name}`} />
                                    </Button>
                                    <div className="flex flex-col justify-between pl-4 ">
                                        <h3 className="capitalize text-xl cart-item-title product-item-truncate">
                                            <Button type="link" href={`/product/${data.item_id}`}>
                                                {data.item_name}
                                            </Button>
                                        </h3>
                                        <Rating size={16} />
                                        <div>
                                            <h2 className="font-bold black-color text-2xl inline-block">₹{data.sale_price}</h2>
                                            <span className="text-lg black-color-50 line-through ml-4 inline-block">₹{data.price}</span>
                                            <span className="text-lg success-color line-through ml-4 inline-block">Save ₹ {data.price - data.sale_price}</span>
                                        </div>
                                        <div>
                                            <span className="text-base black-color-75 tracking-tight leading-6 product-item-truncate">{data.item_desc}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="w-32 shrink-0 flex items-center">
                                <Button className="btn-color btn-bg max-h-min text-base font-medium rounded py-3 px-10" title="Add"></Button>
                            </div>
                        </div>
                    </div>
                    :
                    <div class="h-full  flex border-gray-200 rounded-lg overflow-hidden">
                        <div class=" w-40 h-40 animate-pulse bg-gray-400 shrink-0 object-cover object-center"></div>
                        <div class="px-6 pt-6">
                            <h1 class="w-1/2 mb-4 h-6 animate-pulse bg-gray-500"></h1>
                            <h2 class="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
                            <p class="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400"></p>
                            <div class="block items-center flex-wrap ">
                                <a class="bg-indigo-300 h-4 animate-pulse mt-2 w-52 inline-flex items-center md:mb-2 lg:mb-0">

                                </a>

                            </div>
                        </div>
                    </div>
            }


        </>
    )
}

export default ProductItem;