export const reducer = ( state , action ) =>{
    switch(action.type){
         case "LOGIN_REQUEST": 
            return {...state , isLoading: true }
        case "LOGIN_SUCCESS": 
            return {...state , isLoading: false , isAuth : true , token: action.payload }
        case "LOGIN_FAILURE" : 
            return {...state , isLoading: false , isError: true }
        case "GET_PRODUCTS_REQUEST"    : 
            return {...state , isDataLoading : true }
        case "GET_PRODUCTS_SUCCESS":
            return {...state , isDataLoading: false , data: action.payload }
        case "GET_PRODUCTS_FAILURE": 
            return {...state , isError: true , isLoading: false }
}
}


// export const store = {
//     isAuth: false,
//     token: null ,
//     isError: false,
//     isLoading: false,
//     data: [],
//     isDataLoading: false
// }

// brand: "Fancy Mart"
// category: "homedecor"
// id: 33
// image: "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/7/30/078471d8-aa80-4fe9-9831-0af81ee4e2c41564476690067-1.jpg"
// price: 399
// title: "Artificial flowers with pot"
