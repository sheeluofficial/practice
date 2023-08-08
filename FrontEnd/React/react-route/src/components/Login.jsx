import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import {AuthContext} from './auth'
import { Outlet, useNavigate,useLocation } from 'react-router-dom'
function Login() {
    const location= useLocation()
    const navigate= useNavigate()
    const [user,setUser] = useState("")
   const Auth =  useContext(AuthContext)

   console.log(Auth)
const redirectPath  = location.state?.path || "/"
  return (
    <div>
<input type="text" value = {user} onChange={(e)=>{

    setUser(e.target.value)
}}></input>

<button onClick={()=>{
Auth.logIn(user)
navigate(redirectPath,{replace:true})
}}>Login</button>



    </div>
  )
}

export default Login