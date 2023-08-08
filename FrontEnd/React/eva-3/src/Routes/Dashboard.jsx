import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getData } from '../api/api';
import { Pagination } from '../Components/Pagination';
import { UserCard } from '../Components/UserCard';
import { AppContext, AppContextProvider } from '../Context/AppContextProvider';
import { getProductFailure, getProductRequest, getProductSuccess } from '../Reducer/actionCreators';

export const Dashboard = () => {
  
  const [searchParams , setSearchParams] = useSearchParams();
  const [page , setPage] = useState( Number(searchParams.get("page")) || 1);
  const [limit , setLimit] = useState(10);  
  const [totalPage, setTotalPage] = useState();
  const {state , dispatch } = useContext(AppContext);

  useEffect(() =>{
    setSearchParams({page ,limit});
  }, [page, limit])
    

  useEffect(() =>{
    dispatch(getProductRequest())
    getData(page , limit).then((res) =>{
        console.log(res.data);
        setTotalPage(res.data.totalPages);
        dispatch(getProductSuccess(res.data.data));
    }).catch((err) =>{
        dispatch(getProductFailure());

    })
  }, [page , limit])  

  const handlePageChange = (page) =>{
    setPage(page);
  }



  if(state.isDataLoading){
    return <h1>Loading ...</h1>
  }

  if(state.isError){
    return <h1>Error...</h1>
  }

  return (
    <div>
        <h1>Dashboard Page</h1>
        <UserCard />
        <Pagination current={page} total={totalPage} onChange={handlePageChange} />
    </div>
  )
}
