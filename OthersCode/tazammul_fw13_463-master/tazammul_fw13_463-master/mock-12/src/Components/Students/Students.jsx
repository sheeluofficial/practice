import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import {useSelector, useDispatch} from "react-redux";

import "./Students.style.css"
var url = "https://mock-12-tsr.herokuapp.com";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Students() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [change, setChange] = useState(true);

  const [gender, setGender] = useState("both");
  const [sort, setSort] = useState("default");
  const [teacherID, setTeacherID] = useState("");

  const teacher = useSelector((state) => state)

  useEffect(()=>{
    if(teacher.isLogin)
        {
            setTeacherID(teacher.teacher._id)
        }
        else{
            // setTeacherID("")
            navigate("/");
        }
  }, [teacher]) 
 
  useEffect(() => {
    if(teacherID != "")
    {
        setLoader(true);
        console.log(sort, gender, teacherID, page)
        const apiURl = url + `/student?sort=${sort}&filter=${gender}&teacherID=${teacherID}&page=${page}`
        console.log(apiURl)
        fetch(apiURl)
      .then((resp) => resp.json()) 
      .then((resp) => {
        setLoader(false);
        console.log(resp)
          setData(resp.data);
          setTotalPages(resp.totalPages) 
      });
    }
  }, [gender, sort, teacherID, page, change]);

  const [open, setOpen] = useState(false);

  function deleteStudent(id)
    {
      fetch(url+`/student/${id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
        },
        }).then(resp=>resp.json()).then(resp=>{
          if(!resp.error)
          {
            setOpen(true)
            setChange(pre=>!pre)
              setTimeout(()=>{
                  setOpen(false)
              }, 2000)
          }
        })
    }


  return (
    <div id="AllStudetns">
    <div className="filter">
      <TextField
        select
        margin="normal"
        fullWidth
        label="Filter by Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
      <MenuItem value={"both"}>Both Genders</MenuItem>
      <MenuItem value={"male"}>Male</MenuItem>
      <MenuItem value={"female"}>Female</MenuItem>
      </TextField>
      <TextField
        select
        margin="normal"
        fullWidth
        label="Sort by Age"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <MenuItem value={"default"}>Default</MenuItem>
        <MenuItem value={"asc"}>Low to High</MenuItem>
        <MenuItem value={"desc"}>High to Low</MenuItem>
       
      </TextField>
    </div>
    <div id="student-cont">
      {loader ? (
        ""
      ) : data.length == 0 ? (
        <h1>No Data Found</h1>
      ) : (
        data.map((el, i) => {
          return (
            <div className="card" key={i}>
              <div style={{ backgroundImage: `url(${el.image})` }}></div>
              <div>
                <h1>{el.name}</h1>
                <hr />
                <h3>
                  Gender: <span>{el.gender}</span>
                </h3>
                <h3>
                  Age: <span>{el.age}</span>
                </h3>
                <Button onClick={()=>deleteStudent(el._id)} variant="contained" color={"error"} fullWidth>Delete Student</Button>
              </div>
            </div>
          );
        })
      )}
    </div>
    <div style={{margin:"5vw", display:"flex", justifyContent:"center"}}>
    <Pagination count={totalPages} onChange={(e, pageNo)=> setPage(pageNo)} fullWidth size='medium' variant="outlined" color="primary" />
    </div>
    <Snackbar open={open}>
        <Alert severity={"success"} sx={{ width: '100%' }}>
          Student and its tests are Deleted Successfully
        </Alert>
      </Snackbar>
  </div>
  )
}

export default Students