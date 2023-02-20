import React, {useState, useEffect} from 'react'
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./WriteBlog.style.css"

var url = "https://mock-eleven.herokuapp.com/";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function WriteBlog() {
    var [authorName, setAuthorName] = useState("");
    var [userID, setUserID] = useState("");
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
                    else
                    {
                        setAuthorName(data.data.userName)
                        setUserID(data.data.userID)
                    }
                })
            }    
    }, [])

    var [loading, setLoading] = useState(false);

    var [title, setTitle] = useState("");
    var [image, setImage] = useState("");
    var [content, setContent] = useState("");
    var [category, setCategory] = useState("");

    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [msg, setMsg] = useState("");
  
  

    function postBlog() {
        setLoading(true);
          if(title == "" || image == "" || content == "" || category == "")
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
              fetch(url+"/blog", {
              method: 'POST', 
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({title, category, author:authorName, content, image, user:userID}),
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
                  setMsg("Blog posted successfully")
                  setOpen(true)
                  setTimeout(()=>{
                      setOpen(false)
                  }, 2000)
                }
              })
          }
        }
    
  return (
    <div id='WriteBlog'>
         <Paper id="blog-paper" elevation={3}>
                <h1>Write Your Blog</h1>
                <TextField value={title} onChange={(e)=>setTitle(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"text"} label="Title" variant="outlined" />
            <TextField value={image} onChange={(e)=>setImage(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"url"} label="Image URL" variant="outlined" />
            
            <TextField value={category} onChange={(e)=>setCategory(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"text"} label="Category" variant="outlined" />
            
            <TextField value={content} onChange={(e)=>setContent(e.target.value)} margin="normal" fullWidth id="outlined-basic" type={"text"}  label="Write Content" variant="outlined" />
            <LoadingButton fullWidth
                style={{marginTop:"20px", fontSize:"20px"}}
                onClick={postBlog}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                >
                Post Blog
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

export default WriteBlog