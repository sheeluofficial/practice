const LOGIN_REQUEST = "LOGIN_REQUEST"
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE";

export const loginRequest = (data) =>{
    return {
        type: LOGIN_REQUEST,
        payload: data
    }
}

export const loginSuccess = (data) =>{
    return {
        type:LOGIN_SUCCESS ,
        payload: data
    }
}

export const loginFailure = () =>{
    return {
        type: LOGIN_FAILURE,

    }
}

export const getProductRequest = () =>{
    return {
        type: GET_PRODUCTS_REQUEST,
    }
}

export const getProductSuccess = (data) =>{
    return {
        type: GET_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const getProductFailure = () =>{
    return {
        type: GET_PRODUCTS_FAILURE
    }
}

