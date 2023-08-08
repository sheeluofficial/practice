import axios from "axios";
import React, { useState } from "react";
import { addTodo } from "../api";
import { NewTodo } from "../constants";

function TodoInput() {
  const [title, setTitle] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const submitHandler = (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()  
     
      const createTodo : NewTodo = {
        id: 1,
        title:title,
        status: false
      }

      addTodo(createTodo)
  }
  return (
    <div>
        <form onSubmit={submitHandler}>

      <input type="text" onChange={handleChange} value={title} />
      <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default TodoInput;
