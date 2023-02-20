import React from "react";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import "./style.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {login} from "../../Redux/action";

var url = "https://moc-13.herokuapp.com";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginSingup() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  var navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginFrom, setLoginForm] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");

  function onLogin() {
    if (email == "" || password == "") {
      setSeverity("error");
      setMsg("None field can be blank");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
      setLoading(false);
    } else {
      setLoading(true);
      fetch(url + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setLoading(false);
          if (data.error) {
            setSeverity("error");
            setMsg(data.message);
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          } else {
            console.log(data);
            dispatch(login({token:data.token, data:data.data, role:data.role}));
            setSeverity("success");
            setMsg(data.message);
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
              if(data.role == "Admin")
              {
                    navigate("/admin-form")
              }
              else
                navigate("/job-listing")
            }, 1000);
          }
        });
    }
  }

  function onRegister()
  {
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
            setLoginForm(false)
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


  return (
    <div>
      <div id="LoginSignup">
        <img src={"https://sso.masaischool.com/brand_dark.svg"} />
        <Paper elevation={3}>
          {loginFrom ? (
            <div>
              <h1>Sign up</h1>
              <p>Full Name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type={"text"}
                placeholder={"Enter your full name"}
              />
              <p>Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                placeholder={"Enter email"}
              />
              <p>Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                placeholder={"Enter password"}
              />
              <p id="policy">
                By signing up, I accept the Masai School{" "}
                <a href="#">Term of Service</a> and acknowledge the{" "}
                <a href="#">Privacy Policy</a>
              </p>
              <LoadingButton
                fullWidth
                onClick={onRegister}
                endIcon={<KeyboardDoubleArrowRightIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                SIGN UP
              </LoadingButton>
              <h5>
                Already have an account?{" "}
                <span onClick={() => setLoginForm(false)}>Sign In</span>
              </h5>
            </div>
          ) : (
            <div>
              <h1>Sign In</h1>
              <p>Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                placeholder={"Enter email"}
              />
              <p>Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                placeholder={"Enter password"}
              />

              <LoadingButton
                style={{ marginTop: "30px" }}
                fullWidth
                onClick={onLogin}
                endIcon={<KeyboardDoubleArrowRightIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                SIGN IN
              </LoadingButton>
              <button className="btn">CONTINUE WITH GOOGLE</button>
              <h5>
                Don't have an account?{" "}
                <span onClick={() => setLoginForm(true)}>Sign Up</span>
              </h5>
            </div>
          )}
        </Paper>
      </div>
      <Snackbar open={open}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginSingup;
