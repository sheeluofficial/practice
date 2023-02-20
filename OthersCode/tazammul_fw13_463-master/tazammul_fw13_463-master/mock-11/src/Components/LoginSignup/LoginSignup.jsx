import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./LoginSignup.style.css";
import {useNavigate} from "react-router-dom"
var url = "https://mock-eleven.herokuapp.com";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function LoginSignup() {

  var navigate = useNavigate();

  var [toggle, setToggle] = useState(true);
  var [loading, setLoading] = useState(false);

  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");


  function handleClick() {
    setLoading(true);
    if(toggle)
    {
      if(email == "" || password == "")
      {
          setSeverity("error");
          setMsg("None field can be blank")
          setOpen(true)
          setTimeout(()=>{
              setOpen(false)
          }, 2000)
          setLoading(false);
      }
      else {
          fetch(url+"/user/login", {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
          })
          .then((resp) => resp.json())
          .then((data) => {

            setLoading(false)
            if(!data.login)
            {
              setSeverity("error");
              setMsg(data.message)
              setOpen(true)
              setTimeout(()=>{
                  setOpen(false)
              }, 2000)
            }
            else{
              console.log(data)
              localStorage.setItem("token", JSON.stringify({token:data.token, user:data.data._id}));
              setSeverity("success");
              setMsg(data.message)
              setOpen(true)
              setTimeout(()=>{
                  setOpen(false)
                  navigate("/all-blogs")
              }, 1000)
            }
          })
      }
    }
    else{
      if(email == "" || password == "" || name =="")
      {
          setSeverity("error");
          setMsg("None field can be blank")
          setOpen(true)
          setTimeout(()=>{
              setOpen(false)
          }, 2000)
          setLoading(false);
      }
      else {
          fetch(url+"/user/register", {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, password}),
          })
          .then((resp) => resp.json())
          .then((data) => {

            setLoading(false)
            if(data.error)
            {
              setSeverity("error");
              setMsg(data.message)
              setOpen(true)
              setTimeout(()=>{
                  setOpen(false)
              }, 2000)
            }
            else{
              setSeverity("success");
              setToggle(true)
              setEmail("");
              setPassword("");
              setMsg(data.message)
              setOpen(true)
              setTimeout(()=>{
                  setOpen(false)
              }, 2000)
            }
          })
      }
    }
  }

  return (
    <div>
      <Paper id="LoginSignup" elevation={3}>
        <div className="toggle">
          <div className={toggle ? "active" : ""} onClick={()=>setToggle(true)}>Login</div>
          <div className={toggle ? "" : "active"}  onClick={()=>setToggle(false)}>Signup</div>
        </div>
        <div className="form active">
            {!toggle?<TextField value={name} onChange={(e)=>setName(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"text"} label="Full Name" variant="outlined" />:""}
            <TextField value={email} onChange={(e)=>setEmail(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"text"} label="Email" variant="outlined" />
            <TextField value={password} onChange={(e)=>setPassword(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"password"} label="Password" variant="outlined" />
            <LoadingButton fullWidth
                style={{marginTop:"20px", fontSize:"20px"}}
                onClick={handleClick}
                endIcon={<KeyboardDoubleArrowRightIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                >
                {toggle?"Login":"Signup"}
            </LoadingButton>
        </div>
      </Paper>
      <Snackbar open={open}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginSignup;
