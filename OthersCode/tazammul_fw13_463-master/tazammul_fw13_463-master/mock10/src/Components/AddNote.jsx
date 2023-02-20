import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import "./AddNote.style.css"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
var url = "https://mock-ten.herokuapp.com"
const AddNote = () => {
    let nav=useNavigate();
    const [id,setId]=useState(null);
    useEffect(()=>{
        let loggedIn=JSON.parse(localStorage.getItem("loggedin"))||{};
        if(!loggedIn.user){
            alert("please login first")
            nav("/");
            return
        }
        setId(loggedIn.user)
    },[])
    const [Title,setTitle]=useState("")
    const [Quantity,setQuantity]=useState("")
    const [priority,setPriority]=useState("")
    const [description,setDescription]=useState("")

    const [open, setOpen] = React.useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

        const handleClick = () => {
            setOpen(true);
        };

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
            return;
            }

            setOpen(false);
        };

    return (
        <div id='form'>
             <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Note added successfully
        </Alert>
      </Snackbar>
      <h1>Add Note</h1>
            <TextField value={Title} onChange={(e)=>setTitle(e.target.value)}  id="outlined-basic" label="Enter Title" variant="outlined" />
            <TextField type={"number"} value={Quantity} onChange={(e)=>setQuantity(e.target.value)}  id="outlined-basic" label="Enter Quantity" variant="outlined" />
            <select onChange={(e)=>setPriority(e.target.value)}>
                <option value="">Select the priority</option>
                <option value="high">high</option>
                <option value="mid">mid</option>
                <option value="low">low</option>
            </select>
            <TextField  value={description} onChange={(e)=>setDescription(e.target.value)}  id="outlined-basic" label="Enter Description" variant="outlined" />
            <Button onClick={()=>{
                if(Title==""||Quantity==""||priority==""||description==""){
                    alert("please enter all inputs");
                    return
                }
                let obj={
                    title:Title,
                        quantity:Quantity,
                        priority:priority,
                        description:description,
                        user:id,
                }
                fetch(`${url}/note/`,{
                    method: 'POST', 
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title:Title,
                        quantity:+Quantity,
                        priority:priority,
                        description:description,
                        user:id,
                    })
                }).then(res=>res.json()).then(d=>{
                    handleClick();
                })
            }} style={{height:"50px"}} variant="contained" color={"secondary"}>Submit</Button>
        </div>
    );
};

export default AddNote;