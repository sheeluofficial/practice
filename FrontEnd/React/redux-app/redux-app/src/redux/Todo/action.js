//ACTION TYPES
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";

//ACTION CREATOR FOR TODO

export const addTodo = (payload)=>{
 return   {type:ADD_TODO,payload}
}
export const deleteTodo = (payload)=>{
 return   {type:DELETE_TODO,payload}
}
