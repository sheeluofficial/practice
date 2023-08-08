import React from 'react'
import {useState,useEffect}  from "react"
import axios  from 'axios'
import "../style/TodoList.css"
import OneTask from './OneTask'
function TodoList() {

 const [error,setError] = useState(false)
 const [loading,setLoading] = useState(true)
 const [data,setData] = useState([])
 const [page,setPage] = useState(1)

    useEffect(()=>{
       axios.get(`https://mysterious-everglades-28557.herokuapp.com/tasks?_page=${page}&_limit=10`)
       .then((res)=>{
         setLoading(false)
       setData(res.data)
       console.log(res.data)
       })
       .catch(()=>{
        setLoading(false)
        setError(true)
       })
    },[page]) 


  return <>
  <table>
        <thead>
        <tr>
        <th>ID</th>
        <th>Task</th>
        <th>Status</th>
        </tr>
        </thead>
       
{loading?"loading":error?"Something went wrong":<tbody>
      {  
     data.map((ele)=>{
     return    <OneTask key={ele.id} data={ele}></OneTask>
     })
       }
</tbody>}
     
    </table>
    <div>
      <button disabled = {page==1?true:false} onClick={()=>{
        setPage(page-1)
      }}>
        Previous
      </button>
      {
        page
      }
      <button onClick={()=>{
        setPage(page+1)
      }}>
        Next
      </button>
    </div>

  </>
    
  
}

export default TodoList