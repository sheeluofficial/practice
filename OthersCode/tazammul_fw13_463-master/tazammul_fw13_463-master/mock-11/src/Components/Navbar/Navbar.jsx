import React from 'react'
import {useNavigate} from "react-router-dom"
import "./Navbar.style.css"
function Navbar() {
    const navigate = useNavigate();
  return (
    <div id={"Navbar"}>
        <div onClick={()=>navigate("/")}>Login/Singup</div>
        <div onClick={()=>navigate("/all-blogs")}>All Blogs</div>
        <div onClick={()=>navigate("/my-blogs")}>My Blogs</div>
        <div onClick={()=>navigate("/write-blog")}>Write Blog</div>
    </div>
  )
}

export default Navbar