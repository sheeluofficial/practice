import {STORE_TOKEN, LOGOUT} from "./actionTypes"

const init = {
    token: "",
    teacher:{},
    isLogin:false
}

const reducer = (state=init, action)=>{
    switch(action.type)
    {
        case STORE_TOKEN: 
             return {...state, token:action.payload.token, isLogin:action.payload.isLogin, teacher:action.payload.data}
        
        case LOGOUT: 
             return {...state, token:"", isLogin:false}

        default:
             return state;
    }
}

export {reducer}