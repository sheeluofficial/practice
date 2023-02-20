import React from 'react';
import { Button, ButtonGroup,Input } from '@chakra-ui/react'
import {removeFromCart,qntyInc,qntyDec,addToOder} from '../../Redux/action'
import {addtocart} from '../../Redux/action'
import { useState, useRef } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import "./style.css"
import {useNavigate} from "react-router-dom"
import { useToast } from '@chakra-ui/react'

const Cart = () => {

    var toast = useToast();
    let navigate=useNavigate();
    let cart=useSelector(store=>store.cart)
    const [otp,setOtp]=useState(false)
  
    let ref=useRef([])
    let dispatch=useDispatch();



    function getOTP(){
        let count=0;
        for(let i=0;i<cart.length;i++)
            count+=cart[i].price_starts_from
        return count;
    }
    return (
        <div>
           <div id="Navbar">
                <div onClick={()=>navigate("/Restaurant")}>Restaurant</div>
                <div onClick={()=>navigate("/Cart")}>Cart</div>
                <div onClick={()=>{navigate("/Order")}}>Orders</div>
            </div>
            <div id='Cart'>
            {   
                otp&&<div id='otp'>
                <img onClick={()=>{setOtp(false)}} id='cross' src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/cross-mark_274c.png" alt="Loding...." />
               <div className='otp'>
                    <Input onChange={()=>{
                         ref.current[1].focus()
                    }}  ref={el=>ref.current[0]=el}  />
                    <Input onChange={()=>{
                         ref.current[2].focus()
                    }} ref={el=>ref.current[1]=el}  />
                    <Input onChange={()=>{
                         ref.current[3].focus()

                    }} ref={el=>ref.current[2]=el}  />
                    <Input onChange={()=>{
                        if(ref.current[0].value==1&&ref.current[1].value==2&&ref.current[2].value==3&&ref.current[3].value==4){
                            setOtp(false);
                            dispatch(addToOder());
                            // navigate("/order");
                        }else{
                            toast({
                                title: 'Invalid OTP, Try again',
                                status: 'erro',
                                duration: 3000,
                                isClosable: true,
                              })
                        }
                    }} ref={el=>ref.current[3]=el}  />
               </div>
               <Button onClick={()=>{
               }} colorScheme='teal'>Submit</Button>
            </div>
            }
            <div id='data-cont-main'>
            {
                cart.map((el,i)=>{
                    return <div key={i} className='card'>
                    <div style={{backgroundImage:`url(${el.image})`}}>
                        
                    </div>
                    <div style={{padding:"10px 20px"}}>
                        <h1><span>Name</span> : {el.name}</h1>
                        <p><span>Price</span> : {el.price_starts_from}</p>
                        <p><span>Rating</span> : {el.rating}</p>
                        <p><span>Type</span> : {el.type}</p>
                        <Button onClick={()=>{
                            console.log("delete")
                            dispatch(removeFromCart(el.id))
                        }}colorScheme='red' w={"100%"} style={{marginTop:"10px", marginBottom:"10px"}}>Delete</Button>
                        <div id='edit' >
                            <h1 onClick={()=>{
                                dispatch(qntyDec(el.id))
                            }}>-</h1>
                            <h1>{el.quantity}</h1>
                            <h1 onClick={()=>{
                                dispatch(qntyInc(el.id))
                            }}>+</h1>
                        </div>
                    </div>
                    
                </div>
                })
            }
            </div>
            <div style={{marginTop:"20px"}}>
                    <h1>total price : {getOTP()}</h1>
                    <h1>total price with 18% GST : {getOTP()+((getOTP()*18)/10)}</h1>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <Button onClick={()=>{
                            if(cart.length==0){
                                toast({
                                    title: 'Add atleast one product to continue',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                  })
                                return;
                            }
                            setOtp(true);
                        }} colorScheme='teal'>Place Order</Button>
                    </div>
            </div>
        </div>
    );
};

export default Cart;