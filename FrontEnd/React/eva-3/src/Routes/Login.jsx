import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../Context/AppContextProvider";
import { loginFailure, loginRequest, loginSuccess } from "../Reducer/actionCreators";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {state , dispatch} = useContext(AppContext);
  const navigate = useNavigate();  
  const handleSubmit = (e) =>{
    e.preventDefault();

    const payload = {
        email , 
        password
    }

    dispatch(loginRequest());


    axios.post("https://reqres.in/api/login" , payload).then((res) =>{
        console.log(res.data)
        dispatch(loginSuccess(res.data.token))
        navigate("/dashboard");

    }).catch((err) =>{
        dispatch(loginFailure())
    })




  }

  if(state.isLoading){
    return <h1>Loading ....</h1>
  }

  if(state.isError){
    return <h1>Error....</h1>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value={"Login"} />
      </form>
    </div>
  );
};
