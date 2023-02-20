import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import "./style.css"
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const url = "https://masai-word-game.herokuapp.com"

function Leaderboard() {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${url}/user`)
        .then(resp=>resp.json())
        .then(data=>{
            setData(data.data)
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
                            <th>Score</th>
                            <th>Difficulty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((el,i)=>{
                            return <tr key={i}>
                                <td>{i+1}</td>
                                <td>{el.name}</td>
                                <td>{el.score}</td>
                                <td>{el.difficulty}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <Button style={{width:"100%"}} size='md' onClick={()=>navigate("/")} colorScheme='pink'>RESTART GAME</Button>
            </div>
        }
    </div>
  )
}

export default Leaderboard