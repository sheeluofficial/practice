import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContextProvider'

export const UserCard = () => {
  const {state , dispatch} = useContext(AppContext)  
  
  

  return (
    <div>
        {state.data?.map((el)=>{
            return(
                <div key={el.id}>
                    <h3>{el.title}</h3>
                </div>
            )
        })}
    </div>
  )
}
