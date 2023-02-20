import { Divider, Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import "./Result.style.css"
import {useSelector} from "react-redux"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const url = "https://mock-14-quiz.herokuapp.com"

function Result() {
    const [loader, setLoader] = useState(true);
    const [name, setName] = useState("Alak");
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [percantage, setPercantage] = useState(0);

    const store = useSelector(state=>state)
    const navigate = useNavigate()

    useEffect(()=>{
        if(store.name != "")
        {
            console.log(store)
            setName(store.name);
            setCorrect(store.correctAnswer);
            setWrong(store.amount - store.correctAnswer);
            setTotalScore(store.amount);
            setPercantage(store.accuracy);
            setLoader(false)
        }
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
            <div>Wrong Answers : {wrong}</div>
            <div>Correct Answers : {correct}</div>
            <div>Score : {correct} out of {totalScore}</div>
            <div>Percantage : {percantage}% </div>
           </div>
           <Stack spacing={2} direction={"row"}>
                <Button size='lg' onClick={()=>{navigate("/")}} colorScheme='blue' >Replay Quiz</Button>
                <Button size='lg' onClick={()=>{navigate("/leaderboard")}} colorScheme='blue' >Leaderboard</Button>
           </Stack>
        </div>}
    </div>
  )
}

export default Result