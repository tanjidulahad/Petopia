import ProductItem from "../product-item/product-item";


import {
  ProdcuctSubcategory,
  ProdcucttotalItem,
  ProductFilter,
  ProductFilterP,
} from "./styled";
import { VscFilter } from "react-icons/vsc";
// import ProductCard from '../Cards/ProductListCard/index'
function product({ products }) {
  return (
    <div className="my-4">
      <div className="relative flex flex-row mx-2 mb-8 justify-between align-center">
        <div className=" flex flex-row ">
          <ProdcuctSubcategory> Poggos Pizza </ProdcuctSubcategory>
          <ProdcucttotalItem className="mt-1 px-2">{products ? products.length : 0} Item(s)</ProdcucttotalItem>
        </div>
        <ProductFilter className="p-2  flex flex-row justify-center align-center">
          <VscFilter className="mx-2 " />
          <ProductFilterP>Sort / Filter</ProductFilterP>
        </ProductFilter>
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
