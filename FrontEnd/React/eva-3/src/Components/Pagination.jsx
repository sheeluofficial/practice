import React from 'react'
function createArr (n) {
    return new Array(n).fill(0);
}
export const Pagination = ({current , total , onChange}) => {



  return (
    <div>
        {createArr(total).map((button , i) =>{
            return(
                <button key={i} disabled={current === i+1} onClick={() => onChange(i+1)} >{i + 1}</button>
            )
        })}
    </div>
  )
}
