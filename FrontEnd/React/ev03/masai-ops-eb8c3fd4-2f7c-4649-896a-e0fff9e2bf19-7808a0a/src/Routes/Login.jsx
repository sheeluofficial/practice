import axios from "axios";
import { useState,useContext } from "react";
import {Link,useNavigate} from "react-router-dom"
import  {AppContext} from "../Context/AppContext"

function Login() {
  const [authData,setAuthData] = useState({email:"",password:""})

   const {setLogIn} = useContext(AppContext)
const navigate = useNavigate()

  const onChangeHandle=(e)=>{ 
    setAuthData((pre)=>{
      return {...pre, [e.target.type]:e.target.value}
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
      axios.post("https://reqres.in/api/login",authData).then((res)=>{
        console.log(res.data.token)
        setLogIn(res.data.token);
        navigate("/dashboard")
        
      }).catch((err)=>{
        console.log(err)
      })
     
  }


  return (
    <div>
      <form data-testid="login-form" onSubmit={handleSubmit}>
       
        <div>

          <label>
            Email
            <input data-testid="email-input" type="email" placeholder="email"  onChange={onChangeHandle}/>
          </label>
        </div>
        <div>

          <label>
            Password
            <input
              data-testid="password-input"
              type="password"
              placeholder="password"
              onChange={onChangeHandle}
            />
          </label>
        </div>
        <div>
          <input data-testid="form-submit" type="submit" value="SUBMIT" />
        </div>
      </form>
      <div>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
}
export default Login;
