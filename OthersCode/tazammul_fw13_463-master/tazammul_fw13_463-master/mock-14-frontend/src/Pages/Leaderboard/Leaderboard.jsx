import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import "./Leaderboard.style.css"
import { Input, Select, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const url = "https://mock-14-quiz.herokuapp.com"

function Leaderboard() {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${url}/user`)
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data)
            setData(data)
            setLoader(false)
        })
    }, [])
  return (
    <div id='leaderboard'>
        {loader?
            <div id='loader'>
                <img src='https://i.pinimg.com/originals/c9/ff/af/c9ffaff3f15bd19379a360edb33080d5.gif' />
            </div>
        :
            <div id='leaderboard-cont'>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Difficulty</th>
                            <th>Score</th>
                            <th>Percantage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((el,i)=>{
                            return <tr key={i}>
                                <td>{i+1}</td>
                                <td>{el.name}</td>
                                <td>{el.category}</td>
                                <td>{el.level}</td>
                                <td>{el.correctAnswer}</td>
                                <td>{el.accuracy}%</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <Button style={{width:"100%"}} size='md' onClick={()=>navigate("/")} colorScheme='pink'>START QUIZ</Button>
            </div>
        }
    </div>
  )
}

export default Leaderboard