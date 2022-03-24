import ProductItem from "../product-item/product-item";
import { Button } from "@components/inputs";

// import ProductCard from '../Cards/ProductListCard/index'
function product({ products }) {
  return (
    <div className="my-4">
      <div className="relative flex flex-row mx-2 mb-8 justify-end sm:justify-between align-center">
        <div className=" hidden sm:flex items-baseline">
          <h2 className="font-bold text-2xl ">BOGO Pizzas</h2>
          <span className=" text-sm black-color-75 ml-2">({products ? products.length : 0} Items)</span>
        </div>
        <div>
          <Button className="flex justify-center item-center p-2 border rounded black-color-75">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>{' '}
            Sort / Filter
          </Button>

        </div>
      </div>
      <div className="flex flex-col space-y-8">
        {
          products ? products.map((item, i) => (
            <ProductItem key={i} data={item} />
          )) :
            <>
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </>
        }
      </div>
    </div>
  );
}

export default product;
