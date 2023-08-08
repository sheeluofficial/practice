import React, { useContext } from 'react'
import { AuthContext } from './auth'
import {Navigate,useLocation} from "react-router-dom"

function RequireAuth({children}) {
   const Auth=  useContext(AuthContext)
  const location=useLocation()
   if(!Auth.user) {
    return <Navigate to={"/login"} state={{path:location.pathname}}></Navigate>
   }
  return (
    children
  )
}

export default RequireAuth