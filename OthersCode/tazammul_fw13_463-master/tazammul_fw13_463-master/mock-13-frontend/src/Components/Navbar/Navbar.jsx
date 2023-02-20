import React from 'react'
import {useNavigate} from 'react-router-dom'
import "./style.css"
import {useSelector, useDispatch} from "react-redux";
import { useState } from 'react';
import { useEffect } from 'react';
import { login, logout } from "../../Redux/action";

function Navbar() {
    const [toggle, setToggle] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state)
    useEffect(()=>{
        if(user.isLogin)
        {
            if(user.role == "User")
                setToggle("user")
            else if(user.role == "Admin")
                setToggle("admin");
            else
                setToggle("");
            setName(user.data.name)
        }
        else{
            setToggle("")
        }
    }, [user])
    let nav=useNavigate();
    return (
        
        <div id='Navbar'>
            {toggle =="" ?
            "": toggle=="admin" ? 
           <>
                <h1 onClick={()=>nav("/admin-form")}>Jobs Forms</h1>
                <h1 onClick={()=>nav("/admin-listing")}>Jobs Listing</h1>
                <h1 onClick={()=>{
                        dispatch(logout());
                        nav("/")
                }}>{name} (Logout)</h1>
           </>
            :
            <>
                <h1 onClick={()=>nav("/job-listing")}>Jobs Listing</h1>
                <h1 onClick={()=>nav("/applied-jobs")}>Applied Jobs</h1>
                <h1 onClick={()=>{
                        dispatch(logout());
                        nav("/")
                }}>{name} (Logout)</h1>
            </>
            }   
        </div>
    );
}

export default Navbar