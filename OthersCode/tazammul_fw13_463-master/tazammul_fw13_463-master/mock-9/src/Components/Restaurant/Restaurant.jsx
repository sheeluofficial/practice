import React, { useEffect } from 'react'
import { useState } from 'react'
import "./style.css"
import { Button, ButtonGroup } from '@chakra-ui/react'
import {useSelector, useDispatch} from "react-redux";
import { Select } from '@chakra-ui/react'
import {storeCartData} from "../../Redux/action"
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

function Restaurant() {
    const navigate = useNavigate();

    var token = useSelector(state=>state.token)
    console.log(token)
    // if(token=="" || token=="invalid")
    // {
    //     navigate("/");
    // }

    var [data, setData] = useState([]);
    var [page, setPage] = useState(1);
    var [totalPages, setTotalPages] = useState(5);
    // var [token, setToken] = useState("");
    
    var dispatch = useDispatch();
    var toast = useToast();


    var [filter, setFilter] = useState("");
    var [sorting, setSorting] = useState("");
    var [order, setOrder] = useState("");

    console.log(token);

    useEffect(()=>{
        fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?limit=20&page=${page}&filter=${filter}&sort=${sorting}&order=${order}`)
        .then(resp=>resp.json()).then(data=>{
            setData(data.data)
            setTotalPages(data.totalPages)
        })
    }, [page, filter, sorting, order])

    function addToCart(el)
    {
        dispatch(storeCartData({...el,quantity:1}))
        toast({
            title: 'Added to Cart Sucessfully',
            description: el.name+" food added to cart",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
    }


  return (
    <div>
        <div id="Navbar">
                <div onClick={()=>navigate("/Restaurant")}>Restaurant</div>
                <div onClick={()=>navigate("/Cart")}>Cart</div>
                <div onClick={()=>{navigate("/Order")}}>Orders</div>
        </div>
        <div id='Filtering'>
            <Select value={filter} onChange={(e)=>{setFilter(e.target.value)}} variant='outline' placeholder='Filter by Type' >
                <option value={"fine_dining"}>Fine Dining</option>
                <option value={"ethnic"}>Ethnic</option>
                <option value={"cafe"}>Cafe</option>
                <option value={"casual_dining"}>Casual Dining</option>
            </Select>
            <Select value={sorting} onChange={(e)=>{ setSorting("rating"); setOrder(e.target.value)}} variant='outline' placeholder='Sort by Rating' >
                <option value={"asc"}>Low to High</option>
                <option value={"desc"}>High to Low</option>
            </Select>
            <Select value={order} onChange={(e)=>{ setSorting("price_starts_from"); setOrder(e.target.value)}} variant='outline' placeholder='Sort by Price' >
                <option value={"asc"}>Low to High</option>
                <option value={"desc"}>High to Low</option>
            </Select>
        </div>
        <div id='restaurant-page'>
            <h1>Token: {token}</h1>
            <div className='products'>
                {data.map((el, i)=>{
                    return (<div className='card' key={i}>
                            <div style={{backgroundImage:`url(${el.image})`}}></div>
                            <div>
                                <h2>{el.name}</h2>
                                <h4>{el.votes}</h4>
                                <h4>Starting Pirce{el.price_starts_from}</h4>
                                <h4>Rating {el.rating}</h4>
                                <p>Type: {el.type}</p>
                            </div>
                            <div>
                            <Button w={"100%"} borderRadius={0} colorScheme='teal' onClick={()=>addToCart(el)}>Add to Cart</Button>
                            </div>
                        </div>)
                })}
            </div>
            <div className='pagination'>
            <ButtonGroup gap='4'>
                <Button disabled={page==1?true:false} onClick={()=>{
                    if(page>1){
                        setPage(page=>page-1)
                    }
                }} colorScheme='teal'>Prev</Button>
                <Button colorScheme='teal'>{page}</Button>
                <Button disabled={page==totalPages?true:false} onClick={()=>{
                    if(totalPages=page){
                        setPage(page=>page+1)
                    }
                }} colorScheme='teal'>Next</Button>
                </ButtonGroup>
            </div>
        </div>
    </div>
  )
}

export default Restaurant