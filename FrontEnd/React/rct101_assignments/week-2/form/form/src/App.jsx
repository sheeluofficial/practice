import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const initialState={name:"",email:"",age:""}
  const [user, setuser] = useState(initialState)
const handleSubmit=(e)=>{
     e.preventDefault()
     console.log("user",user)
    
     setuser(initialState)
     // here we can make network request
}
const handleChange=(e)=>{
  const {id,value}=e.target
  console.log(id,value)
  setuser({...user,[id]:value})
}
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
       <input id='name' type="text" placeholder='name' onChange={handleChange} value={user.name}/>
       <input id='age' type="text" placeholder='age' onChange={handleChange} value={user.age}/>
       <input id='email' type="text" placeholder='email' onChange={handleChange} value={user.email} />
     
       <input type="submit" value='submit' />
      

      </form>
    </div>
  )
}

export default App
