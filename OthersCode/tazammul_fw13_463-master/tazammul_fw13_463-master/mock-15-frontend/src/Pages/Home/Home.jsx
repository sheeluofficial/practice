import React from 'react'
import "./style.css"
import { Input, Select, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { startGame } from '../../Redux/action'

function Home() {
    const toast = useToast()
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("all");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function start_Game()
  {
    if(name == "" || difficulty == "")
    { 
      toast({
        title: `None field can be blank !!!`,
        status: "error",
        variant:"left-accent",
        position:"top-right",
        isClosable: true,
      })
    }
    else
    {
      dispatch(startGame({name,  difficulty}))
      navigate("/playzone")
    }
  }
  return (
    <div id='outer'>
    <div id='home-form'>
        <h1>Enter your Information</h1>
        <div style={{width:"100%"}}><div className='hr' /></div>
        <Input size='lg' value={name} onChange={(e)=>setName(e.target.value)} variant='filled' placeholder='Enter Your Name' />
        <Select size='lg' value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} variant='filled' placeholder='Select Difficulty'>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
        </Select>
        <Button size='lg' onClick={start_Game} colorScheme='blue'>Start Game</Button>
        <Button size='lg' onClick={()=>navigate("/leaderboard")} colorScheme='pink'>Leaderboard</Button>
    </div>
</div>
  )
}

export default Home