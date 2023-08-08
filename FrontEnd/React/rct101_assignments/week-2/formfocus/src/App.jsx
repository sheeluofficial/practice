import { useRef, useState } from 'react'

import './App.css'

function App() {

  const ref=useRef(null)
  return (
    <div className="App">
        <input  ref={ref}/>
      <button onClick={()=>{
        ref.current.focus()
      }}>onClick</button>
    </div>
  )
}

export default App
