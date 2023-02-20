import React from 'react'
import { Button, useToast } from '@chakra-ui/react'
import "./style.css"
import { useState } from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {storeScore} from "../../Redux/action"
let validChars = "abcdefghijklmnopqrstuvwxyz0123456789";

const url = "https://masai-word-game.herokuapp.com"
let timeInterval= null;
function Playzone() {
    let firstRow = ['~', 1,2,3,4,5,6,7,8,9,0,'delete'];
    let secondRow = ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',"|"];
    let thirdRow = ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'Enter'];
    let fourthRow = ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', 'Shift'];
    let fifthRow = ['Win', 'control', 'option', 'alt', 'Space', 'alt', 'otpion', '<-', '->'];
    let [word, setWord] = useState("");
    let [typedWord, setTypedWord] = useState("");
    let [loader, setLoader] = useState(true);
    let [change, setChage] = useState(true);
    let [score, setScore] = useState(0);
    let [timer, setTimer] = useState(15);

    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const store = useSelector(store=>store)
    
    useEffect(()=>{
        if(store.name == "")
            navigate("/")
        else
        {
            if(store.difficulty == "easy")
                setTimer(30)
            else if(store.difficulty == "medium")
                setTimer(20)
            else
                setTimer(10)
        }
    }, [store])

    useEffect(()=>{
        if(timeInterval)
        {
            clearInterval(timeInterval)
        }
        setWord("Loading...")
        setLoader(true);
        fetch(`${url}/word`)
        .then(resp=>resp.json())
        .then(data=>{
            // alert(data.word)
            setWord(data.word)
            setLoader(false)
            timeInterval = setInterval(()=>{

                setTimer(pre=>{
                    if(pre-1 == 0)
                    {
                        dispatch(storeScore({score}))
                        navigate("/result");
                    }
                    return pre-1
                });
            }, 1000)
        })
    }, [change])

    function enterCharacter(char)
    {
        if(!loader && char == "delete" && typedWord)
        {
            let temp = typedWord.slice(0,-1)
            setTypedWord(temp)
        }
        if(validChars.indexOf(char) == -1 || loader)
            return 
        let temp = typedWord+char
        setTypedWord(temp)
        if(temp.length == word.length)
        {
            if(temp == word)
            {
                toast({
                    title: `Your word matched successfully`,
                    status: "success",
                    isClosable: true,
                    position:'top'
                  })
                  setScore(pre=>pre+temp.length)
            }
            else
            {
                toast({
                    title: `Your word din't match`,
                    status: "error",
                    isClosable: true,
                    position:"top"
                  })
            }
            setTypedWord("")
            setChage(pre=>!pre);
        }
    }


  return (
    <div id='outer'>
        <div id='score'>
            <h1>Timer: {timer}</h1>
            <h1>Score: {score}</h1>
            
        </div>
        <div id='inner'>
            <div id='upper-cont'>
                <div>
                    {word}
                </div>
                <div>
                    {typedWord}
                </div>
            </div>
            <div id='keyboard'>
                <div>
                    {firstRow.map((el, i)=>{
                        return <Button key={i} onClick={()=>enterCharacter(el)} className='btn'>{el}</Button>
                    })}
                </div>
               <div>
                    {secondRow.map((el, i)=>{
                            return <Button key={i} onClick={()=>enterCharacter(el)} className='btn'>{el}</Button>
                        })}
               </div>
               <div>
                    {thirdRow.map((el, i)=>{
                            return <Button key={i} onClick={()=>enterCharacter(el)} className='btn' id={el =="Enter"?"enter":""}>{el}</Button>
                        })}
               </div>
               <div>
                    {fourthRow.map((el, i)=>{
                            return <Button key={i} onClick={()=>enterCharacter(el)} className='btn' id={el =="Shift"?"enter":""}>{el}</Button>
                        })}
               </div>
               <div>
                    {fifthRow.map((el, i)=>{
                            return <Button key={i} onClick={()=>enterCharacter(el)} className='btn' id={el =="Space"?"space":""}>{el}</Button>
                        })}
               </div>
            </div>
        </div>
    </div>
  )
}

export default Playzone