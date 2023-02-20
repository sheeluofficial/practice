import {LOGIN, LOGOUT, APPLY_JOB} from "./actionTypes"

const init = {
    token: "",
    data:{},
    role : "", 
    isLogin:false,
    appliedData : []
}

const reducer = (state=init, action)=>{
    switch(action.type)
    {
        case LOGIN: 
             return {...state, token:action.payload.token, isLogin:true, data:action.payload.data, role:action.payload.role}
        
        case LOGOUT: 
             return {...state, token:"", isLogin:false, data: {}, role:""};

        case APPLY_JOB: 
        console.log(action.payload)
             return {...state, appliedData:[...state.appliedData, action.payload]}
        
        default:
             return state;
    }
}

export {reducer}