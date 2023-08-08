
import {createContext, useState} from "react"

const AppContext = createContext()

function AppContextProvider({children}) {
    const [auth,setAuth] = useState({isAuth:false,token:null})

    const setLogIn = (token) =>{
        setAuth({token:token,isAuth:true});
       
     }
 
     const logOutUser = () =>{
         setAuth({isAuth:false,token:null});
        
     }

    return <AppContext.Provider value={{auth,setLogIn,logOutUser}} >
      {children}
    </AppContext.Provider>


}

export {AppContext}
export default AppContextProvider;
