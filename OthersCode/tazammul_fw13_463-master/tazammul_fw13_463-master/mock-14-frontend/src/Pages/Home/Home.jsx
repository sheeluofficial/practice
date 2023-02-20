import React from 'react'
import "./Home.style.css"
import { Input, Select, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import {startQuiz} from "../../Redux/action";

function Home() {
  const toast = useToast()
  const [name, setName] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [amount, setAmount] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function start_Quiz()
  {
    if(name == "" || category == "" || difficulty == "" || amount == "")
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
      dispatch(startQuiz({name, category, difficulty, amount}))
      navigate("/quiz")
    }
  }

  return (
    <div id='outer'>
        <div id='home-form'>
            <h1>Set up your Quiz</h1>
            <div style={{width:"100%"}}><div className='hr' /></div>
            <Input size='lg' value={name} onChange={(e)=>setName(e.target.value)} variant='filled' placeholder='Enter Your Name' />
            <Select size='lg' value={category} onChange={(e)=>setCategory(e.target.value)} variant='filled' placeholder='Select Category'>
                <option value='all'>All</option>
                <option value='General Knowledge'>General Knowledge</option>
                <option value='Entertainment: Books'>Entertainment: Books</option>
                <option value='Science & Nature'>Science & Nature</option>
            </Select>
            <Select size='lg' value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} variant='filled' placeholder='Select Difficulty'>
                <option value='all'>All</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </Select>
            <Select size='lg' value={amount} onChange={(e)=>setAmount(e.target.value)} variant='filled' placeholder='Select Number of Questions'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
            </Select>
            <Button size='lg' onClick={start_Quiz} colorScheme='blue'>Start Quiz</Button>
            <Button size='lg' onClick={()=>navigate("/leaderboard")} colorScheme='pink'>Leaderboard</Button>
        </div>
    </div>
  )
}

export default Home