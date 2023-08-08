import axios from "axios";

export const getData = (page , limit) =>{
   return axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?page=${page}&limit=${limit}`)
   
}

