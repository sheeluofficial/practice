import React from 'react';
import {useNavigate} from 'react-router-dom'
import "./Navbar.style.css"
import {useSelector, useDispatch} from "react-redux";
import { useState } from 'react';
import { useEffect } from 'react';
import { storeToken } from "../../Redux/action";

const Navbar = () => {

    const [title, setTitle] = useState("Login/Signup");
    const dispatch = useDispatch();
    const teacher = useSelector((state) => state)
    console.log(teacher)
    useEffect(()=>{
        if(teacher.isLogin)
        {
            setTitle(teacher.teacher.name+"(Logout)")
        }
        else{
            setTitle("Login/Signup")
        }
    }, [teacher])
    let nav=useNavigate();
    return (
        <div id='Navbar'>
            <h1 onClick={()=>{
                if(teacher.isLogin)
                {
                    dispatch(storeToken({token:"", data:{}, isLogin:false}));
                }
            }}>{title}</h1>
            <h1 onClick={()=>nav("/students")}>Students</h1>
            <h1 onClick={()=>nav("/add-student")}>Add Student</h1>
            <h1 onClick={()=>nav("/search-students")}>Search Student</h1>
        </div>
    );
};

export default Navbar;