import {STORE_TOKEN, STORE_CART_DATA, DELETE_FROM_CART,QNTY_DEC,QNTY_INC,ADD_TO_ORDER} from "./actionTypes"

const init = {
    token: "",
    cart:[]
}

const reducer = (state=init, action)=>{
    switch(action.type)
    {
        case STORE_TOKEN: 
             return {...state, token:action.payload}

        case STORE_CART_DATA: 
            return {...state, cart:[...state.cart, action.payload]}

        case ADD_TO_ORDER:
                return {...state,order:[...state.cart]};
        
        case DELETE_FROM_CART:
            let cart=state.cart;
            let newArr=cart.filter((el,i)=>{
                return !(action.payload==el.id);
            })
            return {...state,cart:[...newArr]}

        case QNTY_INC:
            let cartTemp=state.cart;
            for(let i=0;i<cartTemp.length;i++){
                if(action.payload==cartTemp[i].id){
                        cartTemp[i].quantity++
                }
            }
            console.log(cartTemp)
            return {...state,cart:[...cartTemp]}

        case QNTY_DEC:
            let temp=state.cart;
            for(let i=0;i<temp.length;i++){
                if(action.payload==temp[i].id){
                    if(temp[i].quantity!=1)
                    temp[i].quantity--
                }
            }
            return {...state,cart:[...temp]}

        default:
             return state;
    }

}

export {reducer}