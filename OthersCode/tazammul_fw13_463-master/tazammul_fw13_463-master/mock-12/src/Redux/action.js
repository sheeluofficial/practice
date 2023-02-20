import { STORE_TOKEN, LOGOUT } from "./actionTypes"

const storeToken = (payload)=>{
    return {
        type:STORE_TOKEN,
        payload
    }
}

const logout = (payload)=>{
    return {
        type:LOGOUT
    }
}


export {storeToken, logout}