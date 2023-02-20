import React, {useState, useEffect} from 'react'
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MenuItem from "@mui/material/MenuItem";
import "./AddStudent.style.css"
import {useSelector, useDispatch} from "react-redux";
import { storeToken } from "../../Redux/action";

var url = "https://mock-12-tsr.herokuapp.com";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function AddStudent() {
    var [teacherID, setTeacherID] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const teacher = useSelector((state) => state)
    console.log(teacher)
    useEffect(()=>{
        if(teacher.isLogin)
        {
            setTeacherID(teacher.teacher._id)
        }
        else
        {
            navigate("/")
        }
    }, [teacher])

   
    var [loading, setLoading] = useState(false);

    var [name, setName] = useState("");
    var [image, setImage] = useState("");
    var [age, setAge] = useState("");
    var [gender, setGender] = useState("");

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [msg, setMsg] = useState("");
  
  

    function addStudent() {
        setLoading(true);
          if(name == "" || image == "" || age == "")
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
              fetch(url+"/student/add-student", {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({name, gender, age, image, teacher:teacherID}),
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
                  }, 2000)
                }
              })
          }
        }
    
  return (
    <div id='add-student'> 
         <Paper id="student-paper" elevation={3}>
                <h1>Add Student</h1>
                <TextField value={name} onChange={(e)=>setName(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"text"} label="Student Name" variant="outlined" />
            <TextField value={image} onChange={(e)=>setImage(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"url"} label="Image URL" variant="outlined" />
            
            <TextField
                select
                margin="normal"
                fullWidth
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            </TextField>
             
            <TextField value={age} onChange={(e)=>setAge(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"number"}  label="Age" variant="outlined" />
            <LoadingButton fullWidth
                style={{marginTop:"20px", fontSize:"20px"}}
                onClick={addStudent}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                >
                Add Student
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

export default AddStudent