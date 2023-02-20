import { Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import "./style.css"
import {useSelector} from "react-redux"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const url = "https://masai-word-game.herokuapp.com"

function Result() {
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState("");
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState(0);

    const store = useSelector(state=>state)
    const navigate = useNavigate()

    useEffect(()=>{
        if(store.name != "")
        {
            setName(store.name);
            setScore(store.score);
            setDifficulty(store.difficulty);
            setLoader(false)
            fetch(url+"/user", {
                method:'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body:JSON.stringify({name:store.name, score:store.score, difficulty:store.difficulty})
            }).then(resp=>resp.json()).then(data=>{
               
            })
        }
        else
        navigate("/")
    }, [store])

  return (
    <div id='result'>
        {loader?
        <div id='loader'>
            <img src='https://i.pinimg.com/originals/c9/ff/af/c9ffaff3f15bd19379a360edb33080d5.gif' />
        </div>
        :
        <div id='result-cont'>
            <img width={"150px"} src='https://gogeticon.net/files/1368593/15a42a2a7048f3922569ad8716acc959.png' />
            <h1>You have completed the QUIZ!</h1>
            <div className='hr' />
           <div id='content'>
            <div><span>{name}</span></div>
            <div>Total Score : {score}</div>
            <div>Difficulty : {difficulty}</div>
           </div>
           <Stack spacing={2} direction={"row"}>
                <Button size='lg' onClick={()=>{navigate("/")}} colorScheme='blue' >Restart Game</Button>
                <Button size='lg' onClick={()=>{navigate("/leaderboard")}} colorScheme='blue' >Leaderboard</Button>
           </Stack>
        </div>}
    </div>
  )
}

export default Result