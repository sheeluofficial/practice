import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MenuItem from "@mui/material/MenuItem";
import {useSelector, useDispatch} from "react-redux";

import {useNavigate} from "react-router-dom"
import "./AdminForm.style.css"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

var url = "https://moc-13.herokuapp.com";



function AdminForm() {

  const navigate = useNavigate();

  const [adminID, setAdminID] = useState("");

  const user = useSelector((state) => state)
  useEffect(()=>{
      if(user.isLogin)
      {
          setAdminID(user.data._id)
      }
      else{
          navigate("/")
      }
  }, [user])

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [contract, setContract] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");

  function postJob()
  {
    if(company == "" || position == "" || contract == "" || location == "")
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
          fetch(url+"/job", {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({company, location, contract, position, admin:adminID}),
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
              setMsg(data.message)
              setOpen(true)
              setTimeout(()=>{
                  setOpen(false)
                  // navigate("/students")
              }, 1000)
            }
          })
      }
  }
  
  return (
    <div id='Admin-form'>
      <Paper elevation={3} style={{padding: "30px 50px"}}>
        <h1>Add Job</h1>
        <TextField value={company} onChange={(e)=>setCompany(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"text"} label="Company name" variant="outlined" />
        <TextField value={position} onChange={(e)=>setPosition(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"text"} label="Position" variant="outlined" />
        <TextField
            select
            fullWidth
            margin="normal"
            label="Filter by Gender"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
        >
        <MenuItem value={"part-time"}>Part Time</MenuItem>
        <MenuItem value={"full-time"}>Full Time</MenuItem>
      </TextField>
        <TextField value={location} onChange={(e)=>setLocation(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"text"} label="Location" variant="outlined" />
        <LoadingButton fullWidth
                style={{marginTop:"20px", fontSize:"20px"}}
                onClick={postJob}
                endIcon={<KeyboardDoubleArrowRightIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                >
                Post Job
            </LoadingButton>
      </Paper>
      <Snackbar open={open}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AdminForm