import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.style.css'
var url = "https://mock-ten.herokuapp.com"
const Login = () => {
    const [login,setLogin]=useState(true)
    const [name,setName]=useState("")
    const [email,setemail]=useState("")
    const [password,setPassword]=useState("")
    function Login(email,pass)
    {
        fetch(`${url}/user/login`,{
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email:email,
                password:pass
            })
        }).then(res=>res.json()).then(resp=>{
            console.log(resp);
            localStorage.setItem("loggedin",JSON.stringify({user:resp.user,email:email}));
            alert(resp.message)
        })
    }
    function Register(name,emil,pass){
        console.log(name,emil,pass)
        fetch(`${url}/user/register`,{
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:name,
                email:email,
                password:pass
            })
        }).then(res=>res.json()).then(d=>{
            alert(d.message)
        })
    }
    return (
        <div id='form-cont'>
            <div id='log-reg-cont'>
                <h1 onClick={()=>setLogin(true)} className={login?"active":""}>Login</h1>
                <h1 onClick={()=>setLogin(false)} className={login?"":"active"}>Register</h1>
            </div>
            {!login&&<TextField value={name} onChange={(e)=>setName(e.target.value)} style={{width:"100%"}} id="outlined-basic" label="Name" variant="outlined" />}
            <TextField value={email}  onChange={(e)=>setemail(e.target.value)}style={{width:"100%"}} id="outlined-basic" label="Email" variant="outlined"  type={"text"} />
            <TextField value={password}  onChange={(e)=>setPassword(e.target.value)}style={{width:"100%"}} id="outlined-basic" label="password" variant="outlined"  type={"password"} />
            <Button onClick={()=>{
                if(email==""||password==""){
                    alert("fill all the inputs");
                    return;
                }
                if(login){
                    Login(email,password)
                }else{
                    Register(name,email,password)
                }
            }} style={{height:"50px"}} variant="contained">Submit</Button>
        </div>
    );
};

export default Login;