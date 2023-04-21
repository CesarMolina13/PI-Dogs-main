import React from "react"; 
import { Link } from "react-router-dom";
import s from "./NavBar.module.css"
const NavBar = ()=>{
    return(
        <div>
            
            <Link to="/home"><button className={s.button1}>return</button></Link>
            <Link to="/create"><button className={s.button2}>new Dog</button></Link>
            </div>
            
        
    )
}

export default NavBar;