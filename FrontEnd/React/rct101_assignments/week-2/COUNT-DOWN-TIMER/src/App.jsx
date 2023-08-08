import { useRef } from 'react'
import { useState } from 'react'

import './App.css'

function App() {
  const [timer,settimer]=useState(5000)
  const ref=useRef(null)
  const hours=(value)=>{
    let hour=Math.floor(value/3600)%24
    if(hour<10){
      return `0${hour}`
    }else{
      return hour
    }
  }
  const minut=(value)=>{
    let min=Math.floor(value/60)%60
    if(min<10){
      return `0${min}`
    }else{
      return min
    }
  }
  const sec=(value)=>{
    let second=Math.floor(value%60)
    if(second<10){
      return `0${second}`
    }else{
      return second
    }
  }
   const starttimer=()=>{
     if(ref.current!=null)return;
        ref.current=setInterval(()=>{
         settimer((prev)=>prev-1)

       },1)
   }
   const stoptimer=()=>{
     clearInterval(ref.current)
   }
   const resettimer=()=>{
       clearInterval(ref.current)
       ref.current=null
       settimer(5000)
       starttimer()
   }

  return (
    <div className="App">
      
      <h1>Timer:{hours(timer)}:{minut(timer)}:{sec(timer)}</h1>
    <button onClick={starttimer}>start</button>
    <button onClick={stoptimer}>stop</button>
    <button onClick={resettimer}>reset</button>
    </div>
  )
}

export default App
