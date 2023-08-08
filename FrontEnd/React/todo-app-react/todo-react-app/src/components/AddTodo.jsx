// import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function AddTodo() {

 const [title,setTitle] = useState("")

const handlePost = ()=>{

    fetch("https://mysterious-everglades-28557.herokuapp.com/tasks",{
        method:"POST",
        body:JSON.stringify({title:title,status:false}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    }).then((res)=>{
       return res.json()
    }).then((data)=>{
     setTitle("")
        console.log(data)
    })
}


  return (
    <div>
        <input value={title} onChange={(e)=>{
            setTitle(e.target.value)
        }} ></input>
        <button onClick={handlePost}>Add Task</button>
    </div>
  )
}

export default AddTodo