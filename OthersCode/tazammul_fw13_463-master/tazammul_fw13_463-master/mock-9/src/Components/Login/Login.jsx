import React from 'react'
import { Input } from '@chakra-ui/react'
import { InputGroup, Stack, InputLeftAddon, Button } from "@chakra-ui/react"
import { useState } from 'react';
import { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux";
import { login } from '../../Redux/action'
import "./style.css"
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate  = useNavigate();

    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("citysilica");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    function makeLoginRequest()
    {
        setLoader(true);
        dispatch(login());
        navigate("/Restaurant")
    }

  
  return (
    <div>
        <div id="Navbar">
            <div>Login</div>
            <div>Restaurant</div>
        </div>
        <div id='login-page'>
                <h1>Login </h1>
                <div className='login-form'>
                <Stack spacing={4}>
                    <InputGroup>
                        <InputLeftAddon children='username' />
                        <Input value={email} onChange={(e)=>setEmail(e.target.value)} isInvalid={error}  errorBorderColor='crimson' type='text' />
                    </InputGroup>

                  <InputGroup size='sm'>
                        <InputLeftAddon children='Password' />
                        <Input value={password} onChange={(e)=>setPassword(e.target.value)} type={"password"} isInvalid={error}  errorBorderColor='crimson'/>
                    </InputGroup>
                    <Button onClick={makeLoginRequest}
                        isLoading={loader}
                        loadingText='Processing'
                        colorScheme='teal'
                        variant='solid'
                    > Login</Button>
                </Stack>
                </div>
        </div>

    </div>
  )
}

export default Login