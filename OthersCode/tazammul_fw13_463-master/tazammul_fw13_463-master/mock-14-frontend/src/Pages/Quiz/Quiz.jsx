import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { storeScore } from '../../Redux/action'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertIcon, AlertTitle,AlertDescription, Divider, Button, Stack} from '@chakra-ui/react';

import "./Quiz.style.css"
const url = "https://mock-14-quiz.herokuapp.com"
function Quiz() {
  const store = useSelector(state=>state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [correctAns, setCorrectAns] = useState("");
  const [wrongAns, setWrongAns] = useState("");
  const [timer, setTimer] = useState(15);
  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    fetch(`${url}/quiz?category=${store.category}&amount=${store.amount}&difficulty=${store.difficulty}`)
    .then(resp=>resp.json())
    .then(data=>{
      if(!data.error)
      {
        console.log(data.data)
        let optionsArr = []
        data.data.map((el,i)=>
        {
          let temp = [...el.incorrect_answers, el.correct_answer];
          temp = shuffle(temp)
          optionsArr.push(temp);
        })
        setData(data.data)
        setOptions(optionsArr);
        setLoader(false);
      }
      else
      navigate("/")
    })
  }, [store])

  function shuffle(array) 
  {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) 
    {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function next()
  {
    setCorrectAns("");
    setWrongAns("");
    if(index == data.length-1)
    {
      let obj = {
        name:store.name,
        noOfQuestion:data.length,
        correctAnswer:data.length-wrong,
        category:store.category,
        level:store.difficulty,
        accuracy:Math.floor(((store.amount-wrong)/store.amount)*100)
      }
      dispatch(storeScore({correctAnswer:obj.correctAnswer, accuracy:obj.accuracy}))
      fetch(`${url}/user`, {
        method:"POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body:JSON.stringify(obj)
      })
      setIndex(0);
      setData([])
      setOptions([])
      setWrong(0)

      navigate("/result")
      return
    }
    setIndex(pre=>pre+1)
  }
  function previous()
  {
    setIndex(pre=>pre-1)
  }
  function checkAnswer(selected)
  {
    if(correctAns != "")
    {
      return
    }
    if(selected == data[index].correct_answer)
    {
      setCorrectAns(selected);
    }
    else
    {
      setWrongAns(selected)
      setCorrectAns(data[index].correct_answer)
      setWrong(pre=>pre+1);
    }
  }

  return (
    <div id='quiz'>
      {loader?
       <div id='loader'>
       <img src='https://i.pinimg.com/originals/c9/ff/af/c9ffaff3f15bd19379a360edb33080d5.gif' />
   </div>:
      <div id='quiz-cont'>
         <div className='middle'>
            <h1 >{index+1}. <span dangerouslySetInnerHTML={{ __html: data[index].question }}></span></h1>
            {options[index].map((el, i) =>{
              return <Alert status={wrongAns == el?"error":correctAns == el?"success":"info"} key={i} onClick={()=>checkAnswer(el)} id={"alert"} className={wrongAns == el?"wrong":correctAns == el?"correct":""}>
               {wrongAns == el || correctAns == el?<AlertIcon />:""}{el}
            </Alert>
            })}
            <Divider />
            <div className='lower'>
              <div>{index+1} of {data.length} Questions</div>
              <Stack spacing={2} direction={'row'}>
                <Button size='lg' onClick={previous} colorScheme='blue' disabled>Prev</Button>
                <Button size='lg' onClick={next} colorScheme='blue' disabled={correctAns==""}>{index == data.length-1?"Submit":"Next"}</Button>
              </Stack>
            </div>
          </div>
      </div>
      }
    </div>
  )
}

export default Quiz