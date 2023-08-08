import React from "react";
import ProductItem from "./ProductItem";

// create Product component which contains the list of ProductItem component
const ProductList = ({products}) => {
  console.log(products)
return <div data-testid="products-container">{Array.isArray(products)&& products.map((ele) => {
    return <ProductItem key={ele.id} category={ele.category} price={ele.price} title={ele.title} image = {ele.image} ></ProductItem>
  })}</div>;
};

// export
export default ProductList;
