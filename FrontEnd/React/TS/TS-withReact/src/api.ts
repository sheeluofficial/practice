
import axios from "axios";
import { NewTodo } from "./constants";

export const addTodo = (todo : NewTodo)=> {
    axios.post("http://localhost:8080/todos",todo).then((res)=>{
        console.log()
      })
};

export const getTodos = ()=>{

}