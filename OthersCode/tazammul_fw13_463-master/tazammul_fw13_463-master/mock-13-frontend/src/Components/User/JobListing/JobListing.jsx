import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import "./JobListing.style.css"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';

import { apply_job } from '../../../Redux/action';

import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
TimeAgo.addDefaultLocale(en)

// Create formatter (English).

var url = "https://moc-13.herokuapp.com";

function JobListing() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userID, setUserID] = useState("");
  
    const user = useSelector((state) => state)
    useEffect(()=>{
        console.log(user)
        if(user.isLogin)
        {
            setUserID(user.data._id)
        }
        else{
            navigate("/")
        }
    }, [user])

    const timeAgo = new TimeAgo('en-US')

    const [data, setData] = useState([]);
    const [contract, setContract] = useState("all");
    const [company, setCompany] = useState("all");
    const [companyFlag, setCompanyFlag] = useState(false);
    const [location, setLocation] = useState("all");
    const [locationOptions, setLocationOptions] = useState([]);

    useEffect(()=>{
        fetch(`${url}/job/user?contract=${contract}&company=${company==""?"all":company}&location=${location}`).then(data=>data.json())
        .then(data=>{
            if(!data.error)
            {
                console.log(data);
                if(locationOptions.length == 0)
                {
                    let obj = {};
                    data.data.map(el=>{
                        obj[el.location] =1; 
                    })
                    setLocationOptions(Object.keys(obj));
                }
                setData(data.data);
            }
            else
                alert(data.message)
        })
    }, [contract, companyFlag, location])

    function applyJob(el)
    {
        dispatch(apply_job(el))
        alert("Applied for the job")
    }

  return (
    <div id={"job-listing"}>
        <div style={{marginBottom:"50px", display:"flex", gap:"20px", justifyContent:"center"}}>
        <TextField style={{width:"250px"}} value={company} onChange={(e)=>setCompany(e.target.value)} onKeyDown={(e)=>{
            if(e.key == "Enter")
            {
                setCompanyFlag(pre=>!pre)
            }
        }} margin="normal" id="outlined-basic" type={"text"} label="Company name (Hit Enter)" variant="outlined" />
        <TextField
            select
            margin="normal"
            style={{width:"250px"}}
            label="Filter by Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
        >
             <MenuItem value={"all"}>All</MenuItem>
            {locationOptions.map((el, i)=>{
                return <MenuItem value={el}>{el}</MenuItem>
            })}
        
      </TextField>
      <TextField
            select
            style={{width:"250px"}}
            margin="normal"
            label="Filter by Contract"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
        >
        <MenuItem value={"all"}>Both</MenuItem>
        <MenuItem value={"part-time"}>Part Time</MenuItem>
        <MenuItem value={"full-time"}>Full Time</MenuItem>
      </TextField>
        </div>
        <div id='jobs'>
            {data.map((el, i)=>{
                return <div className='card' key={i}>
                    <img src='https://s3.amazonaws.com/cdn.designcrowd.com/blog/2017/April/35-Famous-Square-Logos/1_400.png' />
                    <div>{timeAgo.format(Date.now() -  new Date(el.createdAt) )} . {el.contract}</div>
                    <h3>{el.position}</h3>
                    <p>{el.company}</p>
                    <h4>{el.location}</h4>
                    <Button onClick={()=>applyJob(el)} fullWidth variant="contained">Apply Job</Button>
                </div>
            })}
        </div>
    </div>
  )
}

export default JobListing