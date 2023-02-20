import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import "./note.css"
const Note = () => {


    
const [data,setData]=useState([]);
const [user,setUser]=useState("");
const [filter,setFilter]=useState("all");
const [sort,setSort]=useState("default");
const [change,setChange]=useState(false);
var url = "https://mock-ten.herokuapp.com";
// var url = "http://localhost:8081"
let navigate=useNavigate();

useEffect(()=>{
    let loggedIn=JSON.parse(localStorage.getItem("loggedin"))||{};
        if(!loggedIn.email){
            alert("You need to login first")
            navigate("/");
        }
        else{
            setUser(loggedIn.user);
            fetch(`${url}/note/filter?user=${loggedIn.user}&filter=${filter}&sort=${sort}`).then(resp=>resp.json())
            .then(data=>{
            console.log(data);
            setData(data)
            })
        }

}, [filter, sort, change])

function bookmark(el)
{
    fetch(`${url}/note/bookmark/${el._id}`,{
        method: 'PATCH', 
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "bookmark":!el.bookmark
        })
    }).then(res=>res.json()).then(d=>{
        setChange(pre=>!pre)
        if(el.bookmark)
        {
            alert("Remove Bookmarked")
        }
        else alert("Bookmarked")
    })
}
function deleteNote(el)
{
    fetch(`${url}/note/${el._id}`,{
        method: 'DELETE', 
    }).then(res=>res.json()).then(d=>{
        setChange(pre=>!pre)
        alert("Note deleted")
    })
}


    return (
        <div id='Notes'>
            <div className='upper'>
                <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
                    <option value={"all"}>All</option>
                    <option value={"low"}>Low</option>
                    <option value={"mid"}>Mid</option>
                    <option value={"high"}>High</option>
                </select>
                <select value={sort} onChange={(e)=>setSort(e.target.value)}>
                    <option value={"asc"}>New to Old</option>
                    <option value={"desc"}>Old to New</option>
                </select>
            </div>
            <div className='cards-cont'>
            {
            data.map((el,i)=>{
                return <div className='card'>
                        <h1>{el.title}</h1>
                        <div>
                            <h3>Quantity: {el.quantity}</h3>
                            <h3>Priority: {el.priority}</h3>
                            <h3>Description : {el.description}</h3>
                        </div>
                        <div className='btns'>
                        <Button variant={el.bookmark?"contained":"outlined"} color={"primary"} onClick={()=>bookmark(el)}>{el.bookmark?"Bookmarked":"Bookmark"}</Button>
                        <Button variant="outlined" color={"error"} onClick={()=>deleteNote(el)}>Delete</Button>
                            </div>
                    </div>
            })
            }
            </div>
        </div>
    );
};

export default Note;