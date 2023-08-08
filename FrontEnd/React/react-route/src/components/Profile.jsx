import React from 'react'
import { useContext } from 'react'
import { AuthContext } from './auth'
import {useNavigate} from "react-router-dom"

function Profile() {
  const Auth  = useContext(AuthContext)
  const navigate= useNavigate()
  return (
    <div>
      
      Welcome {Auth.user}

      <button  onClick={()=>{
        Auth.logOut()
        navigate("/")
      }}>LogOut</button>
    </div>

  )
}

export default Profile