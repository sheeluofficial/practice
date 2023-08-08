import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "./api";
import Pagination from "./Pagination";
import ProductList from "./ProductList";

function ProductPage() {
    const [data,setData] = useState([])
    const [total,setTotal] = useState(0)
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(5)
    const [sortBy,setSortBy] = useState("asc") 

  useEffect(()=>{
    getProducts({page,limit,sortBy}).
    then((res)=>{
         return res.json()

    }).then((data)=>{
      setTotal(data.totalPages)
      return data.data
    }).then((data)=>{
      setData([...data])
     
    })
  },[sortBy,limit,page])

  const changeHandle = (e)=>{
   
      setLimit(e.target.value)
    
  }
  const updatePage = (value)=>{
    setPage((pre)=>{
  return pre + value
    })
  }

  return (
    <div>
      <h1 data-testid="product-page-title">Product Page</h1>

      <button data-testid="low-to-high" disabled={sortBy=="asc"}  onClick={()=>{
     setSortBy("asc")
      }}>Sort low to high</button>

      <button data-testid="high-to-low" disabled={sortBy=="desc"} onClick={()=>{
     setSortBy("desc")
      }} >Sort high to low</button>

      <div>
        <label>Per page</label>
        <select data-testid="limit-select" value={limit} onChange={changeHandle} >
          <option value={5}>5</option>
          <option value={10}>10</option>

        </select>
      </div>
      <Pagination current={page} onChange={updatePage}  total={total}/>
      <ProductList products={data}></ProductList>
    </div>
  );
}

export default ProductPage;
