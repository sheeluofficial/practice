import { LOGIN, LOGOUT, APPLY_JOB } from "./actionTypes"

const login = (payload)=>{
    return {
        type:LOGIN,
        payload
    }
}

const logout = (payload)=>{
    return {
        type:LOGOUT
    }
}

const apply_job = (payload)=>{
    return {
        type:APPLY_JOB,
        payload
    }
}


export {login, logout, apply_job}