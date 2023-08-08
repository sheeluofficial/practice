import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useRef } from 'react'

function App() {
  const ref=useRef(null)
  
  const scroll=(value)=>{
        ref.current.scrollIntoView({block: value, inline: "nearest" ,behavior:'smooth'})
  }

  return (
    <div ref={ref} className="App">
     <button onClick={()=>{scroll("end")}}>scroll down</button>
      
     <div  style={{marginTop:'700px',marginBottom:'700px'}}>hello</div>
     <button onClick={()=>{scroll("start")}}>scroll up</button>
     
    </div>    
  
  )
}

export default App
