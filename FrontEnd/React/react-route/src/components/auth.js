import { createContext, useState } from "react";

const AuthContext= createContext(null)

const AuthProvider = (props)=>{
    const [user,setUser]= useState(null)

    const logIn = (value)=>{
        setUser(value)
    }
    const logOut = ()=>{
      setUser(null)
    }

return <AuthContext.Provider value ={{logIn,logOut,user}}>{props.children}</AuthContext.Provider>
}

export default AuthProvider
export {AuthContext}