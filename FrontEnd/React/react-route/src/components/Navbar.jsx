import React from 'react'
import { useContext } from 'react'
import {  Link, NavLink } from 'react-router-dom'
import { AuthContext } from './auth'

function Navbar() {
  const Auth =  useContext(AuthContext)
  return (
    <nav className='second-nav'>
<NavLink to={"/"} style={{marginLeft:"20px"}}>Home</NavLink>
  <NavLink to={"/about"}>about</NavLink>
  <Link to={"/products"}>products</Link>
  <Link to={"/users"}>Users</Link>
  <Link to={"/profile"}>Profile</Link>
  {
    !Auth.user&&<Link to={"/login"}>LogIn</Link>
  }
  
    </nav>
  
  )
}

export default Navbar