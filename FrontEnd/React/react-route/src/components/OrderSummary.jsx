import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function OrderSummary() {
  const navigate=  useNavigate()
  return (
    <div>
 <div>OrderSummary</div>
 <button onClick={()=>{
navigate(-1)
 }}>back</button>

 
    </div>
   
  )
}

export default OrderSummary