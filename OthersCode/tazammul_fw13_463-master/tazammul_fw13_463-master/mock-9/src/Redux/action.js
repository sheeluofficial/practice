import { STORE_TOKEN, STORE_CART_DATA, DELETE_FROM_CART,QNTY_DEC,QNTY_INC, ADD_TO_ORDER } from "./actionTypes"

const storeCartData = (payload)=>{
    return {
        type:STORE_CART_DATA,
        payload
    }
}

const removeFromCart=(payload)=>{
    return {
        type:DELETE_FROM_CART,
        payload
    }
}

const qntyDec=(payload)=>{
    return {
        type:QNTY_DEC,
        payload
    }
}
const qntyInc=(payload)=>{
    return {
        type:QNTY_INC,
        payload
    }
}
const addToOder=(payload)=>{
    return {
        type:ADD_TO_ORDER,
        payload
    }
}


const storeToken = (payload)=>{
    return {
        type:STORE_TOKEN,
        payload
    }
}


const login = () => (dispatch) =>{
    fetch("https://reqres.in/api/login", {
        method: "POST",
        body: JSON.stringify({
            email: "eve.holt@reqres.in",
            password: "cityslica"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(resp=>resp.json()).then(data=>{
        dispatch(storeToken(data.token));
    })
}

export {storeToken, login, storeCartData, removeFromCart,qntyInc,qntyDec,addToOder}