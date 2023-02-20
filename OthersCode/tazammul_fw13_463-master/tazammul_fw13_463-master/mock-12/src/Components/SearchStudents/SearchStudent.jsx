import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Pagination from '@mui/material/Pagination';
import {useSelector, useDispatch} from "react-redux";


// import "./Students.style.css"
var url = "https://mock-12-tsr.herokuapp.com";

function SearchStudent() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [query, setQuery] = useState("");
    const [querybtn, setQueryBtn] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
  
    const [teacherID, setTeacherID] = useState("");

  const teacher = useSelector((state) => state)
  var [loading, setLoading] = useState(false);
  

  useEffect(()=>{
    if(teacher.isLogin)
        {
            setTeacherID(teacher.teacher._id)
        }
        else{
           navigate("/")
        }
  }, [teacher]) 

  useEffect(() => {
    if(query != "")
    {
        const apiURl = url + `/student/search?query=${query}&page=${page}&teacherID=${teacherID}`
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
  }, [teacherID, page, querybtn]);

  function handleClick() {
    setQueryBtn(pre=>!pre)
  }


  return (
    <div id={"AllStudetns"}>
        <div id={"filter"} style={{marginBottom:"2vw"}}>
        <TextField value={query} style={{width:"50%"}} onChange={(e)=>setQuery(e.target.value)} id="outlined-basic" label="Search Student by their name" variant="outlined" />
        <LoadingButton
                style={{fontSize:"20px", marginLeft:"20px"}}
                onClick={handleClick}
                endIcon={<KeyboardDoubleArrowRightIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                >
                Search
            </LoadingButton>
        </div>
        <div id="student-cont">
      {data.length == 0 ? (
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
              </div>
            </div>
          );
        }))
        }
    </div>
    <div style={{margin:"5vw", display:"flex", justifyContent:"center"}}>
    <Pagination count={totalPages} onChange={(e, pageNo)=> setPage(pageNo)} fullWidth size='medium' variant="outlined" color="primary" />
    </div>
    </div>
  )
}

export default SearchStudent