import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Products() {
  return (
    <div>
        <input type="text">

        </input>  
<nav className='second-nav'>
<Link to={"featured"}>featured</Link>
        <Link to={"new"}>new</Link>
</nav>
      <Outlet></Outlet> 
          </div>
  )
}

export default Products