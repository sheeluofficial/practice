import {ADD_TODO,DELETE_TODO} from "./action"

const initialState = {
    todos:[]
}

export const todoReducer = (state=initialState,action)=>{
console.log("state in todo ", state)
    switch(action.type) {
          case ADD_TODO: return {...state,todos:[...state.todos,action.payload]};
          case DELETE_TODO: return {...state,todos:state.todos.filter((todo)=>todo.id!==action.payload)};
          default: return state;
    }
     
}

