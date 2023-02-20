import React from 'react'
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom"
import "./AdminListing.style.css";
import Button from '@mui/material/Button';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  }, 
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

var url = "https://moc-13.herokuapp.com";

function AdminListing() {
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

  const [data, setData] = useState([])
  const [change, setChange] = useState(true)

useEffect(()=>{
  if(adminID != "")
  {
    fetch(`${url}/job/admin/${adminID}`).then(resp=>resp.json())
    .then(data=>{
      console.log(data)
      if(!data.error)
        setData(data.data)
    })
  }
}, [adminID, change])

function deleteJOB(id)
{
  // console.log(id)
  fetch(`${url}/job/${id}`, {
    method: 'DELETE', 
   })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      setChange(pre=>!pre)
    })
}

  return (
    <div id='Admin-listing'>
      <Paper elevation={3} style={{padding: "30px 50px"}}>
        <h1>Jobs Listing</h1>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Company</StyledTableCell>
            <StyledTableCell align="center">Position</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Contract</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {row._id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.company}</StyledTableCell>
              <StyledTableCell align="center">{row.position}</StyledTableCell>
              <StyledTableCell align="center">{row.location}</StyledTableCell>
              <StyledTableCell align="center">{row.contract}</StyledTableCell>
              <StyledTableCell align="center"><Button onClick={()=>deleteJOB(row._id)} variant="contained" color={"error"}>Delete</Button></StyledTableCell>
              <StyledTableCell align="center"><Button variant="contained">Edit</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Paper>
    </div>
  )
}

export default AdminListing