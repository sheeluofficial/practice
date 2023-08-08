import React, { useState } from 'react'
import { useEffect } from 'react'
import Card from './Card'

export default function Home() {

        const [userData,setuserData]=useState([])
       const [pN,setpN]=useState([])
        const [page,setpage]=useState(1)
        const fetchDate=async()=>{
             try{
                //    let res=await fetch(`http://localhost:3004/user?_page=${page}&_limit=20`)
                   let res=await fetch(`http://localhost:3004/user`)
                   res=await res.json()
                   
                   let n=Math.ceil(res.length/20)
                   let arr=Array(n).fill(0)
                   setpN([...arr])
                  res= res.splice(page,20)
                   setuserData([...res])
                   
             }catch(err){

             }
        }
        
         useEffect(()=>{
          fetchDate()
         
         },[page])

       let arr=Array()

  return <div>
           <div style={{display:'grid',gridTemplateColumns:"20% 20% 20% 20% ",rowGap:"20px",columnGap:"20px",paddingLeft:"13%"}}>
         {userData.map((user)=>{
         return <Card user={user}/>
         })}
        </div>

        {pN.map((a,index)=>{
              return <button  disabled={page===index+1 ?true :false} onClick={()=>setpage(index+1)}>{index+1}</button>  
        })}
         {/* <button onClick={()=>setpage(1)}>firstpage</button>
         <button disabled={page===1 ? true :false} onClick={()=>setpage(page-1)}>prev</button>
         <button disabled={page===50 ?true :false} onClick={()=>setpage(page+1)}>next</button>
         <button onClick={()=>setpage(50)}>last</button> */}
         
         </div>
    
  
}
