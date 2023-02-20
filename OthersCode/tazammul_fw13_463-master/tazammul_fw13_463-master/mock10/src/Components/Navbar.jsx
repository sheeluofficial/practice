import React from 'react';
import {useNavigate} from 'react-router-dom'
import "./Navbar.style.css"
const Navbar = () => {
    let nav=useNavigate();
    return (
        <div id='nav-cont'>
            <h1 onClick={()=>nav("/")}>Login</h1>
            <h1 onClick={()=>nav("/add-note")}>Add Note</h1>
            <h1 onClick={()=>nav("/notes")}>Notes</h1>
        </div>
    );
};

export default Navbar;