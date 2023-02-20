import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import "./MyBlogs.style.css";

var url = "https://mock-eleven.herokuapp.com";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyBlogs() {
    const navigate = useNavigate();
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("token"));
        if(!user)
        {
            navigate("/")
        }
        else{
            fetch(url+"/user/verify", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                    }
                })
                .then((resp) => resp.json())
                .then(data=>{
                    if(data.error)
                        navigate("/")
                })
            }    
    }, [])

    const [categoriesOption, setCategoriesOptions] = useState([]);
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [author, setAuthor] = useState("all");
    const [category, setCategory] = useState("all");
    const [change, setChange] = useState(true);
    
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("token"));
        if(user)
        {
            user = user.user
        setLoader(true);
            fetch(url + `/blog/myblogs?user=${user}&category=${category}`)
            .then((resp) => resp.json())
            .then((resp) => {
                setLoader(false);
                if (!resp.error) {
                if (data.length == 0) {
                    let obj2 = {};
                    resp.data.map((el) => {
                    obj2[el.category] = 1;
                    });
                    let categories = Object.keys(obj2);
                    setCategoriesOptions([...categories]);
                }
                setData(resp.data);
                } else {
                alert(resp.message);
                }
            });
        }
    }, [category, change])

    const [open, setOpen] = useState(false);

    function deleteBlog(id)
    {
      fetch(url+`/blog/${id}`, {
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
    <>
    <div id="AllBlogs">
    <div className="filter">
      <TextField
        select
        margin="normal"
        fullWidth
        label="Filter By Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value={"all"}>All Categories</MenuItem>
        {categoriesOption.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
    <div id="blogs-cont">
      {loader ? (
        ""
      ) : data.length == 0 ? (
        <h1>No Data Found</h1>
      ) : (
        data.map((el, i) => {
          return (
            <div className="card myblogs" key={i}>
              <div style={{ backgroundImage: `url(${el.image})` }}></div>
              <div>
                <h1>{el.title}</h1>
                <hr />
                <h3>
                  Author: <span>{el.author}</span>
                </h3>
                <h3>
                  Category: <span>{el.category}</span>
                </h3>
                <p>{el.content}</p>
                <div className='btn'>
                <Button onClick={()=>deleteBlog(el._id)} variant="contained" color={"error"} fullWidth>Delete Blog</Button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
  <Snackbar open={open}>
        <Alert severity={"success"} sx={{ width: '100%' }}>
          Blog Deleted Successfully
        </Alert>
      </Snackbar>
  </>
  )
}

export default MyBlogs