import React from 'react'
import { useNavigate } from 'react-router-dom';

function Order() {
    const navigate  = useNavigate();
  return (
    <div>
        <div>
            <div id="Navbar">
                <div onClick={()=>navigate("/Restaurant")}>Restaurant</div>
                <div onClick={()=>navigate("/Cart")}>Cart</div>
                <div onClick={()=>{navigate("/Order")}}>Orders</div>
            </div>
        </div>
        <div>
            OrderPage
        </div>
    </div>
  )
}

export default Order